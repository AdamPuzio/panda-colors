import { Colors } from '../dist/index.mjs'

class ExampleClass {
  Colors = Colors.$infuse()

  header = Colors.bold().underline().brightCyan
  header2 = Colors.fn('bold', 'underline', 'green')
}

const example = new ExampleClass()
console.log(example.Colors.red('Hello, world!'))
console.log(example.header('Chainable Styles'))
console.log(example.header2('Color.fn()'))