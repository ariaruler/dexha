import * as React from "react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Container, Divider, Grid } from "@mui/material";
import InputTrade from "../components/InputTrade";
import SearchIcon from "@mui/icons-material/Search";

import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext } from "react";
import { UserContext } from "../App";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function TransactionTracking() {
  const [status, setStatus] = useState({});

  const [statusFa, setStatusFa] = useState("در حال ساخت تراکنش");

  const getStatus = (x) => {
    if (x) {
      axios
      .get(`${endPoint}/exchange/api/by-id?id=${x}`)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log("ppppppppppppppppp");

            console.log(res?.data);
            setStatus(res?.data);

        });
    }

    // console.log(getStatusInterval.current);
  };

  
  useEffect(() => {
    switch (status?.status) {
      case "waiting":
        setStatusFa("در انتظار واریز");
        break;
      case "confirming":
        setStatusFa("تائید واریز");
        break;
      case "exchanging":
        setStatusFa("در حال تبادل");
        break;
      case "sending":
        setStatusFa("در حال ارسال ارز");
        break;
      case "finished":
        setStatusFa("پایان تبادل");
        break;
      case "failed":
        setStatusFa("مشکل در تبادل");
        break;
    }
  }, [status?.status]);


  const theme = useTheme();

  const { setStep, handleClickOpen, endPoint } = useContext(UserContext);

  console.log(status);

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: 0 }}
    >
      <Container maxWidth="xs">
        <Grid item sx={{ margin: "1px 0 " }} xs={12}>
          <InputTrade
            onChange={(e) => getStatus(e.target.value)}
            label="جستجو"
            inputHieght={52}
            borderRadius={theme.shape.borderRadius[1]}
            endAdornment={<SearchIcon sx={{ marginLeft: 20 }} />}
          />
        </Grid>
      </Container>
      <Container maxWidth="md">
        <TableContainer
          component={Paper}
          sx={{ margin: "2em 0", backgroundColor: "transparent" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  border: "none",
                  //  `1px solid ${theme.palette.secondary.contrastText}`
                }}
              >
                <TableCell>تبادل</TableCell>
                <TableCell>کد پیگیری</TableCell>
                <TableCell>زمان انجام مبادله</TableCell>
                <TableCell>وضعیت</TableCell>
                {/* <TableCell sx={{ border: 0 , display : 'flex' ,justifyContent : 'center'}}>پیگیری تبادل</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {status.status ? (
                <TableRow
                  key={status?.id}
                  sx={{
                    border: "none",
                    //  `1px solid ${theme.palette.secondary.contrastText}`
                  }}
                >
                  <TableCell sx={{ border: 0 }}>{status?.fromCurrency} <ArrowForwardIcon sx={{ fontSize: 10 }}  /> {status?.toCurrency}</TableCell>
                  <TableCell sx={{ border: 0 }}>{status?.id}</TableCell>
                  <TableCell sx={{ border: 0 }}>{status?.createdAt}</TableCell>
                  <TableCell sx={{ border: 0 }}>{statusFa}</TableCell>
                  {/* <TableCell sx={{ border: 0 , display : 'flex' ,justifyContent : 'center' ,}}><VisibilityIcon sx={{'&:hover' : {color : theme.palette.primary.main}}} /></TableCell> */}
                </TableRow>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </motion.div>
  );
}
