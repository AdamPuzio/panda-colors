import { Colors } from '../dist/index.mjs'
import { outputHeader, colorsList, effectsList } from './common.mjs'

const colors = new Colors()

const outputLine = (styles, text) => {
  if (!Array.isArray(styles)) styles = [styles]
  let styleText = styles.join('().') + '()'
  console.log(`${styleText.padEnd(20)} ${text}`)
}
const outputStyle = (style, text) => {
  const styleText = style + '()'
  console.log(`${styleText.padEnd(20)} ${colors[style](text)}`)
}

outputHeader('Color Functions')
colorsList.forEach(color => {
  outputStyle(color, 'Hello, world!')
})

outputHeader('Effect Functions')
effectsList.forEach(effect => {
  outputStyle(effect, 'Hello, world!')
})

outputHeader('Chained Styles')
outputLine('blue', colors.blue('Hello, world!'))
outputLine('blueBg', colors.blueBg('Hello, world!'))
outputLine('bold', colors.bold('Hello, world!'))
outputLine(['bold', 'blue'], colors.bold().blue('Hello, world!'))
outputLine(['bold', 'blueBg'], colors.bold().blueBg('Hello, world!'))

console.log()
