import { Colors } from '../dist/index.mjs'
import { outputHeader, colorsList, effectsList } from './common.mjs'

outputHeader('Color Functions')
colorsList.forEach(color => {
  const styles = [
    color.padEnd(14),
    Colors[color]('standard'),
    Colors[`bright${color.charAt(0).toUpperCase()}${color.slice(1)}`]('bright'),
    Colors[`${color}Bg`]('background'),
    Colors[`bright${color.charAt(0).toUpperCase()}${color.slice(1)}Bg`]('bright background'),
  ]
  console.log(styles.join('  '))
})

outputHeader('Effect Functions')
effectsList.forEach(effect => {
  const styles = [
    effect.padEnd(14),
    Colors[effect]('standard'),
  ]
  console.log(styles.join('  '))
})