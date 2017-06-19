const methods = {
  camel (word, index) {
    return index === 0
      ? word
      : word[0].toUpperCase() + word.slice(1)
  },
  snake (word, index) {
    return index === 0
      ? word
      : '_' + word
  },
  constant (word, index) {
    return index === 0
      ? word.toUpperCase()
      : '_' + word.toUpperCase()
  },
  dash (word, index) {
    return index === 0
      ? word
      : '-' + word
  },
  pascal (word) {
    return word[0].toUpperCase() + word.slice(1)
  }
}

const transformKeys = (obj, method='camel')=>{
  if (typeof method === 'string')
    method = methods[method]

  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(item=>transformKeys(item, method))

  return Object.keys(obj)
    .map(key=>({key, value: transformKeys(obj[key])}))
    .map(({key, value})=>({
      value,
      key: key
        .replace(/_|\-/g, ' ')
        .replace(/(\b|^|[a-z])([A-Z])/g, '$1 $2')
        .replace(/ +/g, ' ')
        .trim()
        .toLowerCase()
        .split(' ')
        .reduce((str, word, index)=>
          str + method(word, index)
        , '')
    }))
    .reduce((returned, {key, value})=>Object.assign(returned, {[key]: value}), {})
}

module.exports = transformKeys
