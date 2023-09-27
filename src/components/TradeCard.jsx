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
import { Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import axiosRetry from "axios-retry";

import { useQuery } from "@tanstack/react-query";
import manage from "../functions/manage";

import { useContext } from "react";
import { UserContext } from "../App";

import ButtonRefresh from "./ButtonRefresh";
import FlowChooze from "./FlowChooze";

const inputHieght = 54;

const endPoint = "https://dexha.io";

export default function Tradecard(props) {
  const {
    endPoint,
    setCurrencies,
    flow,
    setFlow,
    setCheckData,
    isError,
    selectedCC,
    toAmount,
    fetchAmount,
    open,
    payId,
    fromAmount,
    setFromAmount,
    getMinAmount,
    setRatio,
    maxData,
    minData,
    setIsError,
    minOrMax,
    setMinOrMax,
    handleClickOpen,
    handleSwap,
    checkData,
    handleClose,
    handleClickAlert,
    refreshData,
    fetchAmountInterval,
  } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `${endPoint}/exchange/api/currencies?raw=true&active=true&flow=standard&buy=true&sell=true`
      )
      .then((res) => {
        setCurrencies(manage(res.data));
      })
      .catch((error) => {
        console.log(error);
        handleClickAlert();
      });
  }, []);


  const theme = useTheme();
  // console.log( "YYYYYYYYYYYYYYYYYY")


  // console.log(flow);

  const checkUrl = `${endPoint}/exchange/api/available-pairs?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=`;

  const amountUrl = `${endPoint}/exchange/api/estimated-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromAmount=${fromAmount}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=${flow}`;

  const controller = new AbortController();

  // console.log(step);




  useEffect(() => {



    refreshData();
    return () => {

      clearInterval(fetchAmountInterval.current);
    };
  }, []);

  useEffect(() => {


    fetchAmount(
      fromAmount,
      selectedCC.currencies[0],
      selectedCC.currencies[1],
      selectedCC.network[0],
      selectedCC.network[1],
      flow
    );

    getMinAmount(
      selectedCC.currencies[0],
      selectedCC.currencies[1],
      selectedCC.network[0],
      selectedCC.network[1],
      flow
    );

    axios
      .get(checkUrl)
      .then((res) => {
        setCheckData(res?.data);
      })
      .catch((error) => {
        console.log(error);
        handleClickAlert();
      });

    return () => {

      controller.abort();
      // clearInterval(timer);
    };
  }, [
    fromAmount,
    selectedCC.legacyTicker[0],
    selectedCC.legacyTicker[1],
    flow,
    // payId,
  ]);



  useEffect(() => {
    // console.log('eeeeeeeeeeeeeeeeeeee')
    // console.log(selectedCC.currencies[0])

    if (!maxData) {
      // console.log(minData)
      // console.log(fromAmount)
      // console.log('lllllllllll');
      if (fromAmount < minData && fromAmount.length > 0) {
        setIsError(true);
      } else if (fromAmount > minData || fromAmount.length < 1) {
        setIsError(false);
      }
    }

    if (maxData) {
      // console.log('oooooooooooooo');
      if (fromAmount < minData && fromAmount.length > 0) {
        setIsError(true);
        setMinOrMax(0);
      } else if (fromAmount > maxData) {
        setMinOrMax(1);
        setIsError(true);
      } else if (
        (fromAmount > minData && fromAmount < maxData) ||
        fromAmount.length < 1
      ) {
        setIsError(false);
      }
    }
  }, [minData, fromAmount]);

  // console.log(selectedCC.legacyTicker[0])


  // console.log(selectedCC.toAmount);

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

  axiosRetry(axios, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: 4,
  });

  // console.log(minData);

  const exceptThisSymbols = ["e", "E", "+", "-"];



  return (
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
          <FlowChooze active={active} changeColor={changeColor} />

          <ButtonRefresh  />
        </Grid>

        <Grid item xs={12}>
          <InputTrade
            value={fromAmount}
            onKeyDown={(e) =>
              exceptThisSymbols.includes(e.key) && e.preventDefault()
            }
            onChange={(e) => {
              setFromAmount(e.target.value);
            }}
            error={isError}
            label={
              isError && (minData || maxData)
                ? `${minOrMax ? "حداکثر" : "حداقل"} میزان معامله ${
                    minOrMax ? maxData : minData
                  } می باشد`
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
          <KeyboardArrowDownIcon onClick={handleSwap} sx={iconCircle} />
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
            startAdornment={
              toAmount ? (
                <></>
              ) : (
                <CircularProgress
                  color="secondary"
                  sx={{ height: "auto !important" }}
                />
              )
            }
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
        {/* {open === 3 ? (
            <PopUpSetting
              id={3}
              borderRadius={props.borderRadius}
              open={open}
              onClose={handleClose}
            />
          ) : (
            <></>
          )} */}
        <Grid item xs={12}>
          <ButtonTrade
            handleClickOpen={() => {
              handleClickOpen(2);
            }}
            id={2}
            borderRadius={theme.shape.borderRadius["1"]}
            content={
              checkData[0]?.flow[flow] === false
                ? "جفت ارز مورد نظر موجود نیست"
                : "تبادل"
            }
            width="100%"
            fontSize="1.2em"
            height={50}
            disabled={!checkData[0]?.flow.standard || !toAmount || isError}
          />
        </Grid>

        <Grid item xs={12}>
          <Buttonfee inputHieght={inputHieght} />
        </Grid>
      </Grid>
    </Box>
  );
}
