"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;// src/colors.ts
var ESC = "\x1B";
var RESET = `${ESC}[0m`;
var proxyFn = (proxy, { prop = void 0 } = {}) => {
  if (!prop) throw new Error("No prop");
  return (...args) => {
    if (args.length === 0) return proxy.chain(prop, proxy);
    const props = [...proxy._genStyles || [], prop];
    return proxy.render(args.shift(), props);
  };
};
var Colors = (_class = class _Colors {
  static __initStatic() {this.debugMode = true}
  static __initStatic2() {this.onError = "warn"}
  // 'throw', 'log', 'ignore'
  static __initStatic3() {this.cfg = {
    colorize: true,
    onError: "warn"
    // 'throw', 'warn', 'ignore'
  }}
  __init() {this.cfg = {}}
  __init2() {this._genStyles = []}
  static __initStatic4() {this.codes = {
    effects: {
      reset: 0,
      bold: { set: 1, reset: 22 },
      dim: { set: 2, reset: 22 },
      italic: { set: 3, reset: 23 },
      underline: { set: 4, reset: 24 },
      inverse: { set: 7, reset: 27 },
      hidden: { set: 8, reset: 28 },
      strikethrough: { set: 9, reset: 29 }
    },
    types: {
      fg: 3,
      bg: 4,
      bfg: 9,
      bbg: 10
    },
    colors: {
      black: 0,
      red: 1,
      green: 2,
      yellow: 3,
      blue: 4,
      magenta: 5,
      cyan: 6,
      white: 7,
      gray: 8,
      grey: 8,
      default: 9
    }
  }}
  static __initStatic5() {this.fns = {
    reset: {
      fg: () => [39],
      bg: () => [49],
      all: () => [39, 49]
    },
    standard: {
      fg: (color) => [`3${color}`],
      bg: (color) => [`4${color}`]
    },
    bright: {
      fg: (color) => [`9${color}`],
      bg: (color) => [`10${color}`]
    },
    ansi: {
      fg: (color) => [38, 5, color],
      bg: (color) => [48, 5, color]
    },
    rgb: {
      fg: (r, g, b) => [38, 2, r, g, b],
      bg: (r, g, b) => [48, 2, r, g, b]
    }
  }}
  constructor(cfg = {}, styles = []) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.cfg = Object.assign(this.cfg, _Colors.cfg, cfg);
    this._genStyles = [...this._genStyles, ...Array.isArray(styles) ? styles : [styles]];
    const proxy = new Proxy(this, {
      get(target, prop) {
        if (target[prop]) return target[prop];
        return proxyFn(target, { prop });
      }
    });
    return proxy;
  }
  chain(style) {
    return new _Colors(this.cfg, [...this._genStyles, style]);
  }
  render(str, styles = []) {
    if (typeof styles === "string") styles = [styles];
    styles = [...this._genStyles, ...styles];
    return _Colors.render(str, styles);
  }
  static chain(style, proxy) {
    return new _Colors({}, [style]);
  }
  static render(str, styles = []) {
    const codes = [];
    if (typeof styles === "string") styles = [styles];
    styles.forEach((style) => {
      let code = _Colors.effect(style);
      if (!code) code = _Colors.color(style);
      if (code) {
        if (Array.isArray(code)) codes.push(...code);
        else codes.push(code);
      } else _Colors.error(`Unknown style: ${style}`);
    });
    return _Colors.apply(str, codes);
  }
  static $infuse(cfg, styles) {
    return new _Colors(cfg, styles);
  }
  static fn(...styles) {
    const instance = new _Colors({}, styles);
    return instance.render.bind(instance);
  }
  static apply(str, codes = []) {
    return `${ESC}[${codes.join(";")}m${str}${RESET}`;
  }
  static effect(effect) {
    effect = effect.toLowerCase();
    let fn = "set";
    if (effect.endsWith("off")) {
      fn = "reset";
      effect = effect.slice(0, -3);
    }
    const e = _Colors.codes.effects[effect];
    return e ? e[fn] : null;
  }
  static color(color) {
    switch (typeof color) {
      case "string":
        color = color.toLowerCase();
        if (color.includes(":")) {
          const colors = color.split(":");
          const action = colors.shift();
          let type2 = "fg";
          switch (action) {
            case "rgb":
              if (colors.length > 3) type2 = colors.pop();
              if (colors.length !== 3) return null;
              return _Colors.fns.rgb[type2](...colors);
            case "256":
            case "ansi":
            case "8bit":
              if (colors.length > 1) type2 = colors.pop();
              if (colors.length !== 1) return null;
              if (!_Colors.fns.ansi[type2]) return _Colors.error(`Unknown ANSI color type: ${type2} (must be 'fg' or 'bg')`);
              return _Colors.fns.ansi[type2](colors[0]);
            case "standard":
              if (colors.length !== 1) return null;
              return _Colors.fns.standard[type2](colors[0]);
            case "bright":
              if (colors.length !== 1) return null;
              return _Colors.fns.bright[type2](colors[0]);
            case "reset":
              if (!_Colors.fns.reset[colors[0]]) return _Colors.error(`Unknown reset type: ${colors[0]}`);
              return _Colors.fns.reset[colors[0]]();
            default:
              return null;
          }
        }
        let type = "fg";
        let bright2 = false;
        if (color.startsWith("bright")) {
          bright2 = true;
          color = color.slice(6);
        }
        if (color.endsWith("bg")) {
          type = "bg";
          color = color.slice(0, -2);
        }
        const cc = _Colors.codes.colors[color];
        const tc = _Colors.codes.types[bright2 ? `b${type}` : type];
        if (cc === void 0 || !tc) return null;
        return `${tc}${cc}`;
      case "number":
        return _Colors.codes.colors[256].fg(color);
      case "object":
        return _Colors.color(`rgb:${color.r}:${color.g}:${color.b}`);
    }
  }
  static error(msg) {
    if (!_Colors.debugMode || _Colors.onError === "ignore") return;
    if (_Colors.onError === "warn") console.error(_Colors.render(`[WARN] ${msg}`, ["yellow"]));
    else throw new Error(msg);
  }
  static __initStatic6() {this.black = exports.black = proxyFn(this, { prop: "black" })}
  static __initStatic7() {this.red = exports.red = proxyFn(this, { prop: "red" })}
  static __initStatic8() {this.green = exports.green = proxyFn(this, { prop: "green" })}
  static __initStatic9() {this.yellow = exports.yellow = proxyFn(this, { prop: "yellow" })}
  static __initStatic10() {this.blue = exports.blue = proxyFn(this, { prop: "blue" })}
  static __initStatic11() {this.magenta = exports.magenta = proxyFn(this, { prop: "magenta" })}
  static __initStatic12() {this.cyan = exports.cyan = proxyFn(this, { prop: "cyan" })}
  static __initStatic13() {this.white = exports.white = proxyFn(this, { prop: "white" })}
  static __initStatic14() {this.gray = exports.gray = proxyFn(this, { prop: "gray" })}
  static __initStatic15() {this.grey = exports.grey = proxyFn(this, { prop: "grey" })}
  static __initStatic16() {this.default = proxyFn(this, { prop: "default" })}
  static __initStatic17() {this.reset = proxyFn(this, { prop: "reset" })}
  static __initStatic18() {this.bold = exports.bold = proxyFn(this, { prop: "bold" })}
  static __initStatic19() {this.dim = exports.dim = proxyFn(this, { prop: "dim" })}
  static __initStatic20() {this.italic = exports.italic = proxyFn(this, { prop: "italic" })}
  static __initStatic21() {this.underline = exports.underline = proxyFn(this, { prop: "underline" })}
  static __initStatic22() {this.inverse = exports.inverse = proxyFn(this, { prop: "inverse" })}
  static __initStatic23() {this.hidden = exports.hidden = proxyFn(this, { prop: "hidden" })}
  static __initStatic24() {this.strikethrough = exports.strikethrough = proxyFn(this, { prop: "strikethrough" })}
  static __initStatic25() {this.rgb = exports.rgb = (r, g, b) => proxyFn(this, { prop: `rgb:${r}:${g}:${b}` })}
  static __initStatic26() {this.ansi = exports.ansi = (color) => proxyFn(this, { prop: `ansi:${color}` })}
  static __initStatic27() {this.bright = exports.bright = (color) => proxyFn(this, { prop: `bright:${color}` })}
  static __initStatic28() {this.standard = exports.standard = (color) => proxyFn(this, { prop: `standard:${color}` })}
  static __initStatic29() {this.fg = exports.fg = (color) => proxyFn(this, { prop: `fg:${color}` })}
  static __initStatic30() {this.bg = exports.bg = (color) => proxyFn(this, { prop: `bg:${color}` })}
  static __initStatic31() {this.brightFg = exports.brightFg = (color) => proxyFn(this, { prop: `brightFg:${color}` })}
  static __initStatic32() {this.brightBg = exports.brightBg = (color) => proxyFn(this, { prop: `brightFg:${color}` })}
  static __initStatic33() {this.brightBlack = exports.brightBlack = proxyFn(this, { prop: "brightBlack" })}
  static __initStatic34() {this.brightRed = exports.brightRed = proxyFn(this, { prop: "brightRed" })}
  static __initStatic35() {this.brightGreen = exports.brightGreen = proxyFn(this, { prop: "brightGreen" })}
  static __initStatic36() {this.brightYellow = exports.brightYellow = proxyFn(this, { prop: "brightYellow" })}
  static __initStatic37() {this.brightBlue = exports.brightBlue = proxyFn(this, { prop: "brightBlue" })}
  static __initStatic38() {this.brightMagenta = exports.brightMagenta = proxyFn(this, { prop: "brightMagenta" })}
  static __initStatic39() {this.brightCyan = exports.brightCyan = proxyFn(this, { prop: "brightCyan" })}
  static __initStatic40() {this.brightWhite = exports.brightWhite = proxyFn(this, { prop: "brightWhite" })}
  static __initStatic41() {this.brightGray = exports.brightGray = proxyFn(this, { prop: "brightGray" })}
  static __initStatic42() {this.brightGrey = exports.brightGrey = proxyFn(this, { prop: "brightGrey" })}
  static __initStatic43() {this.blackBg = exports.blackBg = proxyFn(this, { prop: "blackBg" })}
  static __initStatic44() {this.redBg = exports.redBg = proxyFn(this, { prop: "redBg" })}
  static __initStatic45() {this.greenBg = exports.greenBg = proxyFn(this, { prop: "greenBg" })}
  static __initStatic46() {this.yellowBg = exports.yellowBg = proxyFn(this, { prop: "yellowBg" })}
  static __initStatic47() {this.blueBg = exports.blueBg = proxyFn(this, { prop: "blueBg" })}
  static __initStatic48() {this.magentaBg = exports.magentaBg = proxyFn(this, { prop: "magentaBg" })}
  static __initStatic49() {this.cyanBg = exports.cyanBg = proxyFn(this, { prop: "cyanBg" })}
  static __initStatic50() {this.whiteBg = exports.whiteBg = proxyFn(this, { prop: "whiteBg" })}
  static __initStatic51() {this.grayBg = exports.grayBg = proxyFn(this, { prop: "grayBg" })}
  static __initStatic52() {this.greyBg = exports.greyBg = proxyFn(this, { prop: "greyBg" })}
  static __initStatic53() {this.brightBlackBg = exports.brightBlackBg = proxyFn(this, { prop: "brightBlackBg" })}
  static __initStatic54() {this.brightRedBg = exports.brightRedBg = proxyFn(this, { prop: "brightRedBg" })}
  static __initStatic55() {this.brightGreenBg = exports.brightGreenBg = proxyFn(this, { prop: "brightGreenBg" })}
  static __initStatic56() {this.brightYellowBg = exports.brightYellowBg = proxyFn(this, { prop: "brightYellowBg" })}
  static __initStatic57() {this.brightBlueBg = exports.brightBlueBg = proxyFn(this, { prop: "brightBlueBg" })}
  static __initStatic58() {this.brightMagentaBg = exports.brightMagentaBg = proxyFn(this, { prop: "brightMagentaBg" })}
  static __initStatic59() {this.brightCyanBg = exports.brightCyanBg = proxyFn(this, { prop: "brightCyanBg" })}
  static __initStatic60() {this.brightWhiteBg = exports.brightWhiteBg = proxyFn(this, { prop: "brightWhiteBg" })}
  static __initStatic61() {this.brightGrayBg = exports.brightGrayBg = proxyFn(this, { prop: "brightGrayBg" })}
  static __initStatic62() {this.brightGreyBg = proxyFn(this, { prop: "brightGreyBg" })}
}, _class.__initStatic(), _class.__initStatic2(), _class.__initStatic3(), _class.__initStatic4(), _class.__initStatic5(), _class.__initStatic6(), _class.__initStatic7(), _class.__initStatic8(), _class.__initStatic9(), _class.__initStatic10(), _class.__initStatic11(), _class.__initStatic12(), _class.__initStatic13(), _class.__initStatic14(), _class.__initStatic15(), _class.__initStatic16(), _class.__initStatic17(), _class.__initStatic18(), _class.__initStatic19(), _class.__initStatic20(), _class.__initStatic21(), _class.__initStatic22(), _class.__initStatic23(), _class.__initStatic24(), _class.__initStatic25(), _class.__initStatic26(), _class.__initStatic27(), _class.__initStatic28(), _class.__initStatic29(), _class.__initStatic30(), _class.__initStatic31(), _class.__initStatic32(), _class.__initStatic33(), _class.__initStatic34(), _class.__initStatic35(), _class.__initStatic36(), _class.__initStatic37(), _class.__initStatic38(), _class.__initStatic39(), _class.__initStatic40(), _class.__initStatic41(), _class.__initStatic42(), _class.__initStatic43(), _class.__initStatic44(), _class.__initStatic45(), _class.__initStatic46(), _class.__initStatic47(), _class.__initStatic48(), _class.__initStatic49(), _class.__initStatic50(), _class.__initStatic51(), _class.__initStatic52(), _class.__initStatic53(), _class.__initStatic54(), _class.__initStatic55(), _class.__initStatic56(), _class.__initStatic57(), _class.__initStatic58(), _class.__initStatic59(), _class.__initStatic60(), _class.__initStatic61(), _class.__initStatic62(), _class);
var colors_default = Colors;

// src/list.ts
var black = colors_default.black;
var red = colors_default.red;
var green = colors_default.green;
var yellow = colors_default.yellow;
var blue = colors_default.blue;
var magenta = colors_default.magenta;
var cyan = colors_default.cyan;
var white = colors_default.white;
var gray = colors_default.gray;
var grey = colors_default.grey;
var bold = colors_default.bold;
var dim = colors_default.dim;
var italic = colors_default.italic;
var underline = colors_default.underline;
var inverse = colors_default.inverse;
var hidden = colors_default.hidden;
var strikethrough = colors_default.strikethrough;
var rgb = colors_default.rgb;
var ansi = colors_default.ansi;
var bright = colors_default.bright;
var standard = colors_default.standard;
var fg = colors_default.fg;
var bg = colors_default.bg;
var brightFg = colors_default.brightFg;
var brightBg = colors_default.brightBg;
var brightBlack = colors_default.brightBlack;
var brightRed = colors_default.brightRed;
var brightGreen = colors_default.brightGreen;
var brightYellow = colors_default.brightYellow;
var brightBlue = colors_default.brightBlue;
var brightMagenta = colors_default.brightMagenta;
var brightCyan = colors_default.brightCyan;
var brightWhite = colors_default.brightWhite;
var brightGray = colors_default.brightGray;
var brightGrey = colors_default.brightGrey;
var blackBg = colors_default.blackBg;
var redBg = colors_default.redBg;
var greenBg = colors_default.greenBg;
var yellowBg = colors_default.yellowBg;
var blueBg = colors_default.blueBg;
var magentaBg = colors_default.magentaBg;
var cyanBg = colors_default.cyanBg;
var whiteBg = colors_default.whiteBg;
var grayBg = colors_default.grayBg;
var greyBg = colors_default.greyBg;
var brightBlackBg = colors_default.brightBlackBg;
var brightRedBg = colors_default.brightRedBg;
var brightGreenBg = colors_default.brightGreenBg;
var brightYellowBg = colors_default.brightYellowBg;
var brightBlueBg = colors_default.brightBlueBg;
var brightMagentaBg = colors_default.brightMagentaBg;
var brightCyanBg = colors_default.brightCyanBg;
var brightWhiteBg = colors_default.brightWhiteBg;
var brightGrayBg = colors_default.brightGrayBg;

// src/index.ts
var src_default = Colors;

























































exports.Colors = Colors; exports.ansi = ansi; exports.bg = bg; exports.black = black; exports.blackBg = blackBg; exports.blue = blue; exports.blueBg = blueBg; exports.bold = bold; exports.bright = bright; exports.brightBg = brightBg; exports.brightBlack = brightBlack; exports.brightBlackBg = brightBlackBg; exports.brightBlue = brightBlue; exports.brightBlueBg = brightBlueBg; exports.brightCyan = brightCyan; exports.brightCyanBg = brightCyanBg; exports.brightFg = brightFg; exports.brightGray = brightGray; exports.brightGrayBg = brightGrayBg; exports.brightGreen = brightGreen; exports.brightGreenBg = brightGreenBg; exports.brightGrey = brightGrey; exports.brightMagenta = brightMagenta; exports.brightMagentaBg = brightMagentaBg; exports.brightRed = brightRed; exports.brightRedBg = brightRedBg; exports.brightWhite = brightWhite; exports.brightWhiteBg = brightWhiteBg; exports.brightYellow = brightYellow; exports.brightYellowBg = brightYellowBg; exports.cyan = cyan; exports.cyanBg = cyanBg; exports.default = src_default; exports.dim = dim; exports.fg = fg; exports.gray = gray; exports.grayBg = grayBg; exports.green = green; exports.greenBg = greenBg; exports.grey = grey; exports.greyBg = greyBg; exports.hidden = hidden; exports.inverse = inverse; exports.italic = italic; exports.magenta = magenta; exports.magentaBg = magentaBg; exports.red = red; exports.redBg = redBg; exports.rgb = rgb; exports.standard = standard; exports.strikethrough = strikethrough; exports.underline = underline; exports.white = white; exports.whiteBg = whiteBg; exports.yellow = yellow; exports.yellowBg = yellowBg;
