
db.referrers.find()
.toArray()
.map(referrer => {
  print(referrer.userId)
  db.referrers.update({_id: referrer._id}, {$set: {
    bestRank: NumberInt(referrer.rank),
  }})
})
