import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ButtonTrade from "./ButtonTrade";

import ButtonChooze from "./ButtonChooze";
import { useEffect, useState, createContext, useRef } from "react";

import PopUpCC from "./PopUpCC";

import InputTrade from "./InputTrade";

import { useTheme } from "@emotion/react";
import SmButton from "./SmButton";
import Buttonfee from "./Buttonfee";
import PopUpTrade from "./PopUpTrade";

import SettingsIcon from "@mui/icons-material/Settings";
import PopUpSetting from "./PopUpSetting.";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import axiosRetry from 'axios-retry';

import { useQuery } from "@tanstack/react-query";
import manage from "../functions/manage";

const inputHieght = 54;

const endPoint = 'https://dexha.io';

const pages = [
  {
    content: "نرخ استاندارد",
  },
  {
    content: "نرخ ثابت",
  },
  {
    content: "بهترین قیمت",
  },
];
export const UserContext = createContext();

export default function Tradecard(props) {
  // const { data, isLoading, error } = useQuery(['myData'], () =>{

  const [data, setData] = useState([]);

  useEffect(() => {

    axios
    .get(
      `${endPoint}/exchange/api/currencies?raw=true&active=true&flow=standard&buy=true&sell=true`
      )
      .then((res) => {
        setData(manage(res.data));
      })

  }, []);

  // setData(fetch(data))

  // }

  // );

  // console.log(data);

  const theme = useTheme();
  // console.log( "YYYYYYYYYYYYYYYYYY")

  const amountRef = useRef(1);

  const cc1 = useRef("btc");

  const cc2 = useRef("eth");

  const net1 = useRef("btc");

  const net2 = useRef("eth");

  const flowRef = useRef();

  const payIdRef = useRef();

  const [fromAmount, setFromAmount] = useState(1);

  const [selectedCC, setselecctedCC] = useState({
    currencies: ["btc", "eth"],
    currencyImg: [
      `https://content-api.dexha.io/uploads/btc_1_527dc9ec3c.svg`,
      `https://content-api.dexha.io/uploads/eth_f4ebb54ec0.svg`,
    ],
    network: ["btc", "eth"],
    hasExternalId: [false, false],
    legacyTicker: ["btc", "eth"],
    putCC: (id, currency, network, currencyImg, hasExternalId ,legacyTicker) => {
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

  const [flow, setFlow] = useState("standard");

  const [toAmount, setToAmount] = useState();

  const [speed, setSpeed] = useState();

  const [depositFee, setDepositFee] = useState();

  const [withdrawalFee, setWithdrawalFee] = useState();

  const [minData, setMinData] = useState();

  const [maxData, setMaxData] = useState();

  const [checkData, setCheckData] = useState([]);

  const [isError, setIsError] = useState("");

  const [payIn, setPayIn] = useState();

  const [payId, setPayId] = useState();

  const [step, setStep] = useState(0);

  const [ratio, setRatio] = useState();

  // console.log(flow);

  const checkUrl = `${endPoint}/exchange/api/available-pairs?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=`;

  const amountUrl = `${endPoint}/exchange/api/estimated-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromAmount=${fromAmount}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=${flow}`;

  const fetchAmount = (amountRef, cc1, cc2, net1, net2, flow) => {
    axios
      .get(
        `${endPoint}/exchange/api/estimated-amount?fromCurrency=${cc1}&toCurrency=${cc2}&fromAmount=${amountRef}&fromNetwork=${net1}&toNetwork=${net2}&flow=${flow}`
      )
      .then((res) => {
        setToAmount(res?.data.toAmount);
        setSpeed(res?.data.transactionSpeedForecast);
        setDepositFee(res?.data.depositFee);
        setWithdrawalFee(res?.data.withdrawalFee);
        // console.log(cc1.current);
      })

  };

  const getMinAmount = (cc1, cc2, net1, net2, flow) => {
    const minUrl = `${endPoint}/exchange/api/range?fromCurrency=${cc1}&toCurrency=${cc2}&fromNetwork=${net1}&toNetwork=${net2}&flow=${flow}`;

    axios
      .get(minUrl)
      .then((res) => {
        setMinData(res?.data.minAmount);
        // console.log(res?.data.minAmount);
        setMaxData(res?.data.maxAmount);
      })

  };
  // console.log(step);

  useEffect(() => {
    amountRef.current = fromAmount;
    cc1.current = selectedCC.currencies[0];
    cc2.current = selectedCC.currencies[1];
    net1.current = selectedCC.network[0];
    net2.current = selectedCC.network[1];
    flowRef.current = flow;
    payIdRef.current = payId;

    fetchAmount(
      fromAmount,
      selectedCC.currencies[0],
      selectedCC.currencies[1],
      selectedCC.network[0],
      selectedCC.network[1],
      flow
    );

    const fetchAmountInterval = setInterval(() => {
      // console.log(payIdRef.current);
      if (!payIdRef.current) {
        axios
          .get(
            `${endPoint}/exchange/api/estimated-amount?fromCurrency=${cc1.current}&toCurrency=${cc2.current}&fromAmount=${amountRef.current}&fromNetwork=${net1.current}&toNetwork=${net2.current}&flow=${flowRef.current}`
          )
          .then((res) => {
            setToAmount(res?.data.toAmount);
          })

        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 100
        );
      }
    }, 5000);


    getMinAmount(cc1.current, cc2.current, net1.current, net2.current, flow);

    axios
      .get(checkUrl)
      .then((res) => {
        setCheckData(res?.data);
      })


    return () => {
      clearInterval(fetchAmountInterval);
    };
  }, [fromAmount, selectedCC, flow, payId]);


  useEffect(() => {

    axios
    .get(
      `${endPoint}/exchange/api/estimated-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromAmount=1&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=${flow}`
    )
    .then((res) => {
      setRatio(res?.data.toAmount);
    })



  }, [ selectedCC, flow]);

  useEffect(() => {
    // console.log(minData)
    // console.log(fromAmount)

    if (!maxData) {
      // console.log('lllllllllll');
      if (fromAmount < minData) {
        setIsError(true);
      }
      if (fromAmount > minData || fromAmount.length < 1) {
        setIsError(false);
      }
    }

    if (maxData) {
      // console.log('oooooooooooooo');
      if (fromAmount < minData 
        || fromAmount > maxData
        ) {
        setIsError(true);
      } else if (
        fromAmount > minData ||
        fromAmount.length < 1
        //  || fromAmount < maxData
      ) {
        setIsError(false);
      }
    }
  }, [minData, fromAmount, selectedCC, flow]);

  // console.log("fjsldfjskdfjlskfjskfjlsdfjlsfjlsfjlsfj")

  // console.log(toAmount);

  // console.log(selectedCC.toAmount);

  const [progress, setProgress] = useState(0);

  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = (value) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  const cardBox = {
    display: "flex",
    padding: "20px",
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: props.borderRadius,
    justifyContent: "center",
  };

  const iconCircle = {
    transition: "transform .2s ease-in-out",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    "&:hover": {
      transform: "rotate(180deg)",
    },
  };

  const [active, setActive] = useState(0);
  const changeColor = (id, index) => {
    setActive(id);
    if (index === 0) {
      setFlow("standard");
    }
    if (index === 1) {
      setFlow("fixed-rate");
    }
  };


  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay ,  retries: 10000 });

  // console.log(minData);

  return (
    <UserContext.Provider
      value={{
        endPoint,
        data,
        // isLoading,
        // error,
        selectedCC,
        toAmount,
        fetchAmount,

        // post,
        payId,
        setPayId,
        payIn,
        setPayIn,
        fromAmount,
        getMinAmount,
        speed,
        depositFee,
        withdrawalFee,
        step,
        setStep,
        ratio,
      }}
    >
      <Box sx={cardBox}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {pages.map((page, index) => (
                <ButtonChooze
                  key={index}
                  id={index}
                  content={page.content}
                  active={active === index}
                  changeColor={changeColor}
                />
              ))}
            </div>
            <Button
              onClick={() => {
                handleClickOpen(3);
              }}
              color="common"
              sx={{ minWidth: 0 }}
            >
              <SettingsIcon />
              <CircularProgress variant="determinate" value={progress} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <InputTrade
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);
              }}
              error={isError}
              label={
                isError ? `حداقل میزان معامله ${minData} می باشد` : "پرداخت"
              }
              type="number"
              height={inputHieght}
              borderRadius={theme.shape.borderRadius["1"]}
              endAdornment={
                <SmButton
                  dropDownIcon={true}
                  id={0}
                  handleClickOpen={() => {
                    handleClickOpen(0);
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <KeyboardArrowDownIcon sx={iconCircle} />
          </Grid>

          <Grid item xs={12}>
            <InputTrade
              lable={true}
              value={toAmount ? toAmount : ""}
              label="دریافت"
              type="number"
              height={inputHieght}
              borderRadius={theme.shape.borderRadius["1"]}
              endAdornment={
                <SmButton
                  dropDownIcon={true}
                  id={1}
                  handleClickOpen={() => {
                    handleClickOpen(1);
                  }}
                />
              }
              startAdornment={ toAmount ? <></> : <CircularProgress color="secondary" sx={{ height: "auto !important"}} />}
            />
          </Grid>
          {open === 0 ? (
            <PopUpCC
              id={0}
              borderRadius={props.borderRadius}
              open={open}
              onClose={handleClose}
            />
          ) : (
            <></>
          )}
          {open === 1 ? (
            <PopUpCC
              id={1}
              borderRadius={props.borderRadius}
              open={open}
              onClose={handleClose}
            />
          ) : (
            <></>
          )}
          {open === 3 ? (
            <PopUpSetting
              id={3}
              borderRadius={props.borderRadius}
              open={open}
              onClose={handleClose}
            />
          ) : (
            <></>
          )}
          <Grid item xs={12}>
            <ButtonTrade
              handleClickOpen={() => {
                handleClickOpen(2);
                fetch(amountUrl)
                  .then((res) => res.json())
                  .then((res) => {
                    setToAmount(res?.toAmount);
                  });
              }}
              id={2}
              borderRadius={theme.shape.borderRadius["1"]}
              content={
                checkData[0]?.flow.standard === false
                  ? "جفت ارز مورد نظر موجود نیست"
                  : "تبادل"
              }
              width="100%"
              fontSize="1.2em"
              height={50}
              disabled={!checkData[0]?.flow.standard || !toAmount || isError}
            />
          </Grid>
          {open === 2 ? (
            <PopUpTrade
              toAmount={toAmount?.toAmount}
              id={2}
              borderRadius={props.borderRadius}
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          ) : (
            <></>
          )}
          <Grid item xs={12}>
            <Buttonfee inputHieght={inputHieght}  />
          </Grid>
        </Grid>
      </Box>
    </UserContext.Provider>
  );
}
