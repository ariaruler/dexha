import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, DialogContent, Grid } from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import {  useContext ,useEffect } from "react";
import { UserContext } from './TradeCard'


export default function TradeBoared(props) {

  const { selectedCC , toAmount ,fromAmount}  = useContext(UserContext);



  return (
    <DialogContent
      sx={{
        padding: "2px 2em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        container
        spacing={2}
      >
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={4}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            container
          >
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
            >
              <Avatar
                src={selectedCC.currencyImg[0]}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" ,padding: 1 ,}}
              item
              xs={12}
            >
              <Typography variant="h6" >
              {selectedCC.currencies[0] + " " +  fromAmount }
              </Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" ,padding: 1 ,}}
              item
              xs={12}
            >
              <Typography  component="h2">
              {" بر روی شبکه " + selectedCC.network[0]  }
              </Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
            >
              <Typography component="h2">ارسال می کنید</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={4}
        >
          <ArrowCircleLeftIcon sx={{ width: 36, height: 36 }} />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={4}
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
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
            >
              <Avatar
                src={selectedCC.currencyImg[1]}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" ,padding: 1 ,}}
              item
              xs={12}
            >
              <Typography variant="h6" >
                {selectedCC.currencies[1] + " " + toAmount  }
              </Typography>
              </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
            >
              <Typography  component="h2">
                {" بر روی شبکه " +  selectedCC.network[1]}
              </Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
            >
              <Typography component="h2">دریافت می کنید</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
}
