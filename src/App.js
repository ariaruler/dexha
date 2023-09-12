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
import { useEffect, useState, createContext, useRef } from "react";

import axios from "axios";
import axiosRetry from "axios-retry";


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

const controller = new AbortController();

// console.log(darkTheme);
const endPoint = "https://dexha.io";


const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const emails = ["username@gmail.com", "user02@gmail.com"];


export const UserContext = createContext();

function App() {

  const [selectedCC, setselecctedCC] = useState({
    currencies: ["btc", "eth"],
    currencyImg: [
      `https://content-api.dexha.io/uploads/btc_1_527dc9ec3c.svg`,
      `https://content-api.dexha.io/uploads/eth_f4ebb54ec0.svg`,
    ],
    network: ["btc", "eth"],
    hasExternalId: [false, false],
    legacyTicker: ["btc", "eth"],
    putCC: (
      id,
      currency,
      network,
      currencyImg,
      hasExternalId,
      legacyTicker
    ) => {
      // console.log(id);
      if (id === 0) {
        setselecctedCC((prev) => {
          return {
            ...prev,
            currencies: { ...prev.currencies, 0: currency },
            network: { ...prev.network, 0: network },
            currencyImg: { ...prev.currencyImg, 0: currencyImg },
            hasExternalId: { ...prev.hasExternalId, 0: hasExternalId },
            legacyTicker: { ...prev.legacyTicker, 0: legacyTicker },
          };
        });
        // console.log(selectedCC);
      }
      if (id === 1) {
        setselecctedCC((prev) => {
          return {
            ...prev,
            currencies: { ...prev.currencies, 1: currency },
            network: { ...prev.network, 1: network },
            currencyImg: { ...prev.currencyImg, 1: currencyImg },
            hasExternalId: { ...prev.hasExternalId, 1: hasExternalId },
            legacyTicker: { ...prev.legacyTicker, 1: legacyTicker },
          };
        });
      }
      handleClose();
    },
  });

  const handleSwap = () => {
    setselecctedCC((x) => ({
      ...x,
      currencies: { 0: selectedCC.currencies[1], 1: selectedCC.currencies[0] },
      network: { 0: selectedCC.network[1], 1: selectedCC.network[0] },
      currencyImg: {
        0: selectedCC.currencyImg[1],
        1: selectedCC.currencyImg[0],
      },
      hasExternalId: {
        0: selectedCC.hasExternalId[1],
        1: selectedCC.hasExternalId[0],
      },
      legacyTicker: {
        0: selectedCC.legacyTicker[1],
        1: selectedCC.legacyTicker[0],
      },
    }));
  };

  const [open, setOpen] = useState(-1);

  const [minOrMax, setMinOrMax] = useState();

  const [data, setData] = useState([]);
  
  const [minData, setMinData] = useState();
  
  const [maxData, setMaxData] = useState();
  
  const [flow, setFlow] = useState("standard");
  
  const [toAmount, setToAmount] = useState();
  
  const [speed, setSpeed] = useState();
  
  const [depositFee, setDepositFee] = useState();
  
  const [withdrawalFee, setWithdrawalFee] = useState();
  
 
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  
  const [checkData, setCheckData] = useState([]);
  
  const [isError, setIsError] = useState("");
  
  const [payIn, setPayIn] = useState();
  
  const [payId, setPayId] = useState();
  
  const [step, setStep] = useState(0);
  
  const [ratio, setRatio] = useState();


  
const fetchAmount = (amountRef, cc1, cc2, net1, net2, flow) => {
  setToAmount();
  setSpeed();
  setDepositFee();
  setWithdrawalFee();

  axios
    .get(
      `${endPoint}/exchange/api/estimated-amount?fromCurrency=${cc1}&toCurrency=${cc2}&fromAmount=${amountRef}&fromNetwork=${net1}&toNetwork=${net2}&flow=${flow}`,
      {
        signal: controller.signal,
      }
    )
    .catch((error) => {
      console.log(error);
    })
    .then((res) => {
      setToAmount(res?.data.toAmount);
      // console.log('lllllllllll');
      setSpeed(res?.data.transactionSpeedForecast);
      setDepositFee(res?.data.depositFee);
      setWithdrawalFee(res?.data.withdrawalFee);
      // console.log(cc1.current);
    })
};
  
  const getMinAmount = (cc1, cc2, net1, net2, flow) => {
    const minUrl = `${endPoint}/exchange/api/range?fromCurrency=${cc1}&toCurrency=${cc2}&fromNetwork=${net1}&toNetwork=${net2}&flow=${flow}`;
  
    axios
      .get(minUrl, {
        signal: controller.signal,
      })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setMinData(res?.data.minAmount);
        // console.log(res?.data.minAmount);
        setMaxData(res?.data.maxAmount);
      })
  };
  
  const [fromAmount, setFromAmount] = useState(1);
  

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = (value) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  

  const client = new QueryClient();

  return (
    
    <UserContext.Provider
      value={{
        endPoint,
        data,
        setData,
        flow,
        setFlow,
        setCheckData,
        // isLoading,
        // error,
        isError,
        selectedCC,
        toAmount,
        setToAmount,
        fetchAmount,
        open,
        // post,
        payId,
        setPayId,
        payIn,
        setPayIn,
        fromAmount,
        setFromAmount,
        getMinAmount,
        speed,
        depositFee,
        withdrawalFee,
        step,
        setStep,
        ratio,
        setRatio,
        maxData,
        minData,
        setIsError,
        minOrMax,
        setMinOrMax,
        handleClickOpen,
        handleSwap,
        checkData,
        selectedValue,
        handleClose,
      }}
    >
    <QueryClientProvider client={client}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Header />

            <AnimatedRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
        </UserContext.Provider>
  );
}

export default App;
