import {Mongo}      from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'


export const Counters = new Mongo.Collection('counters')

Counters.schema = new SimpleSchema({
  key:       String,
  value:     Number,
  countedAt: Date,
})
Counters.attachSchema(Counters.schema)

Counters.init = (Collection) => {
  const count = Collection.find({}, {fields: {}}).count()
  return Counters.upsert(
    {key: Collection._name},
    {
      $set: {
        countedAt: new Date(),
        value:     count,
      }
    }
  )
}

Counters.upsertCollectionCount = (Collection) => {
  const date = (
    Counters.findOne({key: Collection._name}) || {}
  ).countedAt || new Date(0)
  const addCount = Collection.find({createdAt: {$gt: date}}).count()
  return Counters.upsert(
    {key: Collection._name},
    {
      $set: {countedAt: new Date()},
      $inc: {value: addCount},
    }
  )
}
Counters.getCollectionCount = (Collection) => {
  return Counters.find({key: Collection._name})
}


Counters.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})
