import * as React from "react";

import Dialog from "@mui/material/Dialog";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  Skeleton,
  Slider,
  SliderThumb,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useRef } from "react";
import InputTrade from "./InputTrade";

import PopUpTitle from "./PopUpTitle";
import SmButton from "./SmButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import TradeBoared from "./TradeBoared";

import QRcode from "qrcode.react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";
import PopUpQrScan from "./PopUpQrScan";

import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import axiosRetry from "axios-retry";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PopUpError from "./PopUpError";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Buttonfee from "./Buttonfee";
import Timer from "./Timer";

import exchangeCompleted from "../assets/exchange-completed.svg";

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";

const marks = [
  {
    value: 0,
    label: "در حال دریافت ارز از شما",
  },
  {
    value: 10,
    label: "تائید واریز ",
  },
  {
    value: 20,
    label: "در حال تبادل",
  },
  {
    value: 30,
    label: "در حال ارسال",
  },
  {
    value: 40,
    label: "پایان تبادل",
  },
];

const box = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  opacity: " 0.8" /* for demo purpose  */,
  background: "red",
};

const stack = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  opacity: " 0.8" /* for demo purpose  */,
  background: "red",
  zIndex: "9",
  margin: "20px" /* for demo purpose  */,
};

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb sx={{ width: 30, height: 30 }} {...other}>
      {children}
      <CircularProgress
        sx={{ height: "auto !important", padding: 0.4 }}
        color="common"
      />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function PopUpTrade(props) {
  const [open2, setOpen2] = useState(-1);

  const handleClickOpen = (id) => {
    setOpen2(id);
  };

  // console.log(open2)

  const handleClose2 = () => {
    setOpen2(-1);
  };

  const theme = useTheme();

  const arowIcon = {
    fontSize: 1.3 * theme.typography.fontSize,
    width: "22px",
  };

  const Dialogstyle = {
    left: "-18px",
    right: "-18px",
    "& .MuiPaper-root": {
      maxWidth: 400,
      height: 556,
      margin: 0,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
  };

  const [status, setStatus] = useState([]);

  const [payOutHash, setPayOutHash] = useState();

  const handleClose = () => {
    getStatus();
    props.onClose(props.selectedValue);
    setStep(0);
    // clearData();
  };

  const previosStep = () => setStep(step - 1);

  const [check1, setCheck1] = useState(null);

  const [check2, setCheck2] = useState(null);

  const {
    endPoint,
    selectedCC,
    fetchAmount,
    flow,
    payIn,
    setPayIn,
    payId,
    setPayId,
    fromAmount,
    toAmount,
    step,
    setStep,
    indexOfPage,
    setIndexOfPage,
    mainData,
    setMainData,
    handleClickAlert,
    rateId,
  } = useContext(UserContext);

  const [exteraId, setExteraId] = useState();

  const [exteraId2, setExteraId2] = useState();

  const [payInExteraId, setPayInExteraId] = useState();

  const [data2, setData2] = useState();

  const [data1, setData1] = useState();

  const controller = new AbortController();

  const checkData = async (address, currency) => {
    // console.log(currency);
    // console.log(address);
    return axios
      .get(
        `${endPoint}/exchange/api/validate-address?currency=${currency}&address=${address}`,
        {
          signal: controller.signal,
        }
      )
      .catch((error) => {
        console.log(error);
        handleClickAlert();
      })
      .then((res) => {
        if (res) {
          // console.log(res.data);
          return res.data.result;
        } else {
          handleClickAlert();
        }
      });
  };

  useEffect(() => {
    setCheck1(null);
    if (data2) {
      checkData(data2, selectedCC.legacyTicker[1]).then((res) =>
        setCheck1(res)
      );
    }

    // return () => {
    //   controller.abort();
    // };
  }, [data2]);

  useEffect(() => {
    setCheck2(null);

    if (data1) {
      checkData(data1, selectedCC.legacyTicker[0]).then((res) =>
        setCheck2(res)
      );
    }

    // return () => {
    //   controller.abort();
    // };
  }, [data1]);

  const post = async () => {
    const userToPost = {
      fromCurrency: selectedCC.currencies[0],
      toCurrency: selectedCC.currencies[1],
      fromNetwork: selectedCC.network[0],
      toNetwork: selectedCC.network[1],
      fromAmount: fromAmount,
      address: data2,
      flow: flow,
      payoutExtraId: exteraId,
      refundExtraId: exteraId2,
      rateId: rateId ? rateId : "",
    };
    console.log(userToPost);

    const res = await axios
      .post(`${endPoint}/exchange/api/create`, userToPost)
      .catch((error) => {
        console.log("Error: ", error);
        handleClickAlert();
      });
    console.log(res.data);
    if (res) {
      // console.log(res.data.id)
      setPayInExteraId(res.data.payinExtraId);
      setPayId(res.data.id);
      setPayIn(res.data.payinAddress);
      setMainData((x) => [
        ...x,
        {
          currencies: selectedCC.currencies,
          id: res.data.id,
          payIn: res.data.payinAddress,
        },
      ]);
    } else {
      handleClickAlert();
    }
  };

  const postRefund = async () => {
    const userToPost = {
      id: payId,
      address: data1,
      extraId: exteraId2,
    };
    console.log(userToPost);

    const res = await axios
      .post(`${endPoint}/exchange/api/refund`, userToPost)
      .catch((error) => {
        console.log("Error: ", error);
        handleClickAlert();
      });
    console.log(res.data);
    if (res.data) {
      if (res.data.success) {
        getStatus();
        setSliderValue(100);
        setStatusFa("بازپرداخت انجام شد");
        setStep(3);
      } else {
        setStatusFa("عملیات دچار مشکل شده است");
        setSliderValue(0);
      }
    }
  };

  const postContinue = async () => {
    const userToPost = {
      id: payId,
    };
    console.log(userToPost);

    const res = await axios
      .post(`${endPoint}/exchange/api/continue`, userToPost)
      .catch((error) => {
        console.log("Error: ", error);
        handleClickAlert();
      });
    console.log(res.data);
    if (res.data) {
      if (res.data.success) {
        getStatus();
        setSliderValue(100);
        setStatusFa("پایان تبادل");
        setStep(3);
      } else {
        postRefund();
      }
    }
  };

  const getStatusInterval = useRef();

  const getStatus = (x) => {
    // payIdRef.current = x;
    // console.log(x);
    if (!x) {
      clearInterval(getStatusInterval.current);
    }

    getStatusInterval.current = setInterval(() => {
      if (x) {
        // console.log("ppppppppppppppppp");
        axios
          .get(`${endPoint}/exchange/api/by-id?id=${x}`)
          .catch((error) => {
            console.log(error);
            handleClickAlert();
          })
          .then((res) => {
            if (res) {
              console.log(res);
              setStatus((y) => {
                return { ...y, [x]: res?.data.status };
              });
              setPayOutHash(res?.data.payoutHash);
            }
          });
      }
    }, 15000);
  };

  useEffect(() => {
    // console.log(payId);
    if (payId) {
      getStatus(payId);
    }
  }, [payId]);

  useEffect(() => {
    return () => {
      getStatus();
      // setPayIn();
    };
  }, []);

  // console.log(payId);

  const [sliderValue, setSliderValue] = useState(0);

  const [statusFa, setStatusFa] = useState("در حال ساخت تراکنش");

  useEffect(() => {
    switch (status[payId]) {
      case "waiting":
        setSliderValue(20);
        setStatusFa("در انتظار واریز");
        break;
      case "confirming":
        setSliderValue(40);
        setStatusFa("تائید واریز");
        break;
      case "exchanging":
        setSliderValue(60);
        setStatusFa("در حال تبادل");
        break;
      case "sending":
        setSliderValue(80);
        setStatusFa("در حال ارسال ارز");
        break;
      case "finished":
        getStatus();
        setSliderValue(100);
        setStatusFa("پایان تبادل");
        setStep(3);
        break;
      case "failed":
        setSliderValue(0);
        setStatusFa("مشکلی در تبادل پیش آمده");
        axios
          .get(`${endPoint}/exchange/actions?id=${payId}`)
          .catch((error) => {
            console.log(error);
            handleClickAlert();
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.continue.available) {
              setStatusFa("در حال ادامه تبادل");
              setSliderValue(50);
              postContinue();
            } else if (
              !res.data.continue.available &&
              res.data.refund.available
            ) {
              setStatusFa("در حال ادامه تبادل");
              setSliderValue(50);
              postRefund();
            } else {
              setStatusFa("عملیات دچار مشکل شده است");
              setSliderValue(0);
            }
          });
        break;
    }
  }, [status[payId]]);

  axiosRetry(axios, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: 4,
  });

  const [open, setOpen] = useState(-1);

  const handleTooltipClose = () => {
    console.log('ppppppppp');
    setOpen(-1);
  };



  const [timeOut, setTimeOut] = useState(false);

  return (
    <>
      <PopUpError
        id={2}
        borderRadius={props.borderRadius}
        open={open2}
        onClose={handleClose2}
        handleClose={handleClose}
      />
      {(() => {
        switch (step) {
          case 0:
            return (
              <Dialog
                sx={Dialogstyle}
                maxWidth="xs"
                fullWidth={true}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="شروع تبادل"
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                  backgroundPaper={theme.palette.background.paper}
                  rightComponent={
                    <IconButton
                      sx={{
                        opacity: 0,
                        cursor: "auto",
                      }}
                    >
                      <ArrowForwardIosSharpIcon sx={arowIcon} />
                    </IconButton>
                  }
                />

                <DialogContent
                  sx={{
                    padding: "2px 1.5em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TradeBoared />
                  <Grid container>
                    <Grid item xs={selectedCC.hasExternalId[1] ? 8 : 12}>
                      <InputTrade
                        value={data2}
                        onChange={(e) => {
                          setData2(e.target.value);
                        }}
                        error={check1 === false && data2}
                        // margin="1em auto"
                        label={
                          check1 === false && data2
                            ? "آدرس کیف پول شما معتبر نیست"
                            : "آدرس کیف پول مقصد را وارد کنید"
                        }
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                        endAdornment={
                          <QrCodeScannerIcon
                            onClick={() => {
                              handleClickOpen(0);
                            }}
                            sx={{
                              "&:hover": {
                                color: theme.palette.secondary.main,
                              },
                            }}
                          />
                        }
                        startAdornment={
                          data2 ? (
                            <></>
                          ) : (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={open === 0}
                              disableTouchListener
                              title="آدرس کیف پول دریافت کننده:

                          آدرس کیف پول دریافت‌کننده، همان آدرس کیف پولی است که مقدار رمزارز مبادله شده به این آدرس واریز می‌شود. توجه نمایید، مسئولیت واردکردن آدرس صحیح کیف پول بر عهده شماست."
                            >
                              <Button
                                onClick={() => setOpen(0)}
                                color="common"
                                sx={{ minWidth: 0 }}
                              >
                                <InfoOutlinedIcon
                                  color="secondary"
                                  sx={{ height: "auto !important" }}
                                />
                              </Button>
                            </Tooltip>
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={0.2}></Grid>

                    {selectedCC.hasExternalId[1] ? (
                      <Grid item xs={3.8}>
                        <InputTrade
                          value={exteraId}
                          onChange={(e) => {
                            setExteraId(e.target.value);
                          }}
                          label="Memo "
                          height={inputHieght}
                          borderRadius={bigbuttonBorderRadius}
                        />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid container>
                    <Grid item xs={selectedCC.hasExternalId[0] ? 8 : 12}>
                      <InputTrade
                        value={data1}
                        onChange={(e) => {
                          setData1(e.target.value);
                        }}
                        error={check2 === false && data1}
                        // margin="1em auto"
                        label={
                          check2 === false && data1
                            ? "آدرس کیف پول شما معتبر نیست"
                            : "آدرس کیف پول بازپرداخت را وارد کنید"
                        }
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                        endAdornment={
                          <QrCodeScannerIcon
                            onClick={() => {
                              handleClickOpen(1);
                            }}
                            sx={{
                              "&:hover": {
                                color: theme.palette.secondary.main,
                              },
                            }}
                          />
                        }
                        startAdornment={
                          data1 ? (
                            <></>
                          ) : (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={open === 1}
                              disableTouchListener
                              title='آدرس کیف پول بازپرداخت:

                              آدرس کیف پول بازپرداخت، همان آدرسی است که در صورت عدم انجام تبادل به هر علتی، مقدار رمزارزی که توسط کاربر برای انجام مبادله واریز شده، به این آدرس عودت داده خواهد شد؛ بنابراین اکیدا توصیه می‌شود که حتما آدرس بازپرداخت را وارد نمایید.'
                              // sx={{
                              //   " .MuiTooltip-popper": {
                              //     backgroundColor: theme.palette.secondary.main,
                              //   },
                              //   backgroundColor: theme.palette.secondary.main,
                              // }}
                              arrow
                            >
                              <Button
                                onClick={() => setOpen(1)}
                                color="common"
                                sx={{ minWidth: 0 }}
                              >
                                <InfoOutlinedIcon
                                  color="secondary"
                                  sx={{ height: "auto !important" }}
                                />
                              </Button>
                            </Tooltip>
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={0.2}></Grid>

                    {selectedCC.hasExternalId[0] ? (
                      <Grid item xs={3.8}>
                        <InputTrade
                          value={exteraId2}
                          onChange={(e) => {
                            setExteraId2(e.target.value);
                          }}
                          label="Memo "
                          height={inputHieght}
                          borderRadius={bigbuttonBorderRadius}
                        />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Buttonfee />
                </DialogContent>

                <PopUpQrScan
                  id={0}
                  borderRadius={props.borderRadius}
                  open={open2}
                  onClose={handleClose2}
                  data={data2}
                  setData={setData2}
                />
                <PopUpQrScan
                  id={1}
                  borderRadius={props.borderRadius}
                  open={open2}
                  onClose={handleClose2}
                  data={data1}
                  setData={setData1}
                />

                <DialogActions
                  onClick={() => {
                    // console.log(check1)
                    // console.log(check2)
                    if (
                      !(check1 === false) &&
                      data1 &&
                      !(check2 === false) &&
                      data2
                    ) {
                      setStep((x) => x + 1);
                    }
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    cursor: "pointer",
                    justifyContent: " center ",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      margin: 1,
                      display: "flex",
                      justifyContent: " center ",
                    }}
                    xs={12}
                  >
                    مرحله بعد
                  </Grid>
                </DialogActions>
              </Dialog>
            );
            break;
          case 1:
            return (
              <Dialog
                sx={Dialogstyle}
                maxWidth="xs"
                fullWidth={true}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="تائید"
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                  backgroundPaper={theme.palette.background.paper}
                  rightComponent={
                    <IconButton
                      sx={{ opacity: 1, cursor: "pointer" }}
                      onClick={previosStep}
                    >
                      <ArrowForwardIosSharpIcon sx={arowIcon} />
                    </IconButton>
                  }
                />
                {/* toAmount={props.toAmount} */}
                <DialogContent
                  sx={{
                    padding: "2px 1.5em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TradeBoared />
                  <Grid container>
                    <Grid item xs={selectedCC.hasExternalId[0] ? 8 : 12}>
                      <InputTrade
                        disabled
                        value={data2}
                        label="آدرس کیف پول مقصد "
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                        startAdornment={
                          data2 ? (
                            <></>
                          ) : (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={open === 2}
                              disableTouchListener
                              title="آدرس کیف پول دریافت کننده:

                          آدرس کیف پول دریافت‌کننده، همان آدرس کیف پولی است که مقدار رمزارز مبادله شده به این آدرس واریز می‌شود. توجه نمایید، مسئولیت واردکردن آدرس صحیح کیف پول بر عهده شماست."
                              // sx={{
                              //   " .MuiTooltip-popper": {
                              //     backgroundColor: theme.palette.secondary.main,
                              //   },
                              //   backgroundColor: theme.palette.secondary.main,
                              // }}
                              arrow
                            >
                              <Button
                                onClick={() => setOpen(2)}
                                color="common"
                                sx={{ minWidth: 0 }}
                              >
                                <InfoOutlinedIcon
                                  color="secondary"
                                  sx={{ height: "auto !important" }}
                                />
                              </Button>
                            </Tooltip>
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={0.2}></Grid>

                    {selectedCC.hasExternalId[0] ? (
                      <Grid item xs={3.8}>
                        <InputTrade
                          disabled
                          value={exteraId}
                          label="Memo "
                          height={inputHieght}
                          borderRadius={bigbuttonBorderRadius}
                        />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid container>
                    <Grid item xs={selectedCC.hasExternalId[1] ? 8 : 12}>
                      <InputTrade
                        disabled
                        value={data1}
                        label="آدرس کیف پول بازپرداخت "
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                        startAdornment={
                          data1 ? (
                            <></>
                          ) : (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTooltipClose}
                              open={open === 4}
                              disableTouchListener
                              title="آدرس کیف پول دریافت کننده:

                          آدرس کیف پول دریافت‌کننده، همان آدرس کیف پولی است که مقدار رمزارز مبادله شده به این آدرس واریز می‌شود. توجه نمایید، مسئولیت واردکردن آدرس صحیح کیف پول بر عهده شماست."
                              // sx={{
                              //   " .MuiTooltip-popper": {
                              //     backgroundColor: theme.palette.secondary.main,
                              //   },
                              //   backgroundColor: theme.palette.secondary.main,
                              // }}
                              arrow
                            >
                              <Button
                                onClick={() => setOpen(4)}
                                color="common"
                                sx={{ minWidth: 0 }}
                              >
                                <InfoOutlinedIcon
                                  color="secondary"
                                  sx={{ height: "auto !important" }}
                                />
                              </Button>
                            </Tooltip>
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={0.2}></Grid>

                    {selectedCC.hasExternalId[1] ? (
                      <Grid item xs={3.8}>
                        <InputTrade
                          disabled
                          value={exteraId2}
                          label="Memo "
                          height={inputHieght}
                          borderRadius={bigbuttonBorderRadius}
                        />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Buttonfee />
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    setStep((x) => x + 1);
                    getStatus();
                    post();
                    // console.log(payId);

                    // console.log(status);
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    cursor: "pointer",
                    justifyContent: " center ",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      margin: 1,
                      display: "flex",
                      justifyContent: " center ",
                    }}
                    xs={12}
                  >
                    تائید اطلاعات و شروع تبادل
                  </Grid>
                </DialogActions>
              </Dialog>
            );
            break;
          case 2:
            return (
              <Dialog
                sx={Dialogstyle}
                maxWidth="xs"
                fullWidth={true}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="تائید"
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                  backgroundPaper={theme.palette.background.paper}
                  rightComponent={
                    <IconButton sx={{ opacity: 0, cursor: "auto" }}>
                      <ArrowForwardIosSharpIcon sx={arowIcon} />
                    </IconButton>
                  }
                />
                <DialogContent
                  sx={{
                    padding: "2px 1.5em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      padding: "1em 0 0 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <QRcode
                        style={{
                          borderRadius: bigbuttonBorderRadius,
                          "&#myqr": { backgroundColor: "#000" },
                        }}
                        className="alert"
                        id="myqr"
                        value={payIn}
                        size={200}
                        includeMargin={true}
                      ></QRcode>

                      <Box
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.4)",
                          opacity: timeOut ? 1 : payIn ? 0 : 1,
                          backdropFilter: "blur(2px)",
                          borderRadius: bigbuttonBorderRadius,
                          width: "200px",
                          height: "200px",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        {timeOut ? (
                          <div style={{ textAlign: "center" }}>
                            زمان شما برای انجام معامله به پایان رسیده
                          </div>
                        ) : payIn ? (
                          <ContentCopyIcon
                            onClick={() => {
                              navigator.clipboard.writeText(payIn);
                            }}
                            sx={{
                              "&:hover": {
                                color: theme.palette.secondary.main,
                              },
                            }}
                          />
                        ) : (
                          <CircularProgress color="common" />
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.default,
                      padding: 1,
                      borderRadius: theme.shape.borderRadius[1],
                      width: "100%",
                    }}
                  >
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {flow === "fixed-rate" ? (
                            <TableRow>
                              <TableCell
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: 0.5,
                                  border: "none",
                                }}
                              >
                                زمان انجام معامله
                                <Tooltip
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  onClose={handleTooltipClose}
                                  open={open === 5}
                                  disableTouchListener
                                  title={`کاربر گرامی، برای تکمیل تبادل با نرخ شناور، مقدار رمزارز مشخص شده را به آدرسی که نمایش داده شده است واریز نموده و منتظر تایید واریز بمانید. توجه نمایید واریز هر کوینی غیر از ${selectedCC.currencies[0]} در شبکه ${selectedCC.network[0]} به آدرس ایجاد شده، منجر به از دست رفتن آن رمز ارز برای همیشه خواهد شد. ضمنا آدرس ایجاد شده فقط برای یکبار واریز رمزارز معتبر است.`}
                                  // sx={{
                                  //   " .MuiTooltip-popper": {
                                  //     backgroundColor: theme.palette.secondary.main,
                                  //   },
                                  //   backgroundColor: theme.palette.secondary.main,
                                  // }}
                                  arrow
                                >
                                  <InfoOutlinedIcon
                                    onClick={() => setOpen(5)}
                                    sx={{
                                      height: "auto !important",
                                      fontSize: "1.5em !important",
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{ padding: 0.5, border: "none" }}
                                align="right"
                              >
                                <Timer
                                  setTimeOut={setTimeOut}
                                  getStatus={getStatus}
                                  setStatusFa={setStatusFa}
                                />
                              </TableCell>
                            </TableRow>
                          ) : (
                            <></>
                          )}
                          <TableRow>
                            <TableCell
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 0.5,
                                border: "none",
                              }}
                            >
                              آدرس واریزی
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open === 6}
                                disableTouchListener
                                title={`کاربر گرامی، برای تکمیل تبادل با نرخ شناور، مقدار رمزارز مشخص شده را به آدرسی که نمایش داده شده است واریز نموده و منتظر تایید واریز بمانید. توجه نمایید واریز هر کوینی غیر از ${selectedCC.currencies[0]} در شبکه ${selectedCC.network[0]} به آدرس ایجاد شده، منجر به از دست رفتن آن رمز ارز برای همیشه خواهد شد. ضمنا آدرس ایجاد شده فقط برای یکبار واریز رمزارز معتبر است.`}
                                // sx={{
                                //   " .MuiTooltip-popper": {
                                //     backgroundColor: theme.palette.secondary.main,
                                //   },
                                //   backgroundColor: theme.palette.secondary.main,
                                // }}
                                arrow
                              >
                                <InfoOutlinedIcon
                                  onClick={() => setOpen(6)}
                                  sx={{
                                    height: "auto !important",
                                    fontSize: "1.5em !important",
                                  }}
                                />
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              {payIn && !timeOut ? (
                                <ContentCopyIcon
                                  onClick={() => {
                                    navigator.clipboard.writeText(payIn);
                                  }}
                                  sx={{
                                    fontSize: "1em !important",
                                    "&:hover": {
                                      color: theme.palette.secondary.main,
                                    },
                                  }}
                                />
                              ) : (
                                <></>
                              )}

                              {payIn && !timeOut ? (
                                payIn[0] +
                                payIn[1] +
                                payIn[2] +
                                "***" +
                                payIn[payIn.length - 3] +
                                payIn[payIn.length - 2] +
                                payIn[payIn.length - 1]
                              ) : (
                                <Skeleton
                                  variant="text"
                                  sx={{
                                    fontSize: "1rem",
                                    display: "inline-flex",
                                    justifyContent: "flex-end",
                                  }}
                                  width={80}
                                  height={20}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                          {payInExteraId && !timeOut ? (
                            <TableRow>
                              <TableCell
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: 0.5,
                                  border: "none",
                                }}
                              >
                                آدرس Memo واریزی
                                <Tooltip
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  onClose={handleTooltipClose}
                                  open={open === 7}
                                  disableTouchListener
                                  title={`کاربر گرامی، برای تکمیل تبادل با نرخ شناور، مقدار رمزارز مشخص شده را به آدرسی که نمایش داده شده است واریز نموده و منتظر تایید واریز بمانید. توجه نمایید واریز هر کوینی غیر از ${selectedCC.currencies[0]} در شبکه ${selectedCC.network[0]} به آدرس ایجاد شده، منجر به از دست رفتن آن رمز ارز برای همیشه خواهد شد. ضمنا آدرس ایجاد شده فقط برای یکبار واریز رمزارز معتبر است.`}
                                  // sx={{
                                  //   " .MuiTooltip-popper": {
                                  //     backgroundColor: theme.palette.secondary.main,
                                  //   },
                                  //   backgroundColor: theme.palette.secondary.main,
                                  // }}
                                  arrow
                                >
                                  <InfoOutlinedIcon
                                    onClick={() => setOpen(7)}
                                    sx={{
                                      height: "auto !important",
                                      fontSize: "1.5em !important",
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{ padding: 0.5, border: "none" }}
                                align="right"
                              >
                                <ContentCopyIcon
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      payInExteraId
                                    );
                                  }}
                                  sx={{
                                    fontSize: "1em !important",
                                    "&:hover": {
                                      color: theme.palette.secondary.main,
                                    },
                                  }}
                                />

                                {payInExteraId}
                              </TableCell>
                            </TableRow>
                          ) : (
                            <></>
                          )}
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              ارز ارسالی
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              {fromAmount +
                                selectedCC.currencies[0] +
                                "بر روی شبکه " +
                                selectedCC.network[0]}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              ارز دریافتی
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              {toAmount +
                                selectedCC.currencies[1] +
                                "بر روی شبکه " +
                                selectedCC.network[1]}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 0.5,
                                border: "none",
                              }}
                            >
                              کد پیگیری تبادل
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open === 8}
                                disableTouchListener
                                placement="top"
                                title="کد پیگیری:

                      کد پیگیری برای پیگیری مبادله در دکسها می باشد برای پیگیری وضعیت مبادله خود کد پیگیری را کپی و ذخیره کنید.با کد پیگیری هر زمان که بخواهید می توانید مبادله خود را در صفحه وضعیت مبادله مشاهده نمایید."
                                // sx={{
                                //   " .MuiTooltip-popper": {
                                //     backgroundColor: theme.palette.secondary.main,
                                //   },
                                //   backgroundColor: theme.palette.secondary.main,
                                // }}
                                arrow
                              >
                                <InfoOutlinedIcon
                                  onClick={() => setOpen(8)}
                                  sx={{
                                    height: "auto !important",
                                    fontSize: "1.5em !important",
                                  }}
                                />
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              {payId ? (
                                <ContentCopyIcon
                                  onClick={() => {
                                    navigator.clipboard.writeText(payId);
                                  }}
                                  sx={{
                                    fontSize: "1em !important",
                                    "&:hover": {
                                      color: theme.palette.secondary.main,
                                    },
                                  }}
                                />
                              ) : (
                                <></>
                              )}

                              {payId ? (
                                payId
                              ) : (
                                <Skeleton
                                  variant="text"
                                  sx={{
                                    fontSize: "1rem",
                                    display: "inline-flex",
                                    justifyContent: "flex-end",
                                  }}
                                  width={80}
                                  height={20}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </DialogContent>

                <DialogActions
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    display: "block",
                    padding: 0,
                  }}
                >
                  <LinearProgress
                    sx={{ width: "100%" }}
                    variant="determinate"
                    value={sliderValue}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " center ",
                      width: "100%",
                      padding: "8px",
                    }}
                  >
                    <Grid
                      item
                      sx={{
                        margin: 1,
                        display: "flex",
                        justifyContent: " center ",
                      }}
                      xs={12}
                    >
                      {statusFa}
                    </Grid>
                  </div>
                </DialogActions>
              </Dialog>
            );
            break;
          case 3:
            return (
              <Dialog
                sx={Dialogstyle}
                maxWidth="xs"
                fullWidth={true}
                onClose={handleClose}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="تائید"
                  handleClose={handleClose}
                  backgroundPaper={theme.palette.background.paper}
                  rightComponent={
                    <IconButton sx={{ opacity: 0, cursor: "auto" }}>
                      <ArrowForwardIosSharpIcon sx={arowIcon} />
                    </IconButton>
                  }
                />
                <DialogContent
                  sx={{
                    padding: "2px 1.5em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    sx={{ display: "block", mr: 1, width: 200 }}
                    alt="exchange completed"
                    src={exchangeCompleted}
                  />

                  <Grid
                    item
                    xs={12}
                    sx={{
                      padding: "1em 0 0 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    تراکنش شما با موفقیت انجام شد
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      padding: "1em 0 0 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={open === 9}
                      disableTouchListener
                      title="کد پیگیری:

                      کد پیگیری برای پیگیری مبادله در دکسها می باشد برای پیگیری وضعیت مبادله خود کد پیگیری را کپی و ذخیره کنید.با کد پیگیری هر زمان که بخواهید می توانید مبادله خود را در صفحه وضعیت مبادله مشاهده نمایید."
                      // sx={{
                      //   " .MuiTooltip-popper": {
                      //     backgroundColor: theme.palette.secondary.main,
                      //   },
                      //   backgroundColor: theme.palette.secondary.main,
                      // }}
                      arrow
                    >
                      <Button
                        onClick={() => setOpen(9)}
                        color="common"
                        sx={{ minWidth: 0 }}
                      >
                        <InfoOutlinedIcon sx={{ height: "auto !important" }} />
                      </Button>
                    </Tooltip>
                    کد پیگیری معامله {payId}
                    <Button color="common" sx={{ minWidth: 0 }}>
                      <ContentCopyIcon
                        onClick={() => navigator.clipboard.writeText(payId)}
                        sx={{
                          "&:hover": { color: theme.palette.secondary.main },
                        }}
                      />
                    </Button>
                  </Grid>
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    window.open(
                      ` https://www.oklink.com/middle/multi-search#key=${payOutHash}`
                    );
                  }}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    cursor: "pointer",
                    justifyContent: " center ",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      margin: 1,
                      display: "flex",
                      justifyContent: " center ",
                    }}
                    xs={12}
                  >
                    هش تبادل
                  </Grid>
                </DialogActions>
              </Dialog>
            );
            break;
        }
      })()}
    </>
  );
}
