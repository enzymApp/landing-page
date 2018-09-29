
db.referrers.find()
.toArray()
.map(referrer => {
  const zyms = 5 * (1 + referrer.referralCount)
  if(typeof referrer.zyms !== 'undefined' && referrer.zyms != null) return
  print(referrer._id, zyms)
  db.referrers.update(
    {_id: referrer._id},
    {$set: { zyms }
  })
})
