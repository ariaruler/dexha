import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AvatarCC from "./AvatarCC";
import { useTheme } from "@emotion/react";

export default function InputTrade(props) {

  const theme = useTheme()

  const input = {
    backgroundColor: "rgba(256,256,256,0.1)",
    border: "none",
    width: "100%",
    margin: props.margin,
    height: props.inputHieght,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: props.borderRadius,
    boxShadow : theme.shadows['1'] ,
    "& fieldset": {
      border: "none",
      height: props.inputHieght,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    '& .MuiInputBase-root' :{
      width : '100%'
    }
  };

  return (
    <TextField
    // error
    id="outlined-error"
      sx={input}
      disabled={props.disabled}
      type={props.type}
      color="common"
      label={props.label}
      InputProps={{
        endAdornment: <>{props.endAdornment}</>,
      }}
    />
  );
}
