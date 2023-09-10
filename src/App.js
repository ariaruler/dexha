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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button, Drawer } from "@mui/material";

const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    common: {
      main: "#fff",
      white: "#fff",
    },
    primary: {
      main: "#0561ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f7931a",
      contrastText: "#7896cf",
    },
    error: {
      main: "#f7931a",
    },
    mode: "dark",
    divider: "rgba(0,0,0,0)",
    background: {
      paper: "rgba(256,256,256,0.1)",
      default: "#000044",
    },
    grey: {
      50: "rgba(58, 72, 97, 0.5)",
    },
  },
  shadows: ["rgba(38, 105, 245, 0.25) 0px 0px 16px "],
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
  shadows: {
    1: "rgb(9, 22, 46) 0px 6px 12px 0px",
  },
  shape: {
    borderRadius: ["6px", "8px", "12px"],
  },

});

darkTheme.shadows[24] = darkTheme.shadows[0];

// console.log(darkTheme);

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, top: open });
  };


  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Header />
            <Drawer
            anchor='top'
            open={0}
            onClose={toggleDrawer('top', false)}
          >
<Button />
          </Drawer>
            <AnimatedRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
