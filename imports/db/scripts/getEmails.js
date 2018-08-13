function email(user) {
  if(user.registered_emails)                return user.registered_emails[0]
  if(user.emails && user.emails.length > 0) return user.emails[0]
  if(!user.services) return
  if(user.services.facebook)                return {address: user.services.facebook.email}
  if(user.services.google)                  return {address: user.services.google.email}
  if(user.services.twitter)                 return {address: user.services.twitter.email}
}

print(
  db.users.find({$or: [{'profile.lang': {$regex: 'fr'}}, {'profile.lang': {$exists: false}}]})
  //db.users.find({'profile.lang': {$regex: 'en'}})
  .toArray()
  .map(u => email(u))
  .filter(e => !!e)
  .map(e => e.address)
  .join('\n')
)
