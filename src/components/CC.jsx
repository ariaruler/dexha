import React, { useRef } from "react";

import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import styled from "@emotion/styled";
import AvatarCC from "./AvatarCC";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import InfiniteScroll from "react-infinite-scroller";


import { Box, Button } from "@mui/material";

const marginOfAccordion = "1px 2em";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


export default function CC() {
  const theme = useTheme();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    handleFetch(10);
  }, []);

  function handleFetch(param) {
    let url = `https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true&_limit=${param}`;


    fetch(url)
      .then(res => res.json())
      .then(res => {
        setComments(res);
      })
      .catch(err => console.log(err));
  }


  console.log(comments);
  return (
    <InfiniteScroll
        pageStart={10}
        loadMore={(e) => handleFetch(e+=5)}
        hasMore={true || false}
        useWindow={false}
        loader={
          <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography > چند لحظه صبر کنید...</Typography>
        </Box>
      }
    >

      {comments.map((x, i) => (
        <Accordion key={i}>
          <MuiAccordionSummary
            sx={{
              height: "56px",
              alignItem: "center",
              
              "& .MuiAccordionSummary-expandIconWrapper": {
                transform: "none",
              },
              margin: marginOfAccordion,
              borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
            }}
            >
            <AvatarCC image={x.image} />
            <Typography sx={{ textTransform: "uppercase" }}>
              {x.ticker}
            </Typography>
          </MuiAccordionSummary>
          <AccordionDetails sx={{ padding: "1em 3em !important" }}>
            {x.network.map((x) => (
              <Button
              variant="outlined"
              sx={{ borderRadius: 1000, margin: 0.5 }}
                color="common"
              >
                {x}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </InfiniteScroll>
  );
}
