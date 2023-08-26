import React, { useRef } from "react";

import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import styled from "@emotion/styled";
import AvatarCC from "./AvatarCC";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./TradeCard";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import InfiniteScroll from "react-infinite-scroller";
import fetch from "./fetch";

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

export default function CC(props) {
  const theme = useTheme();

  const [comments, setComments] = useState([]);

  const { selectedCC } = useContext(UserContext);

  const [currencies, setCurrencies] = useState("");
  const [network, setNetwork] = useState("");

  function handleFetch(params) {


      fetch().then((res) => {
        setComments(res.slice(0 , params));
      });
    

  }



  // useEffect(() => {
  //   console.log(currencies);
  //   console.log(network);
  // }, []);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => handleFetch(comments.length + 10)}
      hasMore={true}
      useWindow={false}
      loader={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography> چند لحظه صبر کنید...</Typography>
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
            <AvatarCC image={x.image[0]} />
            <Typography sx={{ textTransform: "uppercase" }}>
              {x.ticker}
            </Typography>
          </MuiAccordionSummary>
          <AccordionDetails sx={{ padding: "1em 3em !important" }}>
            {x.network.map((y, j) => (
              <Button
                key={j}
                onClick={() => {
                  selectedCC.putCC(props.id, x.ticker, y, x.image[0]);
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
        </Accordion>
      ))}
    </InfiniteScroll>
  );
}

// console.log(props, "UU");
// ; selectedCC.putCC( props.id, currencies ,network )
// setCurrencies(x.ticker) ; setNetwork(y);
