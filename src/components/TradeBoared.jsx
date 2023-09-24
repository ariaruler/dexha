import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, DialogContent, Grid, Skeleton } from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export default function TradeBoared(props) {
  const { selectedCC, toAmount, fromAmount } = useContext(UserContext);

  return (
    <DialogContent
      sx={{
        padding: "40px 2em",
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
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={5}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            container
          >
            <Grid
              sx={{ display: "flex",  }}
              item
              xs={12}
            >
              <Typography component="h2">ارسال می کنید</Typography>
            </Grid>
            <Grid
              sx={{ display: "flex",  }}
              item
              xs={4}
            >
              <Avatar
                src={selectedCC.currencyImg[0]}
                sx={{ width: 26, height: 26 }}
              />
            </Grid>
            <Grid
              sx={{ display: "flex", }}
              item
              xs={8}
            >
              <Typography variant="h6">{fromAmount}</Typography>
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
          xs={2}
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
              sx={{ display: "flex", justifyContent : 'flex-end'  }}
              item
              xs={12}
            >
              <Typography component="h2">دریافت می کنید</Typography>
            </Grid>
            <Grid
              sx={{ display: "flex",  }}
              item
              xs={4}
            >
              <Avatar
                src={selectedCC.currencyImg[1]}
                sx={{ width: 26, height: 26 }}
              />
            </Grid>
            <Grid
              sx={{ display: "flex",}}
              item
              xs={8}
            >
              <Typography variant="h6">
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  );
}
