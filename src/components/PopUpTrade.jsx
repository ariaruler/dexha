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
import { UserContext } from "./TradeCard";
import axios from "axios";

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
  // console.log("kkkkkkkkkkkk");
  const [open2, setOpen2] = useState(-1);

  const handleClickOpen = (id) => {
    setOpen2(id);
  };

  // console.log(open2)

  const handleClose2 = (value) => {
    setOpen2(-1);
  };

  const [step, setStep] = useState(0);
  const theme = useTheme();
  const Dialogstyle = {
    "& .MuiPaper-root": {
      maxWidth: 400,
      height: 556,

      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
  };

  const [status, setStatus] = useState();

  const handleClose = () => {
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
    selectedCC,

    payIn,
    setPayIn,
    payId,
    setPayId,
    fromAmount,
  } = useContext(UserContext);

  const [exteraId, setExteraId] = useState();

  const [exteraId2, setExteraId2] = useState();

  const [payInExteraId, setPayInExteraId] = useState();

  const [data2, setData2] = useState();

  const [data1, setData1] = useState();

  // console.log(data1);

  const checkData = async (data, amount) => {
    console.log(data);
    console.log(amount);
    const res = await fetch(
      `https://bamanchange.com/exchange/api/validate-address?currency=${amount}&address=${data}`
    );
    const res_1 = await res.json();
    console.log(res_1);
    return res_1;
  };
  useEffect(() => {
    if (data1 || data2) {
      checkData(data1, selectedCC.network[0]).then((res) =>
        setCheck2(res?.result)
      );
      checkData(data2, selectedCC.network[1]).then((res) =>
        setCheck1(res?.result)
      );
    }
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
    console.log(userToPost);

    const res = await axios
      .post("https://bamanchange.com/exchange/api/create", userToPost)
      .catch((error) => console.log("Error: ", error));
    // console.log(res.data)
    // console.log(res.data.id)
    setPayIn(res.data.payinAddress);
    setPayInExteraId(res.data.payinExtraId);
    setPayId(res.data.id);
  };

  const getStatus = (x) => {
    setInterval(() => {
      axios
        .get(`https://bamanchange.com/exchange/api/by-id?id=${x}`)
        .then((res) => {
          if (res?.data.status) {
            // console.log(res?.data.status);
            setStatus(res);
          }
        });
    }, 5000);
  };

  useEffect(() => {
    getStatus(payId);
  }, [payId]);

  console.log(payIn);

  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    switch (status?.data.status) {
      case "waiting":
        setSliderValue(20);
        break;
      case "confirming":
        setSliderValue(40);
        break;
      case "exchanging":
        setSliderValue(60);
        break;
      case "sending":
        setSliderValue(80);
        break;
      case "finished":
        setSliderValue(100);
        break;
    }
  }, [status?.data.status]);

  // console.log(selectedCC.hasExternalId[0]);
  // console.log(selectedCC.hasExternalId[1]);

  return (
    <>
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
                  handleClose={handleClose}
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
                        label="Memo خود را وارد کنید"
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
                      setStep(step + 1);
                      post();
                    }
                  }}
                  sx={{ backgroundColor: theme.palette.primary.main }}
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
                  handleClose={handleClose}
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
                    setStep(step + 1);

                    // console.log(payId);
                    getStatus(payId);
                    // console.log(status);
                  }}
                  sx={{ backgroundColor: theme.palette.primary.main }}
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
                  previosStep={previosStep}
                  handleClose={handleClose}
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
                    <Box>
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
                      >
                        <div style={box}></div>
                        <div style={stack}></div>
                      </QRcode>
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
                    {payIn}
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
                    لطفا مقدار {selectedCC.currencies[0] + " " + fromAmount} را
                    واریز نمائید
                    <ContentCopyIcon
                      sx={{
                        "&:hover": { color: theme.palette.secondary.main },
                      }}
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
                    کد پیگیری معمله 146946466
                    <ContentCopyIcon
                      sx={{
                        "&:hover": { color: theme.palette.secondary.main },
                      }}
                    />
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
                    {status?.data.status}
                  </Grid>
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    // setStep(step + 1);
                  }}
                  sx={{ backgroundColor: theme.palette.primary.main }}
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
        }
      })()}
    </>
  );
}
