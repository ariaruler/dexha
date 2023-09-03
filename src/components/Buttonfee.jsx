import * as React from "react";
import { useTheme } from "@emotion/react";

import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { useContext, useEffect } from "react";
import { UserContext } from "./TradeCard";
import { Typography } from "@mui/material";

export default function Buttonfee({ inputHieght, bigbuttonBorderRadius }) {

  const {
    selectedCC,
    speed,
    depositFee,
    withdrawalFee,
    ratio,
  } = useContext(UserContext);

  const theme = useTheme();

  const feeButton = {
    height: inputHieght,
    maxHeight: inputHieght,
    minHeight : "0 !important" ,
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .muirtl-o4b71y-MuiAccordionSummary-content.Mui-expanded": {
      margin : 0,
      transition : 'none'
    },
    width: "100%",
    borderRadius: bigbuttonBorderRadius,
    border: `none`,
    color: theme.palette.primary.contrastText,
    fontsize: .0000001*theme.typography.fontsize,

  };

  const feeButtonMother ={
    backgroundColor: 'transparent',
    backgroundImage : 'none',
    transition : 'none',
    boxShadow : 'none',
  }

  return (
    <MuiAccordion expanded sx={feeButtonMother}>
      <MuiAccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        sx={feeButton}
      >
         <Typography sx={{ textTransform: "uppercase" }}> {'1' +  selectedCC.currencies[0]  + '='  + ratio +  selectedCC.currencies[1]}</Typography>
        <div>0.17%</div>
      </MuiAccordionSummary>
      <MuiAccordionDetails
        sx={{ backgroundColor: theme.palette.background.default ,padding: 1}}
      >
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  سرعت انتقال
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                 {speed}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  کارمزد واریز
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                {depositFee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  کارمزد برداشت
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                {withdrawalFee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  کارمزد صرافی
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                  0.5%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}
