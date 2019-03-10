import { Meteor }   from 'meteor/meteor'

const config = Meteor.settings.public.discord
let crate

export const changeChannelLang = (lang) => {
  crate.toggle(false)
  crate.options.channel = config.channelByLang[lang]
}

export default (window, document, { locale }) => {
  const parent = document.getElementsByTagName('head')[0]
  const script = document.createElement("script")
  script.async = true
  script.defer = true
  script.src = `https://cdn.jsdelivr.net/npm/@widgetbot/crate@3`
  parent.appendChild(script)
  script.onload = function() {
    crate = new window.Crate({
      server:  config.server,
      channel: config.channelByLang[locale],
      shard:   config.shard,
    })
  }
}
