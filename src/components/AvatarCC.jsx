import * as React from "react";
import { Avatar } from "@mui/material";



export default function AvatarCC(props) {
  const AvatarCCStyle = {
    width: 20,
    height: 20,
    margin: "0 4px",

  };

  return <Avatar sx={AvatarCCStyle} src={props.image} />;
}
