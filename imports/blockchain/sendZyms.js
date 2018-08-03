import web3, {getContract, transactionQueue} from '/imports/blockchain/web3'

export default async (referrerToken, _amount) => {
  const referrerTokenHex = web3.utils.toHex(referrerToken)
  const amount = web3.utils.toWei(String(_amount), 'ether')
  console.log(referrerTokenHex, amount)
  const contract = getContract('referring')
  try {
    await transactionQueue.add(() => {
      console.log("transferOrIncrease", referrerTokenHex, amount)
      return contract.methods.transferOrIncrease(referrerTokenHex, amount)
        .send({gas: 100000}, (err, res) => {
          err && console.log("error", err)
          console.log(res)
        })
    })
    console.log(referrerTokenHex)
    await contract.methods.referrers(referrerTokenHex).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
    await contract.methods.referrerAmounts(referrerTokenHex).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
  } catch(error) {
    console.error("sendZym blockchain error", error)
  }
}
