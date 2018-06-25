
const token = Meteor.settings.ipinfoToken

export default function saveLanguage(userId, languageCode) {
  Meteor.users.update(userId, {$set: {'profile.lang': languageCode}})
}