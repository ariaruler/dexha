import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, DialogContent, Grid, Skeleton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export default function TradeBoared(props) {
  const { selectedCC, toAmount, fromAmount } = useContext(UserContext);

  return (

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width : 'auto',
          margin :0,
        }}
        container
        spacing={2}
      >
        <Grid sx={{ display: "flex", justifyContent: "center" , padding : '0px !important' , }} item xs={5}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            container
          >
            <Grid
              sx={{ display: "flex", marginBottom: 1, }}
              item
              xs={12}
            >
              <Typography sx={{fontSize : '.8em'}} component="h2">ارسال می کنید</Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", }}
              item
              xs={12}
            >

              <Avatar
                src={selectedCC.currencyImg[0]}
                sx={{ width: 26, height: 26 ,margin: 'auto 6px'}}
              />
              <Typography sx={{fontSize : '1.3em'}} variant="h6">{fromAmount}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
             padding : '0px !important',
             height : '100%'
          }}
          item
          xs={2}
        >
          <KeyboardBackspaceIcon sx={{ width: 25, height: 25 }} />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding : '0px !important',
          }}
          item
          xs={5}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

            }}
            container
          >
            <Grid
              sx={{ display: "flex", justifyContent : 'flex-end' ,  marginBottom: 1, }}
              item
              xs={12}
            >
              <Typography  sx={{fontSize : '.8em'}} component="h2">دریافت می کنید</Typography>
            </Grid>
            <Grid
              sx={{ display: "flex",justifyContent : 'flex-end' ,   }}
              item
              xs={12}
            >
              <Typography sx={{fontSize : '1.3em'}} variant="h6">
                {toAmount ? (
                  toAmount
                ) : (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={80}
                    height={30}
                  />
                )}
              </Typography>

              <Avatar
                src={selectedCC.currencyImg[1]}
                sx={{ width: 26, height: 26 , margin:'auto 6px'}}
              />

            </Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}
