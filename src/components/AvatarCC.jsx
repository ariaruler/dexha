import * as React from "react";
import { Avatar } from "@mui/material";

export default function AvatarCC(props) {


  return (
    <Avatar
    sx={{ width: 20, height: 20, margin: "0 4px" }}
    src={props.image}
  />
  );
}
