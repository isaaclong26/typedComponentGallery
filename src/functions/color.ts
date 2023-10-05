import chroma from "chroma-js";

/**
 * Defines an Hex color type, formatted as a string with or without the hashtag
 * @example
 * ```
 * #ffffff | ffffff
 * ```
 */

type HexColor = `#${string & { length: 6 }}` | `${string & { length: 6 }}`;
/**
 * Defines an RGB color type, formatted as a string with or without the alpha value
 * @example
 * ```
 * rgb(10,10,10) | rgba(10,10,10,1)
 * ```
 */

type RGBColor =
  | `rgb(${number},${number},${number})`
  | `rgba(${number},${number},${number},${number})`;
/**
 * Defines an HSLA color type, formatted as a string with or without the alpha value
 * @example
 * ```
 * hsla(23, 34%, 54% 100)
 * ```
 */
type HSLAColor =
  | `hsl(${number},${number}%,${number}%)`
  | `hsla(${number},${number}%,${number}%,${number})`;

/**
 * Parent Color Type Can be HSLA RGB or Hex

 */
type Color = HexColor | RGBColor | HSLAColor | "black" | "white";

interface ColorMethods {
  /**
   * A function that lightens an HSLA color value by a specified amount.
   *
   * @param hslaColor - The HSLA color value to be lightened.
   * @returns The new HSLA color value that has been lightened.
   */
  lighten: (hslaColor: HSLAColor) => HSLAColor;

  /**
   * A function that darkens an HSLA color value by a specified amount.
   *
   * @param hslaColor - The HSLA color value to be darkened.
   * @returns The new HSLA color value that has been darkened.
   */
  darken: (hslaColor: HSLAColor) => HSLAColor;

  /**
   * A function that returns the text color that provides the best contrast against a given HSLA background color.
   *
   * @param backgroundColor - The HSLA color value of the background color.
   * @returns The HSLA color value of the text color that has the best contrast against the given background color.
   */
  getTextColorFromBackground: (backgroundColor: HSLAColor) => HSLAColor;

  getPerceivedColor: (hsla: HSLAColor) => string;

  hslaToHex: (hsla: HSLAColor) => string;
  /**
   * Converts a hex color code to its HSLA representation.
   *
   * @param {string} hex - The hex color code to be converted. May include a leading '#' character.
   * @param {number} [alpha] - The alpha channel value. Optional, between 0 and 1.
   * @returns {HSLAColor} The HSLA representation of the given hex color code.
   *                       Returns either an 'hsl()' or 'hsla()' formatted string.
   * @throws Will throw an error if the hex color code is invalid.
   *
   * @example
   * const hsla = hexToHSLA("#ff0000");
   * console.log(hsla);  // Outputs "hsl(0, 100%, 50%)"
   *
   * @example
   * const hslaWithAlpha = hexToHSLA("#ff0000", 0.5);
   * console.log(hslaWithAlpha);  // Outputs "hsla(0, 100%, 50%, 0.5)"
   */

  hexToHSLA: (hex: string, alpha?: number) => HSLAColor;

  /**
   * Converts an RGB color value to its HSLA representation.
   *
   * @param {number} r - The red component, between 0 and 255.
   * @param {number} g - The green component, between 0 and 255.
   * @param {number} b - The blue component, between 0 and 255.
   * @param {number} [alpha] - The alpha channel value. Optional, between 0 and 1.
   * @returns {HSLAColor} The HSLA representation of the given RGB color value.
   *                       Returns either an 'hsl()' or 'hsla()' formatted string.
   *
   * @example
   * const hsla = RGBtoHSLA(255, 0, 0);
   * console.log(hsla);  // Outputs "hsl(0, 100%, 50%)"
   *
   * @example
   * const hslaWithAlpha = RGBtoHSLA(255, 0, 0, 0.5);
   * console.log(hslaWithAlpha);  // Outputs "hsla(0, 100%, 50%, 0.5)"
   */
  RGBtoHSLA: (r: number, g: number, b: number, alpha?: number) => HSLAColor;

  convertToHSLA: (color: Color, alpha?: number) => HSLAColor;
}

const color: ColorMethods = {
  RGBtoHSLA: (r: number, g: number, b: number, alpha?: number): HSLAColor => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const min = Math.min(rNorm, gNorm, bNorm);
    const max = Math.max(rNorm, gNorm, bNorm);

    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === rNorm) h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
      else if (max === gNorm) h = (bNorm - rNorm) / d + 2;
      else h = (rNorm - gNorm) / d + 4;

      h /= 6;
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    h = +(h * 360).toFixed(1);

    if (alpha !== undefined) {
      return `hsla(${h}, ${s}%, ${l}%, ${alpha})` as HSLAColor;
    }

    return `hsl(${h}, ${s}%, ${l}%)` as HSLAColor;
  },
  hexToHSLA: (hex: string, alpha?: number): HSLAColor => {
    let localHex = hex.replace("#", "");
    const r = parseInt(localHex.substring(0, 2), 16);
    const g = parseInt(localHex.substring(2, 4), 16);
    const b = parseInt(localHex.substring(4, 6), 16);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const min = Math.min(rNorm, gNorm, bNorm);
    const max = Math.max(rNorm, gNorm, bNorm);

    let l = (min + max) / 2;

    let s = 0;
    if (max !== min) {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    }

    let h = 0;
    if (max !== min) {
      if (max === rNorm) {
        h = (gNorm - bNorm) / (max - min);
      } else if (max === gNorm) {
        h = 2.0 + (bNorm - rNorm) / (max - min);
      } else {
        h = 4.0 + (rNorm - gNorm) / (max - min);
      }
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    if (alpha !== undefined) {
      return `hsla(${h}, ${s}%, ${l}%, ${alpha})` as HSLAColor;
    }
    return `hsl(${h}, ${s}%, ${l}%)` as HSLAColor;
  },
  convertToHSLA: (tcolor: Color, alpha?: number): HSLAColor => {
    if (tcolor === "white") {
      return "hsla(0,0%,100%, 1)";
    }
    if (tcolor === "black") {
      return "hsla(0,0%,0%, 1)";
    }
    function isHexColor(tcolor: Color): tcolor is HexColor {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(tcolor);
    }

    function isRGBColor(tcolor: Color): tcolor is RGBColor {
      return /^rgb(a)?\(([\d, %]+)\)$/.test(tcolor);
    }

    function isHSLAColor(tcolor: Color): tcolor is HSLAColor {
      return /^hsl(a)?\([\d., %]+\)$/.test(tcolor);
    }

    if (isHSLAColor(tcolor)) {
      return tcolor;
    }

    if (isHexColor(tcolor)) {
      return color.hexToHSLA(tcolor, alpha);
    }

    if (isRGBColor(tcolor)) {
      const rgb = tcolor as unknown as RGBColor; // Force TypeScript to accept the type
      const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
      return color.RGBtoHSLA(r, g, b, alpha);
    }

    throw new Error(`Unsupported color format: ${color}`);
  },
  lighten: (hslaColor: HSLAColor): HSLAColor => {
    try {
      const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/;
      const matches = hslaColor.match(regex);

      if (!matches) {
        throw new Error("Invalid HSLA color");
      }

      const h = parseInt(matches[1]);
      const s = parseFloat(matches[2]);
      const l = Math.min(100, parseFloat(matches[3]) + 10);
      const a = matches[4] !== undefined ? parseFloat(matches[4]) : undefined;

      if (a !== undefined) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})` as HSLAColor;
      } else {
        return `hsl(${h}, ${s}%, ${l}%)` as HSLAColor;
      }
    } catch (error) {
      return "hsla(0, 0%, 0%, 1)" as HSLAColor;
    }
  },

  darken(hslaColor: HSLAColor): HSLAColor {
    try {
      const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/;
      const matches = hslaColor.match(regex);

      if (!matches) {
        throw new Error("Invalid HSLA color");
      }

      const h = parseInt(matches[1]);
      const s = parseFloat(matches[2]);
      const l = Math.max(0, parseFloat(matches[3]) - 10);
      const a = matches[4] !== undefined ? parseFloat(matches[4]) : undefined;

      if (a !== undefined) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})` as HSLAColor;
      } else {
        return `hsl(${h}, ${s}%, ${l}%)` as HSLAColor;
      }
    } catch (error) {
      return "hsla(0, 0%, 0%, 1)" as HSLAColor;
    }
  },

  getTextColorFromBackground: (backgroundColor: HSLAColor): HSLAColor => {
    // Detect if the provided color is HSLA or HSL
    const isHSLA = backgroundColor.includes("hsla");
    const regex = isHSLA
      ? /hsla\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/
      : /hsl\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)/;

    const matches = backgroundColor.match(regex);
    if (!matches) {
      throw new Error("Invalid HSLA color");
    }

    const h = parseFloat(matches[1]);
    const s = parseFloat(matches[2]) / 100;
    const l = parseFloat(matches[3]) / 100;
    const a = isHSLA ? parseFloat(matches[4]) : 1;

    // Choose text color based on lightness and opacity
    const opacityAdjustedL = 1 - a + a * l;
    const textColor: HSLAColor =
      opacityAdjustedL > 0.5 ? "hsla(0, 0%, 0%, 1)" : "hsla(0, 0%, 100%, 1)";

    return textColor;
  },

  getPerceivedColor(hsla: HSLAColor): string {
    let color = chroma(hsla);
    let hue = color.get("hsl.h");
    let lightness = color.get("hsl.l");

    let dominantColor = "";
    if (hue <= 30 || hue > 330) {
      dominantColor = "red";
    } else if (hue > 30 && hue <= 90) {
      dominantColor = "yellow";
    } else if (hue > 90 && hue <= 150) {
      dominantColor = "green";
    } else if (hue > 150 && hue <= 210) {
      dominantColor = "cyan";
    } else if (hue > 210 && hue <= 270) {
      dominantColor = "blue";
    } else if (hue > 270 && hue <= 330) {
      dominantColor = "magenta";
    }

    let perceivedBrightness = lightness < 0.5 ? "dark" : "light";

    return `${perceivedBrightness} ${dominantColor}`;
  },

  hslaToHex(hsla: HSLAColor): string {
    // Parse the HSLA color
    const matches = hsla.match(
      /hsla\((\d+), (\d+)%?, (\d+)%?, (\d+(\.\d+)?)\)/
    );
    if (!matches) {
      throw new Error("Invalid HSLA color");
    }

    const h = Number(matches[1]);
    const s = Number(matches[2]);
    let l = Number(matches[3]);

    // Convert HSL to HEX ignoring alpha
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  },
};

export { Color, ColorMethods, HSLAColor, HexColor, RGBColor, color };
