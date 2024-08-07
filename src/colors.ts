const ESC = '\x1b'
const RESET = `${ESC}[0m`

const proxyFn = (proxy, { prop = undefined} = {}) => {
  if (!prop) throw new Error('No prop')
  return (...args) => {
    // no args, just return the chain
    if (args.length === 0) return proxy.chain(prop, proxy)
    // args, render the chain
    const props = [...(proxy._genStyles || []), prop]
    return proxy.render(args.shift(), props)
  }
}

export class Colors {
  static debugMode = true
  static onError = 'warn' // 'throw', 'log', 'ignore'

  static cfg = {
    colorize: true,
    onError: 'warn', // 'throw', 'warn', 'ignore'
  }
  cfg = {}

  _genStyles = []

  static codes = {
    effects: {
      reset: 0,
      bold: { set: 1, reset: 22 },
      dim: { set: 2, reset: 22 },
      italic: { set: 3, reset: 23 },
      underline: { set: 4, reset: 24 },
      inverse: { set: 7, reset: 27 },
      hidden: { set: 8, reset: 28 },
      strikethrough: { set: 9, reset: 29 },
    },
    types: {
      fg: 3, bg: 4, bfg: 9, bbg: 10,
    },
    colors: {
      black: 0, red: 1, green: 2, yellow: 3, blue: 4, magenta: 5, cyan: 6, white: 7, gray: 8, grey: 8, default: 9,
    }
  }

  static fns = {
    reset: {
      fg: () => [39],
      bg: () => [49],
      all: () => [39, 49],
    },
    standard: {
      fg: (color) => [`3${color}`],
      bg: (color) => [`4${color}`],
    },
    bright: {
      fg: (color) => [`9${color}`],
      bg: (color) => [`10${color}`],
    },
    ansi: {
      fg: (color) => [38, 5, color],
      bg: (color) => [48, 5, color],
    },
    rgb: {
      fg: (r, g, b) => [38, 2, r, g, b],
      bg: (r, g, b) => [48, 2, r, g, b],
    },
  }

  constructor(cfg = {}, styles = []) {
    this.cfg = Object.assign(this.cfg, Colors.cfg, cfg)
    this._genStyles = [...this._genStyles, ...Array.isArray(styles) ? styles : [styles]]
    const proxy = new Proxy(this, {
      get(target, prop) {
        if (target[prop]) return target[prop]
        // if (Colors[prop]) return Colors[prop]
        return proxyFn(target, { prop })
      }
    })
    return proxy
  }

  chain (style) {
    return new Colors(this.cfg, [...this._genStyles, style])
  }

  render (str, styles: any[]|any = []) {
    if (typeof styles === 'string') styles = [styles]
    styles = [...this._genStyles, ...styles]
    return Colors.render(str, styles)
  }

  static chain (style, proxy?) {
    return new Colors({}, [style])
  }

  static render (str, styles: any[]|any = []) {
    const codes: any[] = []
    if (typeof styles === 'string') styles = [styles]
    styles.forEach(style => {
      let code = Colors.effect(style)
      if (!code) code = Colors.color(style)
      if (code) {
        if (Array.isArray(code)) codes.push(...code)
        else codes.push(code)
      } else Colors.error(`Unknown style: ${style}`)
    })
    return Colors.apply(str, codes)
  }

  static $infuse (cfg, styles) {
    return new Colors(cfg, styles)
  }

  static fn ( ...styles) {
    const instance = new Colors({}, styles)
    return instance.render.bind(instance)
  }

  static apply (str, codes: any[] = []) {
    return `${ESC}[${codes.join(';')}m${str}${RESET}`
  }

  static effect (effect) {
    effect = effect.toLowerCase()
    let fn = 'set'
    if (effect.endsWith('off')) {
      fn = 'reset'
      effect = effect.slice(0, -3)
    }
    const e = Colors.codes.effects[effect]
    return e ? e[fn] : null
  }

  static color (color) {
    switch (typeof color) {
      case 'string': // standard colors
        color = color.toLowerCase()
        if (color.includes(':')) {
          const colors = color.split(':')
          const action = colors.shift()
          let type = 'fg'
          switch (action) {
            case 'rgb':
              if (colors.length > 3) type = colors.pop()
              if (colors.length !== 3) return null
              return Colors.fns.rgb[type](...colors)
            case '256':
            case 'ansi':
            case '8bit':
              if (colors.length > 1) type = colors.pop()
              if (colors.length !== 1) return null
              if (!Colors.fns.ansi[type]) return Colors.error(`Unknown ANSI color type: ${type} (must be 'fg' or 'bg')`)
              return Colors.fns.ansi[type](colors[0])
            case 'standard':
              if (colors.length !== 1) return null
              return Colors.fns.standard[type](colors[0])
            case 'bright':
              if (colors.length !== 1) return null
              return Colors.fns.bright[type](colors[0])
            case 'reset':
              if (!Colors.fns.reset[colors[0]]) return Colors.error(`Unknown reset type: ${colors[0]}`)
              return Colors.fns.reset[colors[0]]()
            default:
              return null
          }
        }
        let type = 'fg'
        let bright = false
        if (color.startsWith('bright')) {
          bright = true
          color = color.slice(6)
        }
        if (color.endsWith('bg')) {
          type = 'bg'
          color = color.slice(0, -2)
        }
        const cc = Colors.codes.colors[color]
        const tc = Colors.codes.types[bright ? `b${type}` : type]
        if (cc === undefined || !tc) return null
        return `${tc}${cc}`
      case 'number': // 256 colors
        return Colors.codes.colors[256].fg(color)
      case 'object': // rgb colors
        return Colors.color(`rgb:${color.r}:${color.g}:${color.b}`)
    }
  }

  static error (msg) {
    if (!Colors.debugMode || Colors.onError === 'ignore') return
    if (Colors.onError === 'warn') console.error(Colors.render(`[WARN] ${msg}`, ['yellow']))
    else throw new Error(msg)
  }

  static black = proxyFn(this, { prop: 'black' })
  static red = proxyFn(this, { prop: 'red' })
  static green = proxyFn(this, { prop: 'green' })
  static yellow = proxyFn(this, { prop: 'yellow' })
  static blue = proxyFn(this, { prop: 'blue' })
  static magenta = proxyFn(this, { prop: 'magenta' })
  static cyan = proxyFn(this, { prop: 'cyan' })
  static white = proxyFn(this, { prop: 'white' })
  static gray = proxyFn(this, { prop: 'gray' })
  static grey = proxyFn(this, { prop: 'grey' })

  static default = proxyFn(this, { prop: 'default' })
  static reset = proxyFn(this, { prop: 'reset' })
  static bold = proxyFn(this, { prop: 'bold' })
  static dim = proxyFn(this, { prop: 'dim' })
  static italic = proxyFn(this, { prop: 'italic' })
  static underline = proxyFn(this, { prop: 'underline' })
  static inverse = proxyFn(this, { prop: 'inverse' })
  static hidden = proxyFn(this, { prop: 'hidden' })
  static strikethrough = proxyFn(this, { prop: 'strikethrough' })

  static rgb = (r, g, b) => proxyFn(this, { prop: `rgb:${r}:${g}:${b}` })
  static ansi = (color) => proxyFn(this, { prop: `ansi:${color}` })
  static bright = (color) => proxyFn(this, { prop: `bright:${color}` })
  static standard = (color) => proxyFn(this, { prop: `standard:${color}` })
  
  static fg = (color) => proxyFn(this, { prop: `fg:${color}` })
  static bg = (color) => proxyFn(this, { prop: `bg:${color}` })
  static brightFg = (color) => proxyFn(this, { prop: `brightFg:${color}` })
  static brightBg = (color) => proxyFn(this, { prop: `brightFg:${color}` })

  static brightBlack = proxyFn(this, { prop: 'brightBlack' })
  static brightRed = proxyFn(this, { prop: 'brightRed' })
  static brightGreen = proxyFn(this, { prop: 'brightGreen' })
  static brightYellow = proxyFn(this, { prop: 'brightYellow' })
  static brightBlue = proxyFn(this, { prop: 'brightBlue' })
  static brightMagenta = proxyFn(this, { prop: 'brightMagenta' })
  static brightCyan = proxyFn(this, { prop: 'brightCyan' })
  static brightWhite = proxyFn(this, { prop: 'brightWhite' })
  static brightGray = proxyFn(this, { prop: 'brightGray' })
  static brightGrey = proxyFn(this, { prop: 'brightGrey' })

  static blackBg = proxyFn(this, { prop: 'blackBg' })
  static redBg = proxyFn(this, { prop: 'redBg' })
  static greenBg = proxyFn(this, { prop: 'greenBg' })
  static yellowBg = proxyFn(this, { prop: 'yellowBg' })
  static blueBg = proxyFn(this, { prop: 'blueBg' })
  static magentaBg = proxyFn(this, { prop: 'magentaBg' })
  static cyanBg = proxyFn(this, { prop: 'cyanBg' })
  static whiteBg = proxyFn(this, { prop: 'whiteBg' })
  static grayBg = proxyFn(this, { prop: 'grayBg' })
  static greyBg = proxyFn(this, { prop: 'greyBg' })

  static brightBlackBg = proxyFn(this, { prop: 'brightBlackBg' })
  static brightRedBg = proxyFn(this, { prop: 'brightRedBg' })
  static brightGreenBg = proxyFn(this, { prop: 'brightGreenBg' })
  static brightYellowBg = proxyFn(this, { prop: 'brightYellowBg' })
  static brightBlueBg = proxyFn(this, { prop: 'brightBlueBg' })
  static brightMagentaBg = proxyFn(this, { prop: 'brightMagentaBg' })
  static brightCyanBg = proxyFn(this, { prop: 'brightCyanBg' })
  static brightWhiteBg = proxyFn(this, { prop: 'brightWhiteBg' })
  static brightGrayBg = proxyFn(this, { prop: 'brightGrayBg' })
  static brightGreyBg = proxyFn(this, { prop: 'brightGreyBg' })
}

export default Colors
