import { fb } from "./firebase";
import { Generic } from "./generic";



export class Logic {
  fb = fb;

  perms: Function
  other: Function
  auth: Function
  generic: Generic
  api = "https://us-central1-eloiselife-c5cf6.cloudfunctions.net/api"
  getTextColorFromBackground:Function= (backgroundColor: string): string =>{
    // Convert hex color to RGB values
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
  
    // Calculate relative luminance using sRGB color space
    const rsrgb = r / 255;
    const gsrgb = g / 255;
    const bsrgb = b / 255;
  
    const rl =
      rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4) // red relative luminance
      + gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4) // green relative luminance
      + bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4); // blue relative luminance
  
    // Choose text color based on relative luminance
    return rl > 0.5 ? "black" : "white";
  }
  // api = "http://127.0.0.1:5001/eloiselife-c5cf6/us-central1/api";

  constructor(perms: Function, auth: Function, other: Function) {
    this.perms = perms
    this.other = other
    this.auth = auth
    
    this.generic = new Generic(perms, auth, other, this.api)
  }

 



}
