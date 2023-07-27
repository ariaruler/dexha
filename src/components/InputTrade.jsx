import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AvatarCC from "./AvatarCC";



export default function InputTrade(props) {


    const input = {
        backgroundColor: "rgba(256,256,256,0.1)",
        border: "none",
        // width: "100%",
        height: props.inputHieght,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: props.borderRadius,
        "& fieldset": {
          border: "none",
          height: props.inputHieght,
        },
      };

  return (
    <TextField
            sx={input}
            id="outlined-basic"
            label={props.label}
            InputProps={{
              endAdornment: (
               <>{props.endAdornment}</> 
                
              ),
            }}
          />
  );
}
