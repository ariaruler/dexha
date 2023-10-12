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

import useMediaQuery from "@mui/material/useMediaQuery";

const marginOfAccordion = "1px 1.8em";

const accordionDetails = {
  padding: "1em 2em !important",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
};

export default function CC(props) {
  // console.log("kkkkkkkkkkkk");

  const theme = useTheme();

  const accordion = {
    backgroundImage: "none",
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  };
  const { selectedCC, fetchAmount } = useContext(UserContext);

  const [expand, setExpand] = useState(-1);

  const desktop = useMediaQuery("(min-width:900px)");

  return (
    <>
      {desktop ? (
        props.currencies[0] ? (
          props.currencies.map((x, i) => (
            <>
              <MuiAccordion
                sx={accordion}
                expanded={i === expand}
                disableGutters
                square
                key={i}
              >
                <MuiAccordionSummary
                  sx={{
                    height: "56px",
                    alignItem: "center",
                    padding: 0,
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transform: "none",
                    },
                    margin: marginOfAccordion,
                    borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  }}
                  onClick={() => {
                    if (expand === i) {
                      setExpand(-1);
                    } else {
                      setExpand(i);
                    }
                  }}
                >
                  <AvatarCC image={x.image[0]} />
                  <Typography sx={{ textTransform: "uppercase" }}>
                    {x.ticker}
                  </Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails sx={accordionDetails}>
                  {x.network.map((y, j) => (
                    <div
                      onClick={() => {
                        selectedCC.putCC(
                          props.id,
                          x.ticker,
                          y,
                          x.image[j],
                          x.hasExternalId[j],
                          x.legacyTicker[j]
                        );
                      }}
                      style={{ display: " inline" }}
                    >
                      <Button
                        key={j}
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
                    </div>
                  ))}
                </MuiAccordionDetails>
              </MuiAccordion>{" "}
            </>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
            }}
          >
            <CircularProgress />
          </Box>
        )
      ) : props.currencies[0] ? (
        props.currencies.map((x, i) => (
          <>
            <MuiAccordion
              sx={accordion}
              expanded={i === expand}
              disableGutters
              square
              key={i}
            >
              <MuiAccordionSummary
                sx={{
                  height: "56px",
                  alignItem: "center",
                  padding: 0,
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "none",
                  },
                  margin: marginOfAccordion,
                  borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                }}
                onTouchStart={() => {
                  if (expand === i) {
                    setExpand(-1);
                  } else {
                    setExpand(i);
                  }
                }}
              >
                <AvatarCC image={x.image[0]} />
                <Typography sx={{ textTransform: "uppercase" }}>
                  {x.ticker}
                </Typography>
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={accordionDetails}>
                {x.network.map((y, j) => (
                  <div
                    onTouchStart={() => {
                      selectedCC.putCC(
                        props.id,
                        x.ticker,
                        y,
                        x.image[j],
                        x.hasExternalId[j],
                        x.legacyTicker[j]
                      );
                    }}
                    style={{ display: " inline" }}
                  >
                    <Button
                      key={j}
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
                  </div>
                ))}
              </MuiAccordionDetails>
            </MuiAccordion>
          </>
        ))
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
