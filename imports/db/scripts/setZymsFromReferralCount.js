
db.referrers.find()
.toArray()
.map(referrer => {
  print(referrer._id)
  if(typeof referrer.zyms !== 'undefined') return
  db.referrers.update(
    {_id: referrer._id},
    {$set: {
      zyms: NumberInt(1 + referrer.referralCount)
    }
  })
})
