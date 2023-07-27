import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";


export default function ButtonChooze(props) {


  
  const ButtonStyle = {
     color: props.active ? "#fff" : "#beb7cb"  
 };

  return (
    <Button id={props.id} key={props.content} sx={ButtonStyle} onClick={() => props.changeColor(props.id)}>
        {props.content}
    </Button>
  );
}
