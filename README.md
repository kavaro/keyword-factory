# keyword-factory

Generates incremental keywords from user configurable alfabets.
Features:
- a different alfabet can be defined for every keyword character

  For example: first character must match [_a-zA-Z] and all other characters must match [_a-zA-Z0-9]
- format: generated keywords can be custom formatted with a format function
- validate: formatted keywords that do not pass the validate function will be skipped

# Installation

```js
yarn add keyword-factory
```

# Getting started

```js
import KeywordFactory from 'keyword-factory'

const factory = new KeywordFactory()
expect(factory.get()).toBe('a')
expect(factory.get()).toBe('b')
```

The default alfabet is [azAZ] for the first character and [azAZ09] for all other characters of the generated keyword

# Api

```js
KeywordFactory(options)
```

Options:
- alfabets?: string | [string | [string]]

  - string: used for character alfabets (each character is a possible value)
  - [string]: used for word alfabets (each array element is a value) 

- format?: value => f(value)
- validate?: formattedValue => true when keyword is valid (invalid keywords are skipped)

KeywordFactory.ALFABET0 is alfabet for the first character
KeywordFactory.ALFABETN is alfabet for all other first characters


# Examples

## Overriding default alfabet

```js
import KeywordFactory from 'keyword-factory'

KeywordFactory.ALFABET0 = '01'
KeywordFactory.ALFABETN = 'ab'
const factory = new KeywordFactory()
const expected = ['0', '1', '0a', '1a', '0b', '1b', '0aa', '1aa']
for (let i = 0; i < 8; i++) {
  expect(factory.get()).toBe(expected[i])
}
```

## Overriding instance alfabet

```js
import KeywordFactory from 'keyword-factory'

const factory = new KeywordFactory({alfabets: [['hello', 'world']]})
const expected = ['hello', 'world', 'hellohello', 'worldhello', 'helloworld', 'worldworld', 'hellohellohello', 'worldhellohello']
for (let i = 0; i < 8; i++) {
  expect(factory.get()).toBe(expected[i])
}
```

## Formatting the generated keyword

```js
import KeywordFactory from 'keyword-factory'

const factory = new KeywordFactory({alfabets: '01', format: value => '-' + value, validate: value => value !== '-00'})
const expected = ['-0', '-1', '-10', '-01']
for (let i = 0; i < 4; i++) {
  expect(factory.get()).toBe(expected[i])
}
```

## Skip keywords that do not validate

```js
import KeywordFactory from 'keyword-factory'

const factory = new KeywordFactory({alfabets: '01', validate: value => value !== '00'})
const expected = ['0', '1', '10', '01']
for (let i = 0; i < 4; i++) {
  expect(factory.get()).toBe(expected[i])
}
```

NOTE: the value passed to the validate function is formatted




