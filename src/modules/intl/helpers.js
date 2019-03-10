const objectify = (obj, [k, v]) => { obj[k] = v ; return obj }

const recursiveMerge = (obj, item) => {
  if(Array.isArray(item)) {
    obj[item[0]] = item[1]
  } else {
    Object.assign(obj, item)
  }
  return obj
}

const loadSections = (sections) => Object.entries(sections)
  .map(([section, file]) => parseLocaleFile(section, file))
  .reduce(recursiveMerge, {})

const parseLocaleFile = (section, content, lang) => recParseContent([section], content, lang)

function recParseContent(parentPath, obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      const fullPath = [...parentPath, key]
      if(typeof value === 'object') return recParseContent(fullPath, value)
      return [fullPath.join('.'), value]
    })
    .reduce(recursiveMerge, {})
}

export const buildLocales = localeData => Object.entries(localeData)
  .map(([lang, sections]) => ([lang, loadSections(sections)]))
  .reduce(objectify, {})

export const guessLang = (locales, requestedLang) => {
  if(locales[requestedLang]) return requestedLang
  const short = requestedLang.split('-')[0]
  if(locales[short]) return short
  return 'en'
}
