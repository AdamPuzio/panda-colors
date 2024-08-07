declare class Colors {
    static debugMode: boolean;
    static onError: string;
    static cfg: {
        colorize: boolean;
        onError: string;
    };
    cfg: {};
    _genStyles: any[];
    static codes: {
        effects: {
            reset: number;
            bold: {
                set: number;
                reset: number;
            };
            dim: {
                set: number;
                reset: number;
            };
            italic: {
                set: number;
                reset: number;
            };
            underline: {
                set: number;
                reset: number;
            };
            inverse: {
                set: number;
                reset: number;
            };
            hidden: {
                set: number;
                reset: number;
            };
            strikethrough: {
                set: number;
                reset: number;
            };
        };
        types: {
            fg: number;
            bg: number;
            bfg: number;
            bbg: number;
        };
        colors: {
            black: number;
            red: number;
            green: number;
            yellow: number;
            blue: number;
            magenta: number;
            cyan: number;
            white: number;
            gray: number;
            grey: number;
            default: number;
        };
    };
    static fns: {
        reset: {
            fg: () => number[];
            bg: () => number[];
            all: () => number[];
        };
        standard: {
            fg: (color: any) => string[];
            bg: (color: any) => string[];
        };
        bright: {
            fg: (color: any) => string[];
            bg: (color: any) => string[];
        };
        ansi: {
            fg: (color: any) => any[];
            bg: (color: any) => any[];
        };
        rgb: {
            fg: (r: any, g: any, b: any) => any[];
            bg: (r: any, g: any, b: any) => any[];
        };
    };
    constructor(cfg?: {}, styles?: any[]);
    chain(style: any): Colors;
    render(str: any, styles?: any[] | any): string;
    static chain(style: any, proxy?: any): Colors;
    static render(str: any, styles?: any[] | any): string;
    static $infuse(cfg: any, styles: any): Colors;
    static fn(...styles: any[]): any;
    static apply(str: any, codes?: any[]): string;
    static effect(effect: any): any;
    static color(color: any): any;
    static error(msg: any): void;
    static black: (...args: any[]) => any;
    static red: (...args: any[]) => any;
    static green: (...args: any[]) => any;
    static yellow: (...args: any[]) => any;
    static blue: (...args: any[]) => any;
    static magenta: (...args: any[]) => any;
    static cyan: (...args: any[]) => any;
    static white: (...args: any[]) => any;
    static gray: (...args: any[]) => any;
    static grey: (...args: any[]) => any;
    static default: (...args: any[]) => any;
    static reset: (...args: any[]) => any;
    static bold: (...args: any[]) => any;
    static dim: (...args: any[]) => any;
    static italic: (...args: any[]) => any;
    static underline: (...args: any[]) => any;
    static inverse: (...args: any[]) => any;
    static hidden: (...args: any[]) => any;
    static strikethrough: (...args: any[]) => any;
    static rgb: (r: any, g: any, b: any) => (...args: any[]) => any;
    static ansi: (color: any) => (...args: any[]) => any;
    static bright: (color: any) => (...args: any[]) => any;
    static standard: (color: any) => (...args: any[]) => any;
    static fg: (color: any) => (...args: any[]) => any;
    static bg: (color: any) => (...args: any[]) => any;
    static brightFg: (color: any) => (...args: any[]) => any;
    static brightBg: (color: any) => (...args: any[]) => any;
    static brightBlack: (...args: any[]) => any;
    static brightRed: (...args: any[]) => any;
    static brightGreen: (...args: any[]) => any;
    static brightYellow: (...args: any[]) => any;
    static brightBlue: (...args: any[]) => any;
    static brightMagenta: (...args: any[]) => any;
    static brightCyan: (...args: any[]) => any;
    static brightWhite: (...args: any[]) => any;
    static brightGray: (...args: any[]) => any;
    static brightGrey: (...args: any[]) => any;
    static blackBg: (...args: any[]) => any;
    static redBg: (...args: any[]) => any;
    static greenBg: (...args: any[]) => any;
    static yellowBg: (...args: any[]) => any;
    static blueBg: (...args: any[]) => any;
    static magentaBg: (...args: any[]) => any;
    static cyanBg: (...args: any[]) => any;
    static whiteBg: (...args: any[]) => any;
    static grayBg: (...args: any[]) => any;
    static greyBg: (...args: any[]) => any;
    static brightBlackBg: (...args: any[]) => any;
    static brightRedBg: (...args: any[]) => any;
    static brightGreenBg: (...args: any[]) => any;
    static brightYellowBg: (...args: any[]) => any;
    static brightBlueBg: (...args: any[]) => any;
    static brightMagentaBg: (...args: any[]) => any;
    static brightCyanBg: (...args: any[]) => any;
    static brightWhiteBg: (...args: any[]) => any;
    static brightGrayBg: (...args: any[]) => any;
    static brightGreyBg: (...args: any[]) => any;
}

declare const black: (...args: any[]) => any;
declare const red: (...args: any[]) => any;
declare const green: (...args: any[]) => any;
declare const yellow: (...args: any[]) => any;
declare const blue: (...args: any[]) => any;
declare const magenta: (...args: any[]) => any;
declare const cyan: (...args: any[]) => any;
declare const white: (...args: any[]) => any;
declare const gray: (...args: any[]) => any;
declare const grey: (...args: any[]) => any;
declare const bold: (...args: any[]) => any;
declare const dim: (...args: any[]) => any;
declare const italic: (...args: any[]) => any;
declare const underline: (...args: any[]) => any;
declare const inverse: (...args: any[]) => any;
declare const hidden: (...args: any[]) => any;
declare const strikethrough: (...args: any[]) => any;
declare const rgb: (r: any, g: any, b: any) => (...args: any[]) => any;
declare const ansi: (color: any) => (...args: any[]) => any;
declare const bright: (color: any) => (...args: any[]) => any;
declare const standard: (color: any) => (...args: any[]) => any;
declare const fg: (color: any) => (...args: any[]) => any;
declare const bg: (color: any) => (...args: any[]) => any;
declare const brightFg: (color: any) => (...args: any[]) => any;
declare const brightBg: (color: any) => (...args: any[]) => any;
declare const brightBlack: (...args: any[]) => any;
declare const brightRed: (...args: any[]) => any;
declare const brightGreen: (...args: any[]) => any;
declare const brightYellow: (...args: any[]) => any;
declare const brightBlue: (...args: any[]) => any;
declare const brightMagenta: (...args: any[]) => any;
declare const brightCyan: (...args: any[]) => any;
declare const brightWhite: (...args: any[]) => any;
declare const brightGray: (...args: any[]) => any;
declare const brightGrey: (...args: any[]) => any;
declare const blackBg: (...args: any[]) => any;
declare const redBg: (...args: any[]) => any;
declare const greenBg: (...args: any[]) => any;
declare const yellowBg: (...args: any[]) => any;
declare const blueBg: (...args: any[]) => any;
declare const magentaBg: (...args: any[]) => any;
declare const cyanBg: (...args: any[]) => any;
declare const whiteBg: (...args: any[]) => any;
declare const grayBg: (...args: any[]) => any;
declare const greyBg: (...args: any[]) => any;
declare const brightBlackBg: (...args: any[]) => any;
declare const brightRedBg: (...args: any[]) => any;
declare const brightGreenBg: (...args: any[]) => any;
declare const brightYellowBg: (...args: any[]) => any;
declare const brightBlueBg: (...args: any[]) => any;
declare const brightMagentaBg: (...args: any[]) => any;
declare const brightCyanBg: (...args: any[]) => any;
declare const brightWhiteBg: (...args: any[]) => any;
declare const brightGrayBg: (...args: any[]) => any;

export { Colors, ansi, bg, black, blackBg, blue, blueBg, bold, bright, brightBg, brightBlack, brightBlackBg, brightBlue, brightBlueBg, brightCyan, brightCyanBg, brightFg, brightGray, brightGrayBg, brightGreen, brightGreenBg, brightGrey, brightMagenta, brightMagentaBg, brightRed, brightRedBg, brightWhite, brightWhiteBg, brightYellow, brightYellowBg, cyan, cyanBg, Colors as default, dim, fg, gray, grayBg, green, greenBg, grey, greyBg, hidden, inverse, italic, magenta, magentaBg, red, redBg, rgb, standard, strikethrough, underline, white, whiteBg, yellow, yellowBg };
