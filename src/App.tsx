import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  EloisePage,
  EloiseWidget,
  FirebaseConfig,
  Loading,
  PagesType,
  SiteConfig,
  Theme,
} from "./";
import SideModal from "./components/blocks/sideModal";
import { Other, ReportBug } from "./components/pages";
import Footer from "./components/widgets/footer";
import { Logic } from "./functions";
import { FB, FBInterface } from "./functions/firebase";

const siteConfigPlace = {
  api: " ",
  id: "",
  name: "",
  pages: [],
  defaultMode: "Buyer/Seller",
  logo: "",
  inverseLogo: "",
  sideWidget: [],
  eloiseConfig: {
    endPoint: "",
    chatLog: "",
    initMessage: "Hi This is elosie",
  },
  headerTrans: false,
  peopleConfig: [],
  hostingSite: "test",
};

export class UndefinedLogic {
  fb: FBInterface;
  perms: undefined;
  auth: undefined;
  other: undefined;
  color: { [key: string]: Function };
  generic: { [key: string]: Function };
  api: undefined;
  apiCall: Function = () => {};
  zillowParse: Function = () => {};
  hooks: { [key: string]: Function } = {};
  constructor() {
    this.fb = new FB({}, siteConfigPlace);
    this.perms = undefined;
    this.auth = undefined;
    this.other = undefined;
    this.color = {};
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
  eloiseContent: EloiseIntel[]; // Add this line
  setEloiseContent: (content: EloiseIntel[]) => void; // Add this line
}
/**
 * @interface EloiseIntel
 * @description Represents the structure of an EloiseIntel object.
 *
 * @property {string} [title] - Optional. The title associated with the EloiseIntel object.
 * @property {string} [desc] - Optional. A short description of the EloiseIntel object.
 * @property {string} [text] - Optional. The textual content associated with the EloiseIntel object.
 * @property {string} [id] - Optional. A unique identifier for the EloiseIntel object.
 * @property {string} [purpose] - Optional. The purpose or objective associated with the EloiseIntel object.
 * @property {any} [position] - Optional. Specifies the position of the EloiseIntel object. The type of this property is not strictly defined, and can be anything.
 */
export interface EloiseIntel {
  title?: string;
  desc?: string;
  text?: string;
  id?: string;
  purpose?: string;
  position?: any;
}

const ThemeContext = createContext<EloiseContext>({
  fireBaseConfig: {
    config: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    },
    storageDir: "",
  },
  siteConfig: siteConfigPlace,
  theme: {
    colors: [],
    white: `hsla(0, 0%, 100%, 1)`,
    font: "",
    fontSize: "3px",
    borderRadius: "3px",
    border: "",

    mode: "light",
  },
  logic: new UndefinedLogic(),
  eloiseContent: [], // Add this line
  setEloiseContent: () => {},
});

export const useEloise = (): {
  theme: Theme;
  siteConfig: SiteConfig;
  fireBaseConfig: FirebaseConfig;
  logic: Logic | UndefinedLogic;
  eloiseContent: EloiseIntel[]; // Add this line
  setEloiseContent: Function; // Add this line
} => useContext(ThemeContext);

function Eloise({ theme, siteConfig, fireBaseConfig }: AppProps) {
  useEffect(() => {
    const currentPage = window.location.pathname;

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key) {
        let split = key.split("_");
        if (!key.split("").includes("_")) {
        } else {
          const pageKey = split[0];

          if (pageKey !== currentPage) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  }, []);

  const logic = new Logic(fireBaseConfig, siteConfig);
  const [fetchedTheme, setFetchedTheme] = useState<Theme | null>(null);
  // Fetch the theme from the database when the component is mounted
  useEffect(() => {
    async function fetchTheme() {
      const themeFromDB = await logic.fb.docs.getTheme();
      if (themeFromDB && themeFromDB.colors) {
        setFetchedTheme(themeFromDB);
      } else {
        console.log("No Theme in DB Setting to Local Copy");
        await logic.fb.docs.setTheme(theme);
      }
    }

    fetchTheme();
  }, []);
  const [eloiseContent, setEloiseContent] = useState<EloiseIntel[]>([]);

  const [user, userLoading, userError] = useAuthState(logic.fb.auth);
  const [mode, setMode] = useState("white");
  const [siteMode, setSiteMode] = useState<string>(siteConfig.defaultMode);

  const [remainingPages, setRemainingPages] = useState<EloisePage[]>([]);

  logic.hooks.useAsyncEffect(async () => {
    let locTest = localStorage.getItem("siteMode");
    if (locTest) {
      setSiteMode(locTest);
    } else {
      if (user) {
        let fbTest = await logic.fb.docs.getUserDoc("");
        if (fbTest && fbTest.siteMode) {
          setSiteMode(fbTest.siteMode);
          localStorage.setItem("siteMode", fbTest.siteMode);
        }
      }
    }
  }, [user]);
  // Helper function to get the first page
  function getFirstPage(pages: PagesType): EloisePage {
    return Array.isArray(pages) ? pages[0] : pages(siteMode)[0];
  }

  // Recursive function to generate routes
  function generateRoutes(pages: EloisePage[]): any {
    return pages.map((page: EloisePage) => {
      // If the page has nested pages, recursively generate routes for them
      if (page.pages) {
        return generateRoutes(page.pages);
      }

      // Otherwise, return a route for the current page
      return (
        <Route
          key={page.name}
          path={page.url ?? `/${page.name}`}
          element={
            <EloiseWidget eloiseIntel={{ ...page.intel }}>
              {page.component}
            </EloiseWidget>
          }
        />
      );
    });
  }
  useEffect(() => {
    let all = Array.isArray(siteConfig.pages)
      ? siteConfig.pages.slice(1)
      : siteConfig.pages(siteMode).slice(1);

    if (!user) {
      all.filter((page: EloisePage) => page.noAuth);
    }
    setRemainingPages(all);
  }, [user]);

  useEffect(() => {}, [eloiseContent]);

  if (siteConfig) {
    return (
      <ThemeContext.Provider
        value={{
          theme,
          siteConfig: {
            ...siteConfig,
            pages:
              typeof siteConfig.pages === "function"
                ? siteConfig.pages(siteMode).concat([
                    {
                      name: "Error Other",
                      component: <Other />,
                      hidden: true,
                      url: "other",
                    },
                    {
                      name: "Report Bug",
                      component: <ReportBug />,
                      hidden: true,
                      url: "report-bug",
                    },
                  ])
                : [
                    ...siteConfig.pages,
                    {
                      name: "Error Other",
                      component: <Other />,
                      hidden: true,
                      url: "other",
                    },
                    {
                      name: "Report Bug",
                      component: <ReportBug />,
                      hidden: true,
                      url: "report-bug",
                    },
                  ],
          },
          fireBaseConfig,
          logic,
          eloiseContent, // Add this line
          setEloiseContent, // Add this line
        }}>
        <div className="App">
          <BrowserRouter>
            {siteConfig.noHeader ? <></> : <Header />}
            <SideModal />

            <Routes>
              <Route
                path="/"
                element={getFirstPage(siteConfig.pages).component}
              />
              {generateRoutes(remainingPages)}
            </Routes>

            {siteConfig.noAuth ? <></> : <Footer />}
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    );
  } else return <Loading />;
}

export default Eloise;
