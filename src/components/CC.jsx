import React, { useRef } from "react";

import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import styled from "@emotion/styled";
import AvatarCC from "./AvatarCC";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import InfiniteScroll from "react-infinite-scroller";
import manage from "../functions/manage";

import { Box, Button, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";


const marginOfAccordion = "1px 1.8em";


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CC(props) {
  
  // console.log("kkkkkkkkkkkk");
  
  const theme = useTheme();
  
  const accordion = {
    backgroundImage : 'none',
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }
  const { selectedCC, fetchAmount } = useContext(UserContext);




  return (

  <>
      {props.currencies[0] ? props.currencies.map((x, i) => (
        <MuiAccordion disableGutters square sx={accordion} key={i} >
          <MuiAccordionSummary
            sx={{
              height: "56px",
              alignItem: "center",
              padding : 0,
              "& .MuiAccordionSummary-expandIconWrapper": {
                transform: "none",
              },
              margin: marginOfAccordion,
              borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
            }}
            >
            <AvatarCC image={x.image[0]} />
            <Typography sx={{ textTransform: "uppercase" }}>
              {x.ticker}
            </Typography>
          </MuiAccordionSummary>
          <AccordionDetails sx={{ padding: "1em 2em !important" }}>
            {x.network.map((y, j) => (
              <Button
              
                key={j}
                onClick={() => {
                  selectedCC.putCC(props.id, x.ticker, y, x.image[j] , x.hasExternalId[j] , x.legacyTicker[j]);
                }}
                onPress={() => {
                  selectedCC.putCC(props.id, x.ticker, y, x.image[j] , x.hasExternalId[j] , x.legacyTicker[j]);
                }}
                variant="outlined"
                sx={{
                  borderRadius: "1000px !important",
                  margin: 0.5,
                  border: 0,
                  padding: 1,
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": { border: 0 },
                }}
                color="common"
                >
                <AvatarCC image={x.image[j]} />
                {y}
              </Button>
            ))}
          </AccordionDetails>
        </MuiAccordion>
      )) : <Box sx={{width : '100%' ,display : 'flex' , alignItems: 'center' , justifyContent : 'center' , height : 300 }}>
        <CircularProgress  />
        </Box>
        }
      </>

  );
}

