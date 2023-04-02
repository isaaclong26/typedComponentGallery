// Theme.ts
export interface Theme {
    primary: string;
    secondary: string;
    white: string;
    font: string;
    color: string;
    red: string;
    relFontSize: string;
    borderRadius: boolean;
    border: string;
    accent: string;
    grey: string;
    mode: "light" | "dark"
  }
  
  export const theme: Theme = {
    primary: 'hsla(126, 49%, 42%)',
    secondary: 'hsla(159, 31%, 78%)',
    white: 'hsla(90, 60%, 96%)',
    font: 'roboto',
    color: 'white',
    red: 'hsla(351, 70%, 38%)',
    relFontSize: '1.25rem',
    borderRadius: true,
    border: 'none',
    accent: 'hsla(5, 88%, 57%)',
    grey: 'hsla(180, 6%, 56%)',
    mode: 'light'
  };
  
// SiteConfig.ts
export interface SiteConfig {
    name: string;
    pages: string[];
    logo: string;
  }
  
  export const siteConfig: SiteConfig = {
    name: 'TaskMaster',
    pages: ['Scripts', 'Outposts'],
    logo: 'image.png',
  };
  