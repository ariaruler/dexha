import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";

import vazirBold from "./assets/fonts/Vazir-Bold.woff2";
import vazirBlack from "./assets/fonts/Vazir-Black.woff2";
import vazirMedium from "./assets/fonts/Vazir-Medium.woff2";

import AnimatedRoutes from "./components/AnimatedRoutes";



const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    // common:{
    //   white: '#000'
    // },
    primary: {
      main: "#0561ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f7931a",
      contrastText: "#5f7bb0",
    },
    mode: "dark",
    divider: "rgba(0,0,0,0)",
    background: {
      paper: "rgba(256,256,256,0.1)",
      default: "#000044",
    },
    shadows: {
      0: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      1: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      2: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      3: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      4: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      5: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      6: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      7: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
      8: "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
    },
  },
  typography: {
    fontFamily: "Vazir",
    fontSize: 13,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `

      @font-face {
        font-family: Vazir;
        src: url(${vazirBold}) format('woff2');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: Vazir;
    src: url(${vazirBlack}) format('woff2'),
        font-weight: 900;
        font-style: normal;
      }
      @font-face {
        font-family: Vazir;
        src:  url(${vazirMedium}) format('woff2');
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

          <AnimatedRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
