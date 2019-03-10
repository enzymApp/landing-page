// landing> ./scripts/dump.sh
// (dev) landing> mongorestore --drop --uri "mongodb://localhost:3001/meteor" -d meteor ./dumps/???/enzym-website/
// app> mongodump --uri ???????
// (dev) app> mongorestore --drop --uri "mongodb://localhost:4001/meteor" -d meteor ./dump/proto-prod/
// app> mongorestore --uri "mongodb://localhost:4001/meteor" -d meteor ./dumps/???/enzym-website/counters.bson
// app> mongorestore --uri "mongodb://localhost:4001/meteor" -d meteor ./dumps/???/enzym-website/referrers.bson
// app> mongorestore --uri "mongodb://localhost:4001/meteor" -d meteor ./dumps/???/enzym-website/meteor_accounts_loginServiceConfiguration.bson
// landing> meteor node imports/db/loader.babel.js dev mergeDBs

import {MongoClient} from 'mongodb'
import RandomGenerator from './RandomGenerator'

const Random = RandomGenerator.new()

export default async (db, settings, doIt, dbUrl) => {

  doIt = false
  // const url = !settings['galaxy.meteor.com'] ? 'mongodb://localhost:4001/meteor' : '????????????'


  const dbName = url.split('/').pop()
  const client = await MongoClient.connect(url)
  const db2 = client.db(dbName)
  const Referrers = db2.collection('referrers')
  const Users = db2.collection('users')
  let count = 0
  let countNew = 0

  try {
    for(let user of (await db.collection('users').find().toArray())) {
      // user => {
      const emailObj = email(user)
      let address, query
      if(!emailObj || !emailObj.address) {
        // console.warn("NO EMAIL", user)
        const createdAt = new Date(user.createdAt)
        query = {_id: user._id, createdAt: {$gte: createdAt, $lte: createdAt}}
      } else {
        address = emailObj.address
        query = {$or: [
          {emails: {$elemMatch: {address}}},
          {registered_emails: {$elemMatch: {address}}},
        ]}
      }
      const user2 = await Users.findOne(query)
      if(!user2) {
        console.log(user._id, address, "not found")
        const modifier = {
          ...user,
          ambassadorMode: false,
          isAmbassador: false,
          blockedUsers: [],
          landingPageZyms: 0,
          zyms: 0,
        }
        let username = user.username
        if(username) {
          let i
          while(await Users.findOne({username})) {
            i = (i || 0) + 1
            username = `${username}${i}`
          }
          modifier.username = username
        }
        console.log(modifier)
        if(await Users.findOne({_id: user._id})) throw new Error("COLLISION")
        if(Object.keys(modifier).length > 0) {
          countNew++
          console.log(modifier)
          if(doIt) {
            await Users.insert(modifier)
            // process.exit(0)
          }
        }
      } else {
        const modifier = {}
        console.log(user._id, address, "found")
        for(let [key, value] of Object.entries(user.profile)) {
          if(typeof user2.profile[key] === 'undefined' || value !== user2.profile[key]) {
            console.log(`profile.${key}`, value, user2.profile[key])
            modifier[`profile.${key}`] = user.profile[key]
          }
        }
        for(let [key, value] of Object.entries(user.services)) {
          if(user2.services[key]) {
            if(key === 'resume'  && JSON.stringify(value.loginTokens) !== JSON.stringify(user2.services.resume.loginTokens)) {
              const hashedTokens = user2.services.resume.loginTokens.map(t => t.hashedToken)
              const loginTokens = []
              value.loginTokens.forEach(token => {
                if(!hashedTokens.includes(token.hashedToken)) {
                  loginTokens.push(token)
                }
              })
              if(loginTokens.length) {
                modifier['services.resume.loginTokens'] = loginTokens
              }
            } else {
              // keep user2 version
            }
          } else {
            modifier[`services.${key}`] = user.services[key]
          }
        }
        for(let [key, value] of Object.entries(user)) {
          if(['_id', 'createdAt', 'profile', 'services', 'authMean'].includes(key)) continue
          if(typeof user2[key] !== 'undefined') {
            if(JSON.stringify(user2[key]) !== JSON.stringify(value)) {
              console.log(key, value, user2[key])
              console.log("keep db2 value")
              if(key === 'username') {
                if(await db.collection('users').findOne({username: user2[key]})) {
                  console.log("username already used in db1", user2[key], value)
                  if(await Users.findOne({username: value})) {
                    console.log("username already used in db2", value, user2[key])
                  } else {
                    console.log("use db1 username")
                    modifier.username = user.username
                  }
                }
              }
            }
          } else {
            console.log(key, value, user2[key])
            modifier[key] = user[key]
          }
        }
        if(Object.keys(modifier).length > 0) {
          console.log(modifier)
          count++
          if(doIt) {
            await Users.update({_id: user2._id}, {$set: modifier})
            console.log(user._id, user2._id)
            await Referrers.updateOne({userId: user._id}, {$set: {userId: user2._id}})
          }
        }
      }
      // if(doIt && (count + countNew >= 50)) {
      //   console.log(count, countNew)
      //   break
      // }
      console.log("")
    }
  } catch (err) {
    console.log("top error", err)
  }
  console.log(countNew, count)
  if(countNew + count > 0) process.exit(0)

  let countNoReferrer = 0
  for(let user of (await Users.find().toArray())) {
    const userId = user._id
    const referrer = await Referrers.findOne({userId})
    if(!referrer) {
      console.log("no referrer", userId)
      countNoReferrer++
      const modifier = {
        userId,
        token: Random.hexString(20),
        referrals: [],
        referralCount: 0,
        createdAt: new Date(Date.now()),
      }
      console.log(modifier)
      if(doIt) {
        await Referrers.insert(modifier)
      }
    }
  }
  let countNoUser = 0
  for(let referrer of (await Referrers.find().toArray())) {
    const user = await Users.findOne({_id: referrer.userId})
    if(!user) {
      console.log("no user", referrer.userId)
      countNoUser++
      if(doIt) {
        await Referrers.deleteOne({_id: referrer._id})
      }
    }
  }
  console.log(countNew, count, countNoReferrer, countNoUser)
}

function email(user) {
  if(user.registered_emails)                return user.registered_emails[0]
  if(user.emails && user.emails.length > 0) return user.emails[0]
  if(!user.services) return
  if(user.services.facebook)                return {address: user.services.facebook.email}
  if(user.services.google)                  return {address: user.services.google.email}
  if(user.services.twitter)                 return {address: user.services.twitter.email}
}
