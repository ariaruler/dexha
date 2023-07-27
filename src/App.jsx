import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import {CacheProvider} from '@emotion/react';

import CssBaseline from "@mui/material/CssBaseline";
import AppTrade from "./page/AppTrade";
import LandingPage from "./page/LandingPage";
import ContactUs from "./page/ContactUs";
import Page404 from "./page/Page404";

import vazirBold from "./assets/fonts/Vazir-Bold.woff2";
import vazirBlack from "./assets/fonts/Vazir-Black.woff2";
import vazirMedium from "./assets/fonts/Vazir-Medium.woff2";
import Help from "./page/Help";
import FAQ from "./page/FAQ";
import Rules from "./page/Rules";


const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#0561ff",
    },
    mode: "dark",
    divider: "rgba(0,0,0,0)",
    background: {
      paper: "rgba(0,0,0,0)",
      default: "#000044",
    },
    shadows: {
      0 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      1 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      2 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      3 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      4 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      5 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      6 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      7 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      8 : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
    }
  },
  typography: {
    fontFamily: "Vazir",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `

      @font-face {
        font-family: Vazir;
        src: url('Vazir-Bold.eot');
        src: url('Vazir-Bold.eot?#iefix') format('embedded-opentype'),
             url(${vazirBold}) format('woff2'),
             url('Vazir-Bold.woff') format('woff'),
             url('Vazir-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: Vazir;
        src: url('Vazir-Black.eot');
        src: url('Vazir-Black.eot?#iefix') format('embedded-opentype'),
             url(${vazirBlack}) format('woff2'),
             url('Vazir-Black.woff') format('woff'),
             url('Vazir-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
      @font-face {
        font-family: Vazir;
        src: url('Vazir-Medium.eot');
        src: url('Vazir-Medium.eot?#iefix') format('embedded-opentype'),
             url(${vazirMedium}) format('woff2'),
             url('Vazir-Medium.woff') format('woff'),
             url('Vazir-Medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
      }
      `,
    },
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppTrade />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
