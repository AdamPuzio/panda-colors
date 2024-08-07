# Colors

`@panda/colors` is a simple, zero-dependency library for adding colors and basic styles to your terminal output.

Colors isn't meant to replace feature-packed libraries like [`Chalk`](https://github.com/chalk/chalk) or [`Kleur`](https://github.com/lukeed/kleur), it's meant as a super-lightweight alternative for Panda projects (althought it __can__ be used in non-Panda projects, as well).

## Installation & Setup

### Static Class

```js
Colors.render('text', ['bold', 'blue'])
Colors.red('text')
Colors.green().underline('text')
```

### Class Instance

```js
const colors = new Colors()
colors.render('text', ['bold', 'blue'])
colors.red('text')
colors.green().underline('text')
```

### Infusion

```js
new Foo({
  // simple
  $Colors: Colors.$infuse()

  // with styles
  header: Colors.$infuse({}, ['cyan', 'bold'])
})
```

```js
class ExampleClass {
  Colors = Colors.$infuse()

  // header = Colors.$infuse({}, ['bold', 'underline', 'brightCyan'])
  header = Colors.bold().underline().brightCyan
  header2 = Colors.fn('bold', 'underline', 'green')
}

const example = new ExampleClass()
console.log(example.Colors.red('Hello, world!'))
console.log(example.header('Color Functions'))
console.log(example.header2('Effect Functions'))
```

## Usage

```js
const colors = new Colors()

// render() function
console.log(colors.render('text', 'cyan')) // single style
console.log(colors.render('text', ['bold', 'magenta'])) // multiple styles
console.log(colors.render('text', ['underline', 'brightGreenBg'])) // multiple styles with formatted color

// style functions
console.log(colors.red('text')) // color function
console.log(colors.bold('text')) // effect function
console.log(colors.brightYellowBg('text')) // formatted color
console.log(colors.bold().redBg('text')) // chained functions
```

## Styling

* Colors
  * `black`
  * `red`
  * `green`
  * `yellow`
  * `blue`
  * `magenta`
  * `cyan`
  * `white`
  * `gray/grey`
  * `default`
* Brightness
  * `standard`
  * `bright`
* Depth
  * `fg`
  * `bg`
* Effects
  * `reset`
  * `bold`
  * `dim`
  * `italic`
  * `underline`
  * `inverse`
  * `hidden`
  * `strikethrough`
* Formats
  * `rgb`
  * `256`/`ansi`/`8bit`
  * `reset`

## API

* `render()`


### `render`

| param  | type        | description |
| ------ | ----------- | ----------- |
| text   | `string`    | text to render |
| styles | `any[]/any` | styles to apply |

* string
  * standard - style-based format (e.g. `render('text', ['blueBg', 'strikethrough'])`)
  * `rgb` - RGB styling (e.g. `render('text', 'rgb:255:0:0')`)
  * `256/ansi/8bit` - 256-colors styling (e.g. `render('text', 129)`)
* number - 256-colors styling (e.g. `render('text', 56)`)
* object - RGB styling (e.g. `render('text', { r: 0, g: 0, b: 0 })`)


```js
const output = colors.render('Text to render', ['blue', 'bold'])
console.log(output)
```

#### Color Strings

Color formatting: `{brightness?}{color}{depth?}`

Examples:

* `blue` - color alone
* `brightBlue` - bright color
* `blueBg` - background
* `brightBlueBg` - bright color + background
