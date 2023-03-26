import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"

import * as fs from 'fs';
import * as path from 'path';
import Text from './components/text';


interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  rounded:boolean;
  // Add other theme properties here
}

const themeFilePath = path.join(process.cwd(), 'theme.json');
const themeFileContent = fs.readFileSync(themeFilePath, 'utf8');
const theme: Theme = JSON.parse(themeFileContent);

export {theme, Text}