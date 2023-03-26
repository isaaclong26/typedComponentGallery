function getTextColorFromBackground(backgroundColor: string): string {
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
  
  function darkenColor(hexColor: string, amount: number) {
    const color = hexColor.replace(/[^0-9a-f]/gi, '');
    const num = parseInt(color, 16);
    const r = (num >> 16) - amount;
    const g = ((num >> 8) & 0x00FF) - amount;
    const b = (num & 0x0000FF) - amount;
    const newColor = (r << 16) + (g << 8) + b;
    return `#${newColor.toString(16).padStart(6, '0')}`;
  }
  const lighten = (color: string, amount: number): string => {
    let usePound = false;
    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }
  
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
  
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
  
    let b = ((num >> 8) & 0x00ff) + amount;
  
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
  
    let g = (num & 0x0000ff) + amount;
  
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
  
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  };
  export {darkenColor, getTextColorFromBackground, lighten}