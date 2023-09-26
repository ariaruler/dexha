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
import { UserContext } from "../App";
import { Box, Skeleton, Typography } from "@mui/material";

export default function Buttonfee() {
  const { selectedCC, speed, depositFee, withdrawalFee, ratio } =
    useContext(UserContext);

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 1,
        borderRadius: theme.shape.borderRadius[1],
        width : '100%',
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ padding: 0.5, border: "none" }}>
                کارمزد واریز
              </TableCell>
              <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                {depositFee ? (
                  depositFee
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
            <TableRow>
              <TableCell sx={{ padding: 0.5, border: "none" }}>
                کارمزد برداشت
              </TableCell>
              <TableCell sx={{ padding: 0.5, border: "none" }} align="right">
                {withdrawalFee ? (
                  withdrawalFee
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
    </Box>
  );
}
