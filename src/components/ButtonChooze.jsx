import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";


export default function ButtonChooze(props) {
    
  const [active , setActive] = useState(false);
  const ButtonStyle = {
     color: active ? "#fff" : "gray"  
 };

  return (
    <Button key={props.content} sx={ButtonStyle} onClick={()=>{setActive(true)}}>
        {props.content}
    </Button>
  );
}
