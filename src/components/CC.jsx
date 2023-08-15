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

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";


import { useQuery } from "@tanstack/react-query";
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


// function useIntersectionObserver({
//   root,
//   target,
//   onIntersect,
//   threshold = 1.0,
//   rootMargin = '0px',
//   enabled = true,
// }) {
//   React.useEffect(() => {
//     if (!enabled) {
//       return
//     }

//     const observer = new IntersectionObserver(
//       entries =>
//         entries.forEach(entry => entry.isIntersecting && onIntersect()),
//       {
//         root: root && root.current,
//         rootMargin,
//         threshold,
//       }
//     )

//     const el = target && target.current

//     if (!el) {
//       return
//     }

//     observer.observe(el)

//     return () => {
//       observer.unobserve(el)
//     }
//   }, [target.current, enabled])
// }


export default function CC() {
  const theme = useTheme();

  const [comments, setComments] = useState([]);

  // const limit = 10;
  // const handleFetch = () => {
  //   return axios.get(
  //     `https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true&_limit=${limit}`
  //   );
  // };

  // const handleFetch = async ({ pageParam = 10 }) => {
  //   const response = await fetch(
  //     `https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true&_limit=${pageParam}`
  //   );
  //   const results = await response.json();
  //   return { results, nextPage: pageParam + 1, totalPages: 1000 };
  // };

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

  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery(
  //   ["posts"], 
  //   handleFetch,
  //   true,
  //    {getNextPageParam(lastPage) {
  //     if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
  //     return undefined;
  //   },
  // }
  // );


    // const {
    //   status,
    //   data,
    //   error,
    //   isFetching,
    //   isFetchingMore,
    //   fetchMore,
    //   canFetchMore,
    //   isError,
    //   isLoading,
    // } = useInfiniteQuery(
    //   ['projects'],
    //   async (key, nextId = 10) => {
    //     const { data } = await axios.get('https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true&_limit=' + nextId)
    //     return data
    //   },
    //   {
    //     getFetchMore: lastGroup => {
    //       console.log(lastGroup);
    //       return lastGroup.nextId
    //     },
    //   }
    // )
  

  // const { data, isLoading, isError } = useQuery(
  //   ["cur"],
  //   handleFetch,
  //   true
  // );
  // const loadMoreButtonRef = React.useRef()

  // useIntersectionObserver({
  //   target: loadMoreButtonRef,
  //   onIntersect: fetchMore,
  //   enabled: canFetchMore,
  // })
  
  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         height: 300,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Typography variant="h5"> چند لحظه صبر کنید...</Typography>
  //     </Box>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <Box
  //       sx={{
  //         height: 300,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Typography variant="h5"> خطا در گرفتن اطلاعات</Typography>
  //     </Box>
  //   );
  // }




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
    <>
    {/* <InfiniteScroller hasMore={hasNextPage} loadMore={fetchNextPage}> */}
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
          <AccordionDetails sx={{ padding: "15px 30px !important" }}>
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
      {/* </InfiniteScroller> */}
      {/* {isFetchingNextPage && <h1>Fetching next page</h1>} */}
      {/* <button
              ref={loadMoreButtonRef}
              onClick={() => fetchMore()}
              disabled={!canFetchMore || isFetchingMore}
            >
              {isFetchingMore
                ? 'Loading more...'
                : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
            </button> */}
      </>
    </InfiniteScroll>
  );
}
