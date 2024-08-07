import { Colors } from '../dist/index.mjs'
import { outputHeader, colorsList, effectsList, rgbColorsList } from './common.mjs'

const colors = new Colors()

const outputStyle = (style, text) => {
  console.log(`${style.padEnd(20)} ${colors.render(text, style)}`)
}

// Effects

outputHeader('Effects')
effectsList.forEach(effect => {
  outputStyle(effect, 'Hello, world!')
})

// Colors

outputHeader('Colors')
colorsList.forEach(color => {
  // outputStyle(color, 'Hello, world!')
  const styles = [
    color.padEnd(14),
    colors.render('standard', color),
    colors.render('bright', `bright${color.charAt(0).toUpperCase()}${color.slice(1)}`),
    colors.render('background', `${color}Bg`),
    colors.render('bright background', `bright${color.charAt(0).toUpperCase()}${color.slice(1)}Bg`),
    // Colors[`bright${color.charAt(0).toUpperCase()}${color.slice(1)}`]('bright'),
    // Colors[`${color}Bg`]('background'),
    // Colors[`bright${color.charAt(0).toUpperCase()}${color.slice(1)}Bg`]('bright background'),
  ]
  console.log(styles.join('  '))
})

// RGB colors

outputHeader('RGB Colors')
rgbColorsList.forEach(color => {
  outputStyle(color, 'Hello, world!')
})

// RGB background colors

outputHeader('RGB Background Colors')
const rgbBgColors = [
  'rgb:255:0:0:bg',
  'rgb:0:255:0:bg',
  'rgb:0:0:255:bg',
  'rgb:255:255:0:bg',
  'rgb:0:255:255:bg',
  'rgb:255:0:255:bg',
  'rgb:255:255:255:bg',
  'rgb:0:0:0:bg',
]
rgbBgColors.forEach(color => {
  outputStyle(color, 'Hello, world!')
})

// 256 colors

let str = []
for (let i = 0; i <= 256; i++) {
  str.push(colors.render(`${i}`.padStart(3), `256:${i}`))
}
outputHeader('256 Colors')
console.log(str.join(' '))

// 256 background colors

str = []
for (let i = 0; i <= 256; i++) {
  str.push(colors.render(`${i}`.padStart(3), `256:${i}:bg`))
}
outputHeader('256 Background Colors')
console.log(str.join(' '))

console.log()
