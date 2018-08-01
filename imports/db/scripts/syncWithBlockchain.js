import web3, {getContract, connectWeb3, disconnectWeb3} from '../../blockchain/web3'

export default async (db, settings, doIt) => {
  try {
    connectWeb3({
      _gasPrice:       web3.utils.toWei('5', 'gwei'),
      _privateKey:     settings.web3.privateKey,
      _rpcUrl:         settings.web3.provider,
      _smartContracts: settings.smartContracts,
    })
    const zymToken = getContract('zymToken')
    const referringContract = getContract('referring')

    ;(await syncWithBlockchain(db, web3, zymToken, referringContract, doIt))
    .forEach((referrerLogs, idx) => {
      console.log()
      console.log()
      console.log(idx + 1)
      referrerLogs.forEach(log => console.log(log.join(' ')))
    })
    disconnectWeb3()
  } catch (err) {
    console.log(err.stack)
  }
}



async function syncWithBlockchain(db, web3, zymToken, referringContract, doIt) {
  const referrers = await (db.collection('referrers').find({}, {fields: {token: 1, zyms: 1, account: 1}})
    .toArray())
  return Promise.all(
    referrers
    .map(async referrer => {
      const logs = []
      logs.push([referrer._id, referrer.account])
      logs.push([referrer.zyms])
      const modifier = { }
      const referrerTokenHex = web3.utils.toHex(referrer.token)
      let account
      let zyms
      logs.push([referrerTokenHex])
      //try {
        const address = await referringContract.methods.referrers(referrerTokenHex).call()
        logs.push([address])
        if(!web3.utils.toBN(address).eqn(0)) {
          account = address
        }
        if(account != referrer.account) {
          if(!!account) {
            modifier.account = account
          } else {
            account = referrer.account
            logs.push(["addReferrerAndTransfer", referrerTokenHex, account])
            if(doIt) {
              await referringContract.methods.addReferrerAndTransfer(referrerTokenHex, account)
                .send({gas: 120000}, (err, res) => {
                  err && logs.push(["error", err])
                  logs.push([res])
                })
            }
          }
        }
      // } catch(e) {
      //   logs.push(["methods.referrers failed", e])
      // }
      if(!account) {
        logs.push(["no account"])
        zyms = web3.utils.toBN(
          await referringContract.methods.referrerAmounts(referrerTokenHex).call()
        )
      } else {
        logs.push(["account", account])
        zyms = web3.utils.toBN(
          await zymToken.methods.balanceOf(account).call()
        )
      }
      const dbZyms = web3.utils.toWei(web3.utils.toBN(referrer.zyms), 'ether')
      logs.push([dbZyms.toString(), 'vs', zyms.toString()])
      const missingZyms = dbZyms.sub(zyms)
      if(!missingZyms.eqn(0)) {
        logs.push(["missing", missingZyms.toString()])
        if(missingZyms.ltn(0)) {
          logs.push(["missing in db"])
          modifier.zyms = web3.utils.fromWei(zyms, 'ether')
        } else {
          logs.push(["missing in blockchain"])
          logs.push(["transferOrIncrease", referrerTokenHex, missingZyms.toString()])
          if(doIt) {
            await referringContract.methods.transferOrIncrease(referrerTokenHex, missingZyms)
              .send({gas: 100000}, (err, res) => {
                err && logs.push(["error", err])
                logs.push([res])
              })
          }
        }
      }
      if(Object.keys(modifier).length > 0) {
        logs.push(["db update", referrer._id, modifier])
        if(doIt) {
          db.collection('referrers').update(referrer._id, {$set: modifier})
        }
      }
      return logs
    })
  )
}
