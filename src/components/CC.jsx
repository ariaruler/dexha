import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroller";

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

import qs from "qs";

const marginOfAccordion = "1px 2em";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

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
  const [currencies, setCurrencies] = useState([]);
  const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         "https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true$_start=&_limit=10"
//       )
//       .then((res) => {
//         console.log(res);
//         setCurrencies(res.data);
//       });
//   }, []);

  const theme = useTheme();

//   const [items, setItems] = useState(Array.from({ length: 20 }));

//   console.log(items);

//   const fetchMoreData = () => {
//     // a fake async api call like which sends
//     // 20 more records in .5 secs
//     setTimeout(() => {
//         axios
//         .get(
//           "https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true$_start=&_limit=10"
//         )
//         .then((res) => {
//           console.log(res);
//           setCurrencies(res.data);
//         });
//     }, 500);
//   };

useEffect(() => {
    handleFetch({ _limit: 0 });
  }, []);
 



  function handleFetch(params) {
    const strParams = qs.stringify(params);
    let url = "https://bamanchange.com/exchange/api/currencies?active=&flow=fixed-rate&buy=&sell=";

    if (strParams) {
      url = url + "/?" + strParams;
    }

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setComments(res);
      })
      .catch(err => console.log(err));
  }
  return (
    //   <div>
    //     <h1>demo: react-infinite-scroll-component</h1>
    //     <hr />
    //     <InfiniteScroll
    //       dataLength={items.length}
    //       next={fetchMoreData}
    //       hasMore={true}
    //       loader={<h4>Loading...</h4>}
    //       height={400}
    //       endMessage={
    //         <p style={{ textAlign: "center" }}>
    //           <b>Yay! You have seen it all</b>
    //         </p>
    //       }
    //     >
    //       {items.map((i, index) => (
    //         <div style={style} key={index}>
    //           div - #{index}
    //         </div>
    //       ))}
    //     </InfiniteScroll>
    //   </div>

    <InfiniteScroll
        pageStart={0}
        loadMore={() => handleFetch({ _limit: comments.length + 0 })}
        hasMore={true || false}
        useWindow={false}
        loader={
          <div key="loading" className="loader">
            Loading ...
          </div>
      }
    >
      {comments.map((x) => (
        <Accordion>
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
            {/* <AvatarCC image={x.image} /> */}
            <Typography sx={{ textTransform: "uppercase" }}>
              {x.name}
            </Typography>
          </MuiAccordionSummary>
          <AccordionDetails>
            <ToggleButtons first="0.1%" second="0.1%" third="0.1%" />
          </AccordionDetails>
        </Accordion>

/* 
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
  </tr>
</thead>
<tbody className="table-body">
  {comments.map(x => (
    <tr key={x.id}>
      <td>{x.id}</td>
      <td>{x.name}</td>
      <td>{x.email}</td>
    </tr>
  ))}
</tbody>
</table> */


      ))}
    </InfiniteScroll>
  );
}
