import React, { createContext, useEffect, useState , useContext} from 'react';
import { Route, Router, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header,  Loading, Login, Home} from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Logic } from './functions';
import { EloisePage, FirebaseConfig, SiteConfig, Theme } from './';
import SideModal from './components/blocks/sideModal';
import Footer from './components/widgets/footer';
import { Hooks } from './functions/hooks';
export class UndefinedLogic {
  fb: {[key:string]:Function};
  perms: undefined;
  auth: undefined;
  other: undefined;
  color: {[key:string]:Function};
  generic:  {[key:string]:Function};
  api: undefined;
  apiCall: Function = ()=>{}
  zillowParse: Function = ()=>{}

  hooks:{[key:string]:Function} = {};
  constructor() {
    this.fb = {};
    this.perms = undefined;
    this.auth = undefined;
    this.other = undefined;
    this.color ={};
    this.generic = {};
    this.api = undefined;
  }
}

interface AppProps {
  theme: Theme;
  siteConfig: SiteConfig;
  fireBaseConfig: FirebaseConfig;
}

interface EloiseContext {
  theme: Theme;
  siteConfig: SiteConfig;
  fireBaseConfig: FirebaseConfig;
  logic: Logic | UndefinedLogic; // optional `logic` field

}

 const ThemeContext = createContext<EloiseContext>({
  fireBaseConfig:{
    config:{
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''},
    storageDir:""
  },
  siteConfig:{
    api:" ",
    id:"",
    name: '',
    pages: [],
    logo: '',
    inverseLogo: "",
    sideWidget: [],
    eloiseConfig:{
      endPoint: "",
      chatLog: "",
      initMessage: "Hi This is elosie",
    },
    headerTrans: true,

  },
  theme:{
  primary: `hsla(0, 0%, 0%, 1)`,
  secondary: `hsla(0, 0%, 0%, 1)`,
  white: `hsla(0, 0%, 100%, 1)`,
  font: '',
  fontSize: '3px' ,
  borderRadius: '3px',
  border: '',
  accent: `hsla(0, 0%, 0%, 1)`,
  grey: `hsla(0, 0%, 0%, 1)`,
  mode: 'light'
},
logic: new UndefinedLogic(),


});


export const useEloise = (): {theme:Theme, siteConfig: SiteConfig, fireBaseConfig: FirebaseConfig, logic: Logic | UndefinedLogic} => useContext(ThemeContext);



function Eloise({ theme, siteConfig, fireBaseConfig }: AppProps) {

  const logic = new Logic(fireBaseConfig, siteConfig);

  const [user, userLoading, userError] = useAuthState(logic.fb.auth);
  const [mode, setMode] = useState('white');



  return (
    <ThemeContext.Provider value={{ theme, siteConfig, fireBaseConfig, logic }}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <SideModal/>

          {user ? (
            <Routes>
              <Route path="/" element={siteConfig.pages[0].component}/>
              {siteConfig.pages.slice(1).map((page:EloisePage) => (
                <Route  key={page.name} path={page.url?? `/${page.name}`} element={page.component} />
              ))}
              <Route path="/login" element={<Login />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={siteConfig.pages[0].component}/>

              <Route path="/login" element={<Login />} />
            </Routes>
          )}
          <Footer/>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default Eloise;

