import {Referrers} from '/imports/api/referrers/Referrers'
import web3, {getContract, transactionQueue} from '/imports/blockchain/web3'

export default async (referrerId) => {
  const {ethAddress , zyms} = Referrers.findOne(referrerId)
  const amount = web3.utils.toWei(String(zyms), 'ether')
  console.log(ethAddress, amount)
  const contract = getContract('referring')
  try {
    await transactionQueue.add(() => {
      console.log("transferOrIncrease", ethAddress, amount)
      return contract.methods.transfer(ethAddress, amount)
        .send({gas: 100000}, (err, res) => {
          err && console.log("error", err)
          console.log(res)
        })
    })
    console.log(ethAddress)
    await contract.methods.referrers(ethAddress).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
    await contract.methods.referrerAmounts(ethAddress).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
  } catch(error) {
    console.error("sendZym blockchain error", error)
  }
}
