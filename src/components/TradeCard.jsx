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

import { useQuery } from "@tanstack/react-query";
import manage from "./manage";

const inputHieght = 54;

const pages = [
  {
    content: "نرخ استاندارد",
  },
  {
    content: "بهترین قیمت",
  },
  {
    content: "نرخ ثابت",
  },
];
export const UserContext = createContext();

export default function Tradecard(props) {
  // const { data, isLoading, error } = useQuery(['myData'], () =>{

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.bamanchange.com/v2/exchange/currencies?active=true&flow=standard&buy=true&sell=true`
      )
      .then((res) => {
        // return res.data
        setData(manage(res.data));
      });
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

  const [fromAmount, setFromAmount] = useState(1);

  const [selectedCC, setselecctedCC] = useState({
    currencies: ["btc", "eth"],
    currencyImg: [
      "https://content-api.bamanchange.com/uploads/btc_1_527dc9ec3c.svg",
      "https://content-api.bamanchange.com/uploads/eth_f4ebb54ec0.svg",
    ],
    network: ["btc", "eth"],
    hasExternalId: [false, false],
    putCC: (id, currency, network, currencyImg, hasExternalId) => {
      // console.log(id);
      if (id === 0) {
        setselecctedCC((prev) => {
          return {
            ...prev,
            currencies: { ...prev.currencies, 0: currency },
            network: { ...prev.network, 0: network },
            currencyImg: { ...prev.currencyImg, 0: currencyImg },
            hasExternalId: { ...prev.hasExternalId, 0: hasExternalId },
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
          };
        });
      }
      handleClose();
    },
  });

  // useEffect(() => {

  // }, [fromAmount, selectedCC.currencies[0], selectedCC.currencies[1]]);

  const [toAmount, setToAmount] = useState();

  const [minData, setMinData] = useState([]);

  const [checkData, setCheckData] = useState([]);

  const [isError, setIsError] = useState("");

  const minUrl = `https://bamanchange.com/exchange/api/range?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=standard`;

  const checkUrl = `https://bamanchange.com/exchange/api/available-pairs?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=`;

  const amountUrl = `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromAmount=${fromAmount}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=standard`;

  const fetchAmount = (amountRef ,cc1 ,cc2 ,net1,net2) => {
    axios
      .get(
        `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${cc1}&toCurrency=${cc2}&fromAmount=${amountRef}&fromNetwork=${net1}&toNetwork=${net2}&flow=standard`
      )
      .then((res) => {
        setToAmount(res?.data.toAmount);
        // console.log(cc1.current);
      });


  };

  const getMinAmount = ()=>{
    axios.get(minUrl).then((res) => {
      setMinData(res?.data);
    });

  }

  useEffect(() => {

    amountRef.current = fromAmount;
    cc1.current = selectedCC.currencies[0];
    cc2.current = selectedCC.currencies[1];
    net1.current = selectedCC.network[0];
    net2.current = selectedCC.network[1];

      fetchAmount( amountRef.current ,cc1.current ,cc2.current ,net1.current ,net2.current);

      setInterval(() => {
        axios
        .get(
          `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${cc1.current}&toCurrency=${cc2.current}&fromAmount=${amountRef.current}&fromNetwork=${net1.current}&toNetwork=${net2.current}&flow=standard`
        )
        .then((res) => {
          setToAmount(res?.data.toAmount);
          // console.log(cc1.current);
        });
      }, 20000);


    getMinAmount();
    
    
    axios
      .get(checkUrl)
      .then((res) => {
        setCheckData(res?.data);
      })
      .catch((err) => {});

    // console.log(minData.maxAmount)

    if (!minData.maxAmount) {
      if (fromAmount < minData.minAmount && fromAmount.length > 0) {
        setIsError(true);
      }
      if (fromAmount > minData.minAmount || fromAmount.length < 1) {
        setIsError(false);
      }
    }
    if (minData.maxAmount) {
      if (
        fromAmount < minData.minAmount &&
        fromAmount.length > 0 &&
        fromAmount > minData.maxAmount
      ) {
        setIsError(true);
      } else if (
        fromAmount > minData.minAmount ||
        fromAmount.length < 1 ||
        fromAmount < minData.maxAmount
      ) {
        setIsError(false);
      }
    }

  }, [fromAmount, selectedCC.currencies[0], selectedCC.currencies[1]]);
  
  // console.log(data);
  // useEffect(() => {

  //   // setInterval(() => {
  //   //   setProgress((prevProgress) =>
  //   //     prevProgress >= 100 ? 0 : prevProgress + 10
  //   //   );
  //   // }, 500);
  // }, [fromAmount]);

  const [payIn, setPayIn] = useState();

  const [payId, setPayId] = useState();

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
  const changeColor = (id) => {
    setActive(id);
  };

  // console.log(open);

  return (
    <UserContext.Provider
      value={{
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
                isError
                  ? `حداقل میزان معامله ${minData.minAmount} می باشد`
                  : "پرداخت"
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
              startAdornment={<CircularProgress />}
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
              disabled={!checkData[0]?.flow.standard || !toAmount}
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
            <Buttonfee inputHieght={inputHieght} />
          </Grid>
        </Grid>
      </Box>
    </UserContext.Provider>
  );
}
