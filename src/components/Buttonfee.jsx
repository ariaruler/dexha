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

export default function Buttonfee({ inputHieght, bigbuttonBorderRadius }) {
  const theme = useTheme();

  const feeButton = {
    height: inputHieght,
    maxHeight: inputHieght,
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
    },
    width: "100%",
    borderRadius: bigbuttonBorderRadius,
    border: `1px solid ${theme.palette.secondary.contrastText}`,
    color: theme.palette.primary.contrastText,
    fontsize: .001*theme.typography.fontsize,
  };

  return (
    <MuiAccordion>
      <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={feeButton}
      >
        <div>1DAI = 0.0005333497 ETH</div>
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
                  منبع تبادل
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                  100%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  کارمزد تبادل
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                  0.09%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  کمترین میزان تبادل
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                  1865.3961 DAI
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ padding: 0.5, border: "none" }}>
                  فی شبکه
                </TableCell>
                <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                  $4.94
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}
