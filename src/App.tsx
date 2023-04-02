import React, { createContext, useEffect, useState , useContext} from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header,  Loading, Login, Home} from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Logic } from './functions';
import { Theme } from './custom';


export interface SiteConfig {
  name: string;
  pages: string[];
  logo: string;
}


interface AppProps {
  theme: Theme;
  siteConfig: SiteConfig;
}

 const ThemeContext = createContext<Theme>({
  primary: '',
  secondary: '',
  white: '',
  font: '',
  color: '',
  red: '',
  relFontSize: '',
  borderRadius: false,
  border: '',
  accent: '',
  grey: '',
  mode: 'light',
});
export const useTheme = (): Theme => useContext(ThemeContext);


const errorHandler = async () => {};
const logic = new Logic(errorHandler, errorHandler, errorHandler);

function Eloise({ theme, siteConfig }: AppProps) {
  const [user, userLoading, userError] = useAuthState(logic.fb.auth);
  const [mode, setMode] = useState('white');
  const [currentTheme, setCurrentTheme] = useState<Theme>({ ...theme, mode: mode });

  useEffect(() => {
    setCurrentTheme({ ...theme, mode: mode });
  }, [mode, theme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="App">
        <BrowserRouter>
          <Header />

          {user ? (
            <Routes>
              {siteConfig.pages.map((page) => (
                <Route path={`/${page}`} element={<Home />} />
              ))}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default Eloise;

