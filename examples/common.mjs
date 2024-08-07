import { Colors } from '../dist/index.mjs'

export const colorsList = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
]

export const effectsList = [
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
]

export const rgbColorsList = [
  'rgb:255:0:0',
  'rgb:0:255:0',
  'rgb:0:0:255',
  'rgb:255:255:0',
  'rgb:0:255:255',
  'rgb:255:0:255',
  'rgb:255:255:255',
  'rgb:0:0:0',
]

// export const 

export const outputHeader = (text) => console.log(`\n${Colors.render(text, ['bold', 'cyan'])}`)
export const outputLine = (styles, ...text) => {
  if (!Array.isArray(styles)) styles = [styles]
  let styleText = styles.join('().') + '()'
  console.log(`${styleText.padEnd(20)} ${text.join(' ')}`)
}