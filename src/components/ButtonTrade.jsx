import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonTrade(props) {
  const ButtonStyle = {
    borderRadius: 1.5,
    padding: "8px 40px ",
    width: props.width,
    height : props.height,
    fontWeight : 900,
    fontSize : props.fontSize,
    boxShadow : "rgba(38, 105, 245, 0.25) 0px 0px 16px ",
  };

  return (
    <Button elevation={0} sx={ButtonStyle} variant="contained" color="primary">
      {props.content}
    </Button>
  );
}
