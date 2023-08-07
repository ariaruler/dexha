import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


import ButtonTrade from "./ButtonTrade";

import ButtonChooze from "./ButtonChooze";
import { useState } from "react";


import PopUp from "./PopUp";

import InputTrade from "./InputTrade";

import { useTheme } from "@emotion/react";
import SmButton from "./SmButton";
import Buttonfee from "./Buttonfee";
import PopUpTrade from "./PopUpTrade";



const inputHieght = 54;
const bigbuttonBorderRadius = "8px";



const pages = [
  {
    content: "نرخ استاندارد",
  },
  {
    content: "بهترین قیمت",
  },
  {
    content: "نرخ ثابت",
  },

];

export default function Tradecard(props) {
  const theme = useTheme();

  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = (value) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  const CardBox = styled(Box)({
    display: "flex",
    padding: 20,
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: props.borderRadius,
    justifyContent: "center",
  });

  const iconCircle = {
    transition: 'transform .3s ease-in-out',
    backgroundColor: theme.palette.background.paper,
    borderRadius : '50%',
    '&:hover' :{
  
      transform: 'rotate(180deg)',
    }
  };

  const [active, setActive] = useState(0);
  const changeColor = (id) => {
    setActive(id);
  };


  return (
    <CardBox>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {pages.map((page, index) => (
            <ButtonChooze
              key={index}
              id={index}
              content={page.content}
              active={active === index}
              changeColor={changeColor}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <InputTrade
            label="پرداخت"
            type="number"
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton width='60%' dropDownIcon={true} id={0} handleClickOpen={() => {handleClickOpen(0)}} />}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <KeyboardArrowDownIcon sx={iconCircle}  />
        </Grid>

        <Grid item xs={12}>
          <InputTrade
            label="دریافت"
            type="number"
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton width='60%'  dropDownIcon={true} id={0} handleClickOpen={() => {handleClickOpen(0)}} />}
          />
        </Grid>
        <PopUp
        id={0}
          borderRadius={props.borderRadius}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />

        <Grid item xs={12}>
          <ButtonTrade
          handleClickOpen={() => {handleClickOpen(2)}}
          id={2}
            borderRadius={bigbuttonBorderRadius}
            content="تبادل"
            width="100%"
            fontSize="1.2em"
            height={50}
          />
        </Grid>

        <PopUpTrade
        id={2}
          borderRadius={props.borderRadius}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />        

        <Grid item xs={12}>
            <Buttonfee inputHieght={inputHieght} bigbuttonBorderRadius={bigbuttonBorderRadius} />
        </Grid>
      </Grid>
    </CardBox>
  );
}
