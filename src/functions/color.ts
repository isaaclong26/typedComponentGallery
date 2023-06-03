import chroma from "chroma-js";
import { Theme } from "..";


export type ThemeColor = "primary" | "secondary" | 'accent' | 'grey' | HSLAColor | string

export const getColor = (color: ThemeColor , theme:Theme):ThemeColor=>{
      switch(color){
        case "primary":
          return theme.primary
        case "secondary":
          return theme.secondary
        case "accent":
          return theme.accent;
        case 'grey':
          return theme.grey;
        default: return color;
      }
}

/**
 * Defines an HSLA color type, formatted as a string
 * @example
 * ```
 * hsla(23, 34%, 54% 100)
 * ```
 */

export type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

/**
 * A collection of color utility methods.
 * @typedef {Object} ColorMethods
 * @property {function(HSLAColor): HSLAColor} lighten - Returns a lightened version of the provided HSLA color.
 * @property {function(HSLAColor): HSLAColor} darken - Returns a darkened version of the provided HSLA color.
 * @property {function(HSLAColor): HSLAColor} getTextColorFromBackground - Returns the appropriate text color to use with the provided background color.
 */

/**
 * A string representing an HSLA color.
 * @typedef {string} HSLAColor
 */

/**
 * Returns a lightened version of the provided HSLA color.
 * @function
 * @memberof ColorMethods
 * @param {HSLAColor} hslaColor - The HSLA color to lighten.
 * @returns {HSLAColor} A lightened version of the provided HSLA color.
 * @throws {Error} If the provided color is not a valid HSLA color.
 */

/**
 * Returns a darkened version of the provided HSLA color.
 * @function
 * @memberof ColorMethods
 * @param {HSLAColor} hslaColor - The HSLA color to darken.
 * @returns {HSLAColor} A darkened version of the provided HSLA color.
 * @throws {Error} If the provided color is not a valid HSLA color.
 */

/**
 * Returns the appropriate text color to use with the provided background color.
 * @function
 * @memberof ColorMethods
 * @param {HSLAColor} backgroundColor - The background color.
 * @returns {HSLAColor} The appropriate text color to use with the provided background color.
 * @throws {Error} If the provided color is not a valid HSLA color.
 */
/**
 * An interface for color methods that includes functions to lighten, darken, and get text color from a background color.
 */
export interface ColorMethods {
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
}

export const color:ColorMethods={

    lighten: (hslaColor: HSLAColor): HSLAColor => {
        // Convert HSLA color to HSL values
        const regex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;
        const matches = hslaColor.match(regex);
        if (!matches) {
          throw new Error("Invalid HSLA color");
        }
        const h = parseInt(matches[1]);
        const s = parseFloat(matches[2]) / 100;
        const l = Math.min(1, parseFloat(matches[3]) / 100 + 0.1);
        const a = parseFloat(matches[4]);
      
        // Return the lightened HSLA color
        return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`;
      },
      darken: (hslaColor: HSLAColor): HSLAColor => {
        // Convert HSLA color to HSL values
        const regex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;
        const matches = hslaColor.match(regex);
        if (!matches) {
          throw new Error("Invalid HSLA color");
        }
        const h = parseInt(matches[1]);
        const s = parseFloat(matches[2]) / 100;
        const l = Math.max(0, parseFloat(matches[3]) / 100 - 0.1);
        const a = parseFloat(matches[4]);
      
        // Return the darkened HSLA color
        return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`;
      },
      
      
      getTextColorFromBackground: (backgroundColor: HSLAColor): HSLAColor => {
        // Convert HSLA color to HSL values
        const regex = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;
        const matches = backgroundColor.match(regex);
        if (!matches) {
          throw new Error("Invalid HSLA color");
        }
        const h = parseInt(matches[1]);
        const s = parseFloat(matches[2]) / 100;
        const l = parseFloat(matches[3]) / 100;
        const a = parseFloat(matches[4]);
      
        // Choose text color based on lightness and opacity
        const opacityAdjustedL = (1 - a) + a * l;
        const textColor = opacityAdjustedL > 0.5 ? 'hsla(0, 0%, 0%, 1)' : 'hsla(0, 0%, 100%, 1)';
      
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
        const matches = hsla.match(/hsla\((\d+), (\d+)%?, (\d+)%?, (\d+(\.\d+)?)\)/);
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
      }
      
      
    
      
      
      
      
      

}