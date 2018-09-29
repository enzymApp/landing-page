import web3, {getContract, connectWeb3, disconnectWeb3} from '../../blockchain/web3'

export default async (db, settings, doIt) => {
  try {
    connectWeb3({
      gasPrice:       web3.utils.toWei(String(settings.web3.gasPrice), 'gwei'),
      privateKey:     settings.web3.privateKey,
      rpcUrl:         settings.web3.provider,
      smartContracts: settings.smartContracts,
    })
    const zymToken = getContract('zymToken')
    const referringContract = getContract('referring')

    ;(await syncWithBlockchain(db, web3, zymToken, referringContract, doIt))
    disconnectWeb3()
  } catch (err) {
    console.log("top error", err)
  }
}


async function syncWithBlockchain(db, web3, zymToken, referringContract, doIt) {
  const DECIMALS = await zymToken.methods.decimals().call()
  const referrers = await (db.collection('referrers').find({}, {fields: {token: 1, zyms: 1, ethAccount: 1}})
    .toArray())
  let modifNumber = 0
  for(let idx in referrers) {
    const referrer = referrers[idx]
    console.log(`${parseInt(idx)+1}/${referrers.length}`)
    console.log(referrer._id, referrer.ethAccount)
    console.log(formatZyms(referrer.zyms, DECIMALS))
    const modifier = { }
    const referrerTokenHex = web3.utils.toHex(referrer.token)
    let ethAccount
    let zyms
    console.log(referrerTokenHex)
    try {
      const address = await referringContract.methods.referrers(referrerTokenHex).call()
      if(!web3.utils.toBN(address).eqn(0)) {
        ethAccount = address
      }
      if(ethAccount != referrer.ethAccount) {
        if(ethAccount) {
          modifier.ethAccount = ethAccount
        } else {
          ethAccount = referrer.ethAccount
          console.log("addReferrerAndTransfer", referrerTokenHex, ethAccount)
          if(doIt) {
            await referringContract.methods.addReferrerAndTransfer(referrerTokenHex, ethAccount)
              .send({gas: 120000}, (err, res) => {
                err && console.log("error", err)
                console.log(res)
              })
          }
          modifNumber++
        }
      }
      if(!ethAccount) {
        console.log("no ethAccount")
        zyms = web3.utils.toBN(
          await referringContract.methods.referrerAmounts(referrerTokenHex).call()
        )
      } else {
        console.log("ethAccount", ethAccount)
        zyms = web3.utils.toBN(
          await zymToken.methods.balanceOf(ethAccount).call()
        )
      }
      const dbZyms = web3.utils.toWei(web3.utils.toBN(referrer.zyms), 'ether')
      console.log(formatZyms(dbZyms, DECIMALS), 'vs', formatZyms(zyms, DECIMALS))
      const missingZyms = dbZyms.sub(zyms)
      if(!missingZyms.eqn(0)) {
        console.log("missing", formatZyms(missingZyms, DECIMALS))
        if(missingZyms.ltn(0)) {
          console.log("missing in db")
          modifier.zyms = parseFloat(web3.utils.fromWei(zyms, 'ether'))
        } else {
          console.log("missing in blockchain")
          console.log("transferOrIncrease", referrerTokenHex, missingZyms.toString())
          if(doIt) {
            try {
              const res = await referringContract.methods.transferOrIncrease(referrerTokenHex, missingZyms)
                .send({gas: 100000})
                .on("error", error => console.log(error))
              console.log('done', res.blockHash)
            } catch(error) {
              console.log("transfer error", error)
            }
            modifNumber++
          }
        }
      }
      if(Object.keys(modifier).length > 0) {
        console.log("db update", referrer._id, JSON.stringify(modifier))
        if(doIt) {
          db.collection('referrers').update({_id: referrer._id}, {$set: modifier})
        }
        modifNumber++
      }
    } catch(e) {
      console.log("call failed", JSON.stringify(e))
    }
    console.log()
    console.log()
  }
  console.log(modifNumber, "modications")
}

function formatZyms(num, decimals) {
  if(typeof num === 'number') {
    num = String(num)
  }
  if(typeof num === 'object' && num.div) {
    num = num.toString()
  }
  if(num.length < decimals) {
    return num.indexOf('.') > -1 ? num : num + '.000'
  }
  const dotPos = num.length - decimals
  return num.slice(0, dotPos) + '.' + num.slice(dotPos, dotPos + 3)
}
