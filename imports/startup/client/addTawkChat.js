const API_KEY = Meteor.settings.public.tawk.apiKey

export default (window, document) => {
  const s1 = document.createElement("script")
  const s0 = document.getElementsByTagName("script")[0]
  s1.async = true
  s1.src = `https://embed.tawk.to/${API_KEY}/default`
  s1.charset = 'UTF-8'
  s1.setAttribute('crossorigin','*')
  s0.parentNode.insertBefore(s1, s0)
}
