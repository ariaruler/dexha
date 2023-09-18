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
  LinearProgress,
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

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";

const marks = [
  {
    value: 0,
    label: "در حال دریافت ارز شبا",
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

  const [check1, setCheck1] = useState();

  const [check2, setCheck2] = useState();

  const arowIcon = {
    fontSize: 1.3 * theme.typography.fontSize,
    width: "22px",
    margin: 2,
  };

  const {
    endPoint,
    selectedCC,
    fetchAmount,
    payIn,
    setPayIn,
    payId,
    setPayId,
    fromAmount,
    step,
    setStep,
    indexOfPage,
    setIndexOfPage,
    mainData,
     setMainData
  } = useContext(UserContext);

  const [exteraId, setExteraId] = useState();

  const [exteraId2, setExteraId2] = useState();

  const [payInExteraId, setPayInExteraId] = useState();

  const [data2, setData2] = useState();

  const [data1, setData1] = useState();


  const controller = new AbortController();

  const checkData = async ( address ,currency) => {
    // console.log(currency);
    // console.log(address);
    const res = await axios
      .get(
        `${endPoint}/exchange/api/validate-address?currency=${currency}&address=${address}`,
        {
          signal: controller.signal,
        }
      )
      .catch((error) => {
        console.log(error);
      });
    // console.log(res.data);
    const res_1 = await res.data;
    // console.log(res_1);
    return res_1;
  };
  useEffect(() => {
    if (data1 || data2) {
      checkData(data1, selectedCC.legacyTicker[0]).then((res) =>
        setCheck2(res?.result)
      );
      checkData(data2, selectedCC.legacyTicker[1]).then((res) =>
        setCheck1(res?.result)
      );
    }

    return () => {
      controller.abort();
    };
  }, [data1, data2]);

  const post = async () => {
    const userToPost = {
      fromCurrency: selectedCC.currencies[0],
      toCurrency: selectedCC.currencies[1],
      fromNetwork: selectedCC.network[0],
      toNetwork: selectedCC.network[1],
      fromAmount: fromAmount,
      address: data2,
      flow: "standard",
      payoutExtraId: exteraId,
      refundExtraId: exteraId2,
    };
    // console.log(userToPost);

    const res = await axios
      .post(`${endPoint}/exchange/api/create`, userToPost)
      .catch((error) => console.log("Error: ", error));
    console.log(res.data)
    // console.log(res.data.id)
    setPayInExteraId(res.data.payinExtraId);
    setPayId(x =>[...x ,   res.data.id]);
    setPayIn(x => [...x ,  res.data.payinAddress]);
    setMainData(x => [ ...x ,{ currencies : selectedCC.currencies ,id : res.data.id , payIn : res.data.payinAddress}])
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
          })
          .then((res) => {
            if (res?.data.status) {
              console.log(res);
              setStatus(y => {return{...y , [x] : res?.data.status}});
              setPayOutHash(res?.data.payoutHash)
            }
          });
      }
    }, 2000);

    // console.log(getStatusInterval.current);
  };

  useEffect(() => {
    // console.log(payId);
    if (payId) {
      getStatus(payId[payId.length - 1]);
    }
  }, [payId]);

  useEffect(() => {
    return () => {
      getStatus();
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
        setStatusFa("مشکل در تبادل");
        break;
    }
  }, [status[payId]]);

  axiosRetry(axios, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: 100000,
  });

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));


// useEffect(() => {
  console.log(payId);
// }, [payId]);

// useEffect(() => {
  // console.log(payIn);
  console.log(mainData);
  console.log(status);
// }, [payIn]);



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
                onClose={handleClose}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="شروع تبادل"
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                  pointerDisable={true}
                  displayNone={true}
                />

                <TradeBoared />

                <DialogContent sx={{ padding: "2px 2em" }}>
                  <Grid item xs={12}>
                    <InputTrade
                      value={data2}
                      onChange={(e) => {
                        setData2(e.target.value);
                      }}
                      error={!check1}
                      margin="1em auto"
                      label="آدرس کیف پول خود را وارد کنید"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={
                        <QrCodeScannerIcon
                          onClick={() => {
                            handleClickOpen(0);
                          }}
                          sx={{
                            "&:hover": { color: theme.palette.secondary.main },
                          }}
                        />
                      }
                      startAdornment={
                        data2 ? (
                          <></>
                        ) : (
                          <BootstrapTooltip
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
                            <Button color="common" sx={{ minWidth: 0 }}>
                              <InfoOutlinedIcon
                                color="secondary"
                                sx={{ height: "auto !important" }}
                              />
                            </Button>
                          </BootstrapTooltip>
                        )
                      }
                    />
                  </Grid>

                  {selectedCC.hasExternalId[0] ? (
                    <Grid item xs={12}>
                      <InputTrade
                        value={exteraId}
                        onChange={(e) => {
                          setExteraId(e.target.value);
                        }}
                        margin="1em auto"
                        label="Memo خود را وارد کنید "
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}

                  <Grid item xs={12}>
                    <InputTrade
                      value={data1}
                      onChange={(e) => {
                        setData1(e.target.value);
                      }}
                      error={!check2}
                      margin="1em auto"
                      label="آدرس کیف پول بازپرداخت را وارد کنید"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={
                        <QrCodeScannerIcon
                          onClick={() => {
                            handleClickOpen(1);
                          }}
                          sx={{
                            "&:hover": { color: theme.palette.secondary.main },
                          }}
                        />
                      }
                      startAdornment={
                        data1 ? (
                          <></>
                        ) : (
                          <BootstrapTooltip
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
                            <Button color="common" sx={{ minWidth: 0 }}>
                              <InfoOutlinedIcon
                                color="secondary"
                                sx={{ height: "auto !important" }}
                              />
                            </Button>
                          </BootstrapTooltip>
                        )
                      }
                    />
                  </Grid>

                  {selectedCC.hasExternalId[1] ? (
                    <Grid item xs={12}>
                      <InputTrade
                        value={exteraId2}
                        onChange={(e) => {
                          setExteraId2(e.target.value);
                        }}
                        margin="1em auto"
                        label="Memo بازپرداخت خود را وارد کنید "
                        height={inputHieght}
                        borderRadius={bigbuttonBorderRadius}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
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
                    if (check1 && 1) {
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
                onClose={handleClose}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="تائید"
                  previosStep={previosStep}
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                />
                <TradeBoared />
                {/* toAmount={props.toAmount} */}
                <DialogContent sx={{ padding: "2px 2em" }}>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              منبع تبادل
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              100%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              کارمزد تبادل
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              0.09%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              کمترین میزان تبادل
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              1865.3961 DAI
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ padding: 0.5, border: "none" }}>
                              فی شبکه
                            </TableCell>
                            <TableCell
                              sx={{ padding: 0.5, border: "none" }}
                              align="right"
                            >
                              $4.94
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    setStep((x) => x + 1);
                    getStatus()
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
                    مرحله بعد
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
                onClose={handleClose}
                open={props.open === props.id}
              >
                <PopUpTitle
                  header="تائید"
                  pointerDisable={true}
                  handleClose={() => {
                    handleClickOpen(2);
                  }}
                  displayNone={true}
                />
                <DialogContent sx={{ padding: "2px 2em" }}>
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
                        display: "flex",
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
                        value={payIn[payIn.length - 1] }
                        size={200}
                        includeMargin={true}
                      ></QRcode>
                      {payIn[payIn.length - 1] ? (
                        <></>
                      ) : (
                        <Box
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.2)",
                            position: "absolute",
                            backdropFilter: "blur(2px)",
                            borderRadius: bigbuttonBorderRadius,
                            margin: "-1px 0 0 0",
                            width: "200px",
                            height: "196px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress color="common" />
                        </Box>
                      )}
                    </Box>
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
                    {payIn[payIn.length - 1] }
                  </Grid>

                  {payInExteraId ? (
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
                      {payInExteraId + "آدرس Memo"}
                    </Grid>
                  ) : (
                    <></>
                  )}

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
                    <BootstrapTooltip
                      title={`کاربر گرامی، برای تکمیل تبادل با نرخ شناور، مقدار رمزارز مشخص شده را به آدرسی که نمایش داده شده است واریز نموده و منتظر تایید واریز بمانید. توجه نمایید واریز هر کوینی غیر از ${selectedCC.currencies[0]} در شبکه ${selectedCC.network[0]} به آدرس ایجاد شده، منجر به از دست رفتن آن رمز ارز برای همیشه خواهد شد. ضمنا آدرس ایجاد شده فقط برای یکبار واریز رمزارز معتبر است.`}
                      // sx={{
                      //   " .MuiTooltip-popper": {
                      //     backgroundColor: theme.palette.secondary.main,
                      //   },
                      //   backgroundColor: theme.palette.secondary.main,
                      // }}
                      arrow
                    >
                      <Button color="common" sx={{ minWidth: 0 }}>
                        <InfoOutlinedIcon sx={{ height: "auto !important" }} />
                      </Button>
                    </BootstrapTooltip>
                    لطفا مقدار {selectedCC.currencies[0] + " " + fromAmount} را
                    واریز نمائید
                    <Button color="common" sx={{ minWidth: 0 }}>
                      <ContentCopyIcon
                        onClick={() =>{ navigator.clipboard.writeText(payId[payId.length - 1]) }}
                        sx={{
                          "&:hover": { color: theme.palette.secondary.main },
                        }}
                      />
                    </Button>
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
                    <SmButton id={0} />
                    <ArrowBackIosNewIcon sx={arowIcon} />
                    <SmButton id={1} />
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
                    <BootstrapTooltip
                      title="کد پیگیری:

                      کد پیگیری برای پیگیری مبادله در تهران اکسچنج می باشد برای پیگیری وضعیت مبادله خود کد پیگیری را کپی و ذخیره کنید.با کد پیگیری هر زمان که بخواهید می توانید مبادله خود را در صفحه وضعیت مبادله مشاهده نمایید."
                      // sx={{
                      //   " .MuiTooltip-popper": {
                      //     backgroundColor: theme.palette.secondary.main,
                      //   },
                      //   backgroundColor: theme.palette.secondary.main,
                      // }}
                      arrow
                    >
                      <Button color="common" sx={{ minWidth: 0 }}>
                        <InfoOutlinedIcon sx={{ height: "auto !important" }} />
                      </Button>
                    </BootstrapTooltip>
                    کد پیگیری معامله {payId[payId.length - 1] }
                    <Button color="common" sx={{ minWidth: 0 }}>
                      <ContentCopyIcon
                        onClick={() => { navigator.clipboard.writeText(payId[payId.length - 1]) }}
                        sx={{
                          "&:hover": { color: theme.palette.secondary.main },
                        }}
                      />
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      // padding: "1em 0 0 0",
                      padding: 3,
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <LinearProgress variant="determinate" value={sliderValue} />
                  </Grid>
                </DialogContent>

                <DialogActions
                  sx={{
                    backgroundColor: theme.palette.background.paper,
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
                    {statusFa}
                  </Grid>
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
                  pointerDisable={true}
                  handleClose={handleClose}
                  displayNone={true}
                />
                <DialogContent sx={{ padding: "2px 2em" }}>
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
                    <CheckCircleOutlineIcon
                      color="success"
                      sx={{ fontSize: "15em" }}
                    />
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
                    <BootstrapTooltip
                      title="کد پیگیری:

                      کد پیگیری برای پیگیری مبادله در تهران اکسچنج می باشد برای پیگیری وضعیت مبادله خود کد پیگیری را کپی و ذخیره کنید.با کد پیگیری هر زمان که بخواهید می توانید مبادله خود را در صفحه وضعیت مبادله مشاهده نمایید."
                      // sx={{
                      //   " .MuiTooltip-popper": {
                      //     backgroundColor: theme.palette.secondary.main,
                      //   },
                      //   backgroundColor: theme.palette.secondary.main,
                      // }}
                      arrow
                    >
                      <Button color="common" sx={{ minWidth: 0 }}>
                        <InfoOutlinedIcon sx={{ height: "auto !important" }} />
                      </Button>
                    </BootstrapTooltip>
                    کد پیگیری معامله {payId[payId.length - 1]}
                    <Button color="common" sx={{ minWidth: 0 }}>
                      <ContentCopyIcon
                        onClick={() => navigator.clipboard.writeText(payId[payId.length - 1])}
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
