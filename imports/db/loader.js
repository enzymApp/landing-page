const MongoClient = require('mongodb').MongoClient
const settingsBasePath = '../../'

try {
  if(process.argv.length < 4) throw 'not enough arguments'
  const env = process.argv[2]
  const script = process.argv[3]
  const doIt = process.argv.length > 4 && process.argv[4] === 'do_it'
  console.log(process.argv)

  const ENVS = {
    dev:     'settings.json',
    preprod: 'settings-preprod.json',
    prod:    'settings-production.json',
  }
  const settings = require(settingsBasePath + ENVS[env])
  if(!settings) throw 'wrong env'
  ;(async () => {
    const url = settings['galaxy.meteor.com'] ? settings['galaxy.meteor.com'].env.MONGO_URL : 'mongodb://localhost:3001/meteor'
    const dbName = url.split('/').pop()
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)

    console.log("doIt", doIt)

    const func = require('./scripts/' + script + '.js').default
    await func(db, settings, doIt)

    if(client) {
      client.close()
    }
  })()
} catch(error) {
  console.error(error)
}
