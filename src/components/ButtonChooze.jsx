import * as React from "react";
import Button from "@mui/material/Button";

import { useTheme } from "@emotion/react";


export default function ButtonChooze(props) {

 const theme = useTheme()
  
  const ButtonStyle = {
     color: props.active ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText,
     "&:hover" :{
      backgroundColor : 'transparent'
     }
 };

  return (
    <Button id={props.id} key={props.content} sx={ButtonStyle} onClick={() => {props.changeColor(props.id , props.id)}}>
        {props.content}
    </Button>
  );
}
