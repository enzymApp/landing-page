
db.referrers.find()
.toArray()
.map(referrer => {
  print(referrer.userId)
  const user = db.users.findOne({_id: referrer.userId})
  if(user) {
    db.referrers.update({_id: referrer._id}, {$set: {
      createdAt: user.createdAt,
    }})
  } else {
    print("no user for", referrer._id)
  }
})
