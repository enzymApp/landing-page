const API_PUB_KEY = Meteor.settings.public.recaptchaKey

export default (window, document) => {
  const parent = document.getElementsByTagName('head')[0]
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.google.com/recaptcha/api.js?render=${API_PUB_KEY}`
  parent.appendChild(script)
}
