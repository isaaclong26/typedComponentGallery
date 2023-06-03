import React, { createContext, useEffect, useState , useContext} from 'react';
import { Route, Router, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header,  Loading, Login, Home} from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Logic } from './functions';
import { EloisePage, EloiseWidget, FirebaseConfig, SiteConfig, Theme } from './';
import SideModal from './components/blocks/sideModal';
import Footer from './components/widgets/footer';
import { Hooks } from './functions/hooks';
import { Other, ReportBug } from './components/pages';
import { FB, FBInterface } from './functions/firebase';



const  siteConfigPlace= {
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
  headerTrans:false
}

export class UndefinedLogic {
  fb: FBInterface;
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
    this.fb = new FB({},siteConfigPlace);
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
  logic: Logic | UndefinedLogic;
  eloiseContent: EloiseIntel[], // Add this line
  setEloiseContent: (content:  EloiseIntel[]) => void; // Add this line
}

export interface EloiseIntel {
  title?: string
  desc?:string
  text?:string
  id?:string
  purpose?:string
  position?: any
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
  siteConfig:siteConfigPlace,
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
eloiseContent: [], // Add this line
setEloiseContent: () => {}, // Add this line


});

export const useEloise = (): {
  theme: Theme;
  siteConfig: SiteConfig;
  fireBaseConfig: FirebaseConfig;
  logic: Logic | UndefinedLogic;
  eloiseContent: EloiseIntel[]; // Add this line
  setEloiseContent:Function // Add this line
} => useContext(ThemeContext);



function Eloise({ theme, siteConfig, fireBaseConfig }: AppProps) {

  

  useEffect(() => {
    const currentPage = window.location.pathname;

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key) {
        let split = key.split("_")
        if(!key.split("").includes("_")) {

        }
        else{
        const pageKey = split[0]
        
        if (pageKey !== currentPage) {
          localStorage.removeItem(key);
        }
      }
      }
    }
  }, []);

  const logic = new Logic(fireBaseConfig, siteConfig);
 
  const [eloiseContent, setEloiseContent] = useState<EloiseIntel[]>([]);

  const [user, userLoading, userError] = useAuthState(logic.fb.auth);
  const [mode, setMode] = useState('white');


  useEffect(()=>{
  },[eloiseContent])

  return (
    <ThemeContext.Provider 
    value={{
       theme, 
       siteConfig: {...siteConfig, pages: [...siteConfig.pages,  {
        name: "Error Other",
        component: <Other/>,
        hidden: true,
        url:"other"
      },
      {
        name: "Report Bug",
        component: <ReportBug/>,
        hidden: true,
        url:"report-bug"
      }]},
        fireBaseConfig, 
        logic,
        eloiseContent, // Add this line
        setEloiseContent, // Add this line
         }}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <SideModal/>

          {user ? (
            <Routes>
              <Route path="/" element={siteConfig.pages[0].component}/>
              {siteConfig.pages.slice(1).map((page:EloisePage) => (
                <Route  key={page.name} path={page.url?? `/${page.name}`} element={ <EloiseWidget eloiseIntel={{...page.intel}}>{page.component}</EloiseWidget> }/>
              ))}
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={ <EloiseWidget eloiseIntel={{...siteConfig.pages[0].intel}}>{siteConfig.pages[0].component}</EloiseWidget>}/>
              {siteConfig.pages.slice(1).filter((page:EloisePage)=> page.noAuth).map((page:EloisePage) => (
                <Route  key={page.name} path={page.url?? `/${page.name}`} element={ <EloiseWidget eloiseIntel={{...page.intel}}>{page.component}</EloiseWidget> }/>
              ))}
            </Routes>
          )}
          <Footer/>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default Eloise;

