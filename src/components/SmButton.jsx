import * as React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarCC from "./AvatarCC";

import { useTheme } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from './TradeCard'


export default function SmButton(props) {

  const theme = useTheme()

  const selectedCC = useContext(UserContext);

  // const [currencies, setCurrencies] = useState(selectedCC.currency[props.id]);

  // const [currenciesImg, setCurrenciesImg] = useState(selectedCC.currency[props.id]);

  // const [network, setNetwork] = useState(selectedCC.network[props.id]);

  // console.log(selectedCC.currencies[0]);

  const SmButton = styled(Button)({
    color: theme.palette.secondary.contrastText ,
    borderColor: theme.palette.secondary.contrastText ,
    borderRadius: theme.shape.borderRadius['1'],
    // width: '50%',
    alignItems : 'center',
    // padding: 'auto 5em',
    "&:hover": {
      color: theme.palette.secondary.contrastText ,
      borderRadius: theme.shape.borderRadius['1'],
      borderColor: theme.palette.secondary.contrastText ,
      backgroundColor: "transparent",
    },
  });

  return (
    <SmButton
      onClick={props.handleClickOpen}
      variant="outlined"
      size="medium"
      startIcon={ props.dropDownIcon ? <ArrowDropDown /> : undefined }
    >
      {props.id ? selectedCC.currencies[1] : selectedCC.currencies[0] }
      <AvatarCC image={props.id ? selectedCC.currencyImg[1] : selectedCC.currencyImg[0]} />
    </SmButton>
  );
}
