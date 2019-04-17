const {isArray} = Array

export default function KeywordFactory(
  { 
    alfabets = [KeywordFactory.ALFABET0, KeywordFactory.ALFABETN], 
    format = value => value, 
    validate = () => true 
  } = {}
) {
  if (!isArray(alfabets)) {
    alfabets = [alfabets]
  }
  alfabets = alfabets.map(alfabet => isArray(alfabet) ? alfabet : alfabet.split(''))
  const chars = []

  function pushChar(i) {
    const alfabet = alfabets[Math.min(i, alfabets.length - 1)]
    chars.push({ alfabet, index: 0, max: alfabet.length - 1 })
  }

  return {
    get() {
      while (true) {
        let i = 0
        while (true) {
          const char = chars[i]
          if (char) {
            if (char.index < char.max) {
              char.index++
              break
            } else {
              char.index = 0
            }
          } else {
            pushChar(i)
            break
          }
          i++
        }
        let value = format(chars.map(char => char.alfabet[char.index]).join(''))
        if (validate(value)) {
          return value
        }
      }
    }
  }
}

KeywordFactory.ALFABET0 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
KeywordFactory.ALFABETN = KeywordFactory.ALFABET0 + '0123456789'