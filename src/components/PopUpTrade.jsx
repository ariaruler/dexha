import * as React from "react";

import Dialog from "@mui/material/Dialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
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

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";

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

  const previosStep = () => (setStep(step - 1) );

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
                  header='شروع تبادل'
                  handleClose={handleClose}
                  displayNone={true}
                />

                <DialogContent sx={{ padding: "2px 2em" }}>
                  <Grid item xs={12}>
                    <InputTrade
                      disabled={true}
                      margin="1em auto"
                      label="پرداخت"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<SmButton width="40%" />}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <KeyboardArrowDownIcon />
                  </Grid>

                  <Grid item xs={12}>
                    <InputTrade
                      disabled={true}
                      margin="1em auto"
                      label="دریافت"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<SmButton width="40%" />}
                    />
                  </Grid>
                </DialogContent>
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
                      control={<Checkbox />}
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
            )
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
                  header='تائید'
                  previosStep={previosStep}
                  handleClose={handleClose}
                />

                <DialogContent sx={{ padding: "2px 2em" }}>
                  <Grid item xs={12}>
                    <InputTrade
                      disabled={true}
                      margin="1em auto"
                      label="پرداخت"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<SmButton width="40%" />}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <KeyboardArrowDownIcon />
                  </Grid>

                  <Grid item xs={12}>
                    <InputTrade
                      disabled={true}
                      margin="1em auto"
                      label="دریافت"
                      height={inputHieght}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<SmButton width="40%" />}
                    />
                  </Grid>
                </DialogContent>
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
        }
      })()}
    </>
  );
}
