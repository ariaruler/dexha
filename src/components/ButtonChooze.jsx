import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";


export default function ButtonChooze({active , id , content , changeColor}) {

  console.log(active)
  
  const ButtonStyle = {
     color: active ? "#fff" : "#beb7cb"  
 };

  return (
    <Button id={id} key={content} sx={ButtonStyle} onClick={() => changeColor(id)}>
        {content}
    </Button>
  );
}
