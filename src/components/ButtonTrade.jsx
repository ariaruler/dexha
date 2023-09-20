import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonTrade(props) {
  const ButtonStyle = {
    borderRadius: props.borderRadius,
    padding: "8px 40px ",
    width: props.width,
    height : props.height,
    fontWeight : 900,
    fontSize : props.fontSize,
    boxShadow : props.disabled ? 'none' : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
    margin : props.margin,
    
  };

  return (
    <Button disabled={props.disabled} onClick={props.handleClickOpen} elevation={0} sx={ButtonStyle} variant="contained" color="primary">
      {props.content}
    </Button>
  );
}
