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
import ToggleButtons from "./TogglrButtons";

import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";

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

  const url = `https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true`;

  const { data, isLoading, isError } = useQuery(
    ["cur"],
    () => {
      return axios.get(url);
    },
    true
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> چند لحظه صبر کنید...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> خطا در گرفتن اطلاعات</Typography>
      </Box>
    );
  }

  console.log(data);
  return (
    // <InfiniteScroll
    //     pageStart={0}
    //     loadMore={(e) => handleFetch(e++)}
    //     hasMore={true || false}
    //     useWindow={false}
    //     loader={
    //       <div key="loading" className="loader">
    //         Loading ...
    //       </div>
    //   }
    // >
    <>
      {data?.data.map((x, i) => (
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
              {x.name}
            </Typography>
          </MuiAccordionSummary>
          <AccordionDetails>
            <ToggleButtons first="0.1%" second="0.1%" third="0.1%" />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
    // </InfiniteScroll>
  );
}
