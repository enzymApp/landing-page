import { Meteor }   from 'meteor/meteor'
import i18n         from 'meteor/universe:i18n'

const config = Meteor.settings.public.discord
let crate

export const changeChannelLang = () => {
  const lang = i18n.getLocale()
  crate.toggle(false)
  crate.options.channel = config.channelByLang[lang]
}

export default (window, document) => {
  const parent = document.getElementsByTagName('head')[0]
  const script = document.createElement("script")
  script.async = true
  script.defer = true
  script.src = `https://cdn.jsdelivr.net/npm/@widgetbot/crate@3`
  parent.appendChild(script)
  script.onload = function() {
    const lang = i18n.getLocale()
    crate = new window.Crate({
      server:  config.server,
      channel: config.channelByLang[lang],
      shard:   config.shard,
    })
  }
}
