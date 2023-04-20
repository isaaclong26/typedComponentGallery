import { HSLAColor, ColorMethods } from "../";

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
      }
      
    
      
      
      
      
      

}