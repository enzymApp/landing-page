function authMean({services}) {
  if(!services)         return 'email' 
  if(services.facebook) return 'facebook'
  if(services.google)   return 'google'
  if(services.twitter)  return 'twitter'
  return 'email'
}

db.users.find()
.toArray()
.map((user) => {
  printjson(user)
  print(authMean(user))
  print(
    db.users.update({_id: user._id}, {$set: {authMean: authMean(user)}})
  )
})