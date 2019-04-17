import KeywordFactory from './index'

describe('KeywordFactory', () => {
  it('should generate keywords using single string alfabet', () => {
    const factory = new KeywordFactory({alfabets: '01'})
    const expected = ['0', '1', '00', '10', '01', '11', '000', '100']
    for (let i = 0; i < 8; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should format output value', () => {
    const factory = new KeywordFactory({alfabets: '01', format: value => '_' + value + '!'})
    const expected = ['_0!', '_1!', '_00!', '_10!']
    for (let i = 0; i < 4; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should skip values that do not pass validate function', () => {
    const factory = new KeywordFactory({alfabets: '01', validate: value => value !== '00'})
    const expected = ['0', '1', '10', '01']
    for (let i = 0; i < 4; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should validate formatted values', () => {
    const factory = new KeywordFactory({alfabets: '01', format: value => '-' + value, validate: value => value !== '-00'})
    const expected = ['-0', '-1', '-10', '-01']
    for (let i = 0; i < 4; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should support multiple alfabets', () => {
    const factory = new KeywordFactory({alfabets: ['01', 'ab']})
    const expected = ['0', '1', '0a', '1a', '0b', '1b', '0aa', '1aa']
    for (let i = 0; i < 8; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should generate keywords using array alfabet', () => {
    const factory = new KeywordFactory({alfabets: [['hello', 'world']]})
    const expected = ['hello', 'world', 'hellohello', 'worldhello', 'helloworld', 'worldworld', 'hellohellohello', 'worldhellohello']
    for (let i = 0; i < 8; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
  it('should use default alfabets', () => {
    KeywordFactory.ALFABET0 = '01'
    KeywordFactory.ALFABETN = 'ab'
    const factory = new KeywordFactory()
    const expected = ['0', '1', '0a', '1a', '0b', '1b', '0aa', '1aa']
    for (let i = 0; i < 8; i++) {
      expect(factory.get()).toBe(expected[i])
    }
  })
})