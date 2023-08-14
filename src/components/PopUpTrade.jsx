import * as React from "react";

import Dialog from "@mui/material/Dialog";

import {
  Avatar,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Slider,
  SliderThumb,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
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

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";

const marks = [
  {
    value: 10,
    label: "در حال واریز",
  },
  {
    value: 20,
    label: "تائید واریز ",
  },
  {
    value: 30,
    label: "ارسال ارز",
  },
];

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb sx={{width: 30 , height : 30}} {...other}>
      {children}
      <CircularProgress sx={{height: "auto !important", padding:.4 , }} color='common' />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function PopUpTrade(props) {
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
  const { onClose, selectedValue, open, id } = props;

  const handleClose = () => {
    onClose(selectedValue);
    setStep(0);
  };

  const previosStep = () => setStep(step - 1);

  const [qr, setQr] = useState(
    "vjhvjcgysvjcsjvcxiyvsyivcyvsjcvsjcvjucsvcvscvusuvcxuyscvcxuyvsuycxuysxuyucyuycsuycxuycsiy"
  );

  const arowIcon = {
    fontSize: 1.3 * theme.typography.fontSize,
    width: "22px",
    margin: 2,
  };

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
                open={open === id}
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
                      margin="1em auto"
                      label="آدرس کیف پول خول را وارد کنید"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<QrCodeScannerIcon />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" />}
                      label="باز پرداخت به همین کیف پول باشد"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputTrade
                      margin="1em auto"
                      label="آدرس کیف پول بازپرداخت را وارد کنید"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<QrCodeScannerIcon />}
                    />
                  </Grid>
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    setStep(step + 1);
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
                open={open === id}
              >
                <PopUpTitle
                  header="تائید"
                  previosStep={previosStep}
                  handleClose={handleClose}
                />
                <TradeBoared />

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
                open={open === id}
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
                    <QRcode
                      style={{ borderRadius: bigbuttonBorderRadius }}
                      id="myqr"
                      value={qr}
                      size={200}
                      includeMargin={true}
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
                    لطفا مقدار 20btc را واریز نمائید
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
                    <SmButton />
                    <ArrowBackIosNewIcon sx={arowIcon} />
                    <SmButton />
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
                      padding: "1em 0 0 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Slider
                      slots={{ thumb: AirbnbThumbComponent }}
                      disabled 
                      sx={{color : `${theme.palette.secondary.main} !important`}}
                      color="secondary"
                      valueLabelDisplay="off"
                      step={10}
                      marks={marks}
                      min={10}
                      max={30}
                    />
                  </Grid>
                </DialogContent>

                <DialogActions
                  onClick={() => {
                    setStep(step + 1);
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
