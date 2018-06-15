import {Mongo}      from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'


export const Counters = new Mongo.Collection('counters')

Counters.schema = new SimpleSchema({
  key:   String,
  value: String,
})
Counters.attachSchema(Counters.schema)

Counters.upsertCollectionCount = (Collection) => {
  return Counters.upsert(
    {key: Collection._name},
    {$set: {value: Collection.find().count()}}
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
