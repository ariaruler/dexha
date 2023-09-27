import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import connectWallet from "../assets/connectWallet.png";

export default function ButtonTrade(props) {
  const ButtonStyle = {
    borderRadius: props.borderRadius,
    padding: props.connect? {xs : '8px 8px' , md : '8px 40px' } : "8px 40px ",
    width: props.width,
    height: props.height,
    fontWeight: 900,
    fontSize: props.fontSize,
    boxShadow: props.disabled
      ? "none"
      : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
    margin: props.margin,
    minWidth: 0,
  };


  return (
    <Button
      disabled={props.disabled}
      onClick={props.handleClickOpen}
      elevation={0}
      sx={ButtonStyle}
      variant="contained"
      color="primary"
    >
      <Box sx={{ display: { xs: props.display, md: "flex" } }}>
        {props.content}
      </Box>
      {props.connect ? (
        <Box
          component="img"
          sx={{
            display: { md: props.display, xs: "flex" },
            height: 14,
            width: 20,
          }}
          alt="connent wallet"
          src={connectWallet}
        />
       ) : (
        <></>
      )} 
    </Button>
  );
}
