
export default (window, document) => {
  //const Tawk_API = window.Tawk_API || {}
  //const Tawk_LoadStart = new Date()
  const s1 = document.createElement("script")
  const s0 = document.getElementsByTagName("script")[0]
  s1.async = true
  s1.src = 'https://embed.tawk.to/59e72f674854b82732ff63f1/default'
  s1.charset = 'UTF-8'
  s1.setAttribute('crossorigin','*')
  s0.parentNode.insertBefore(s1, s0)
}
