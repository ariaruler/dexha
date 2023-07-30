import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";


import ButtonTrade from "./ButtonTrade";

import ButtonChooze from "./ButtonChooze";
import { useState } from "react";


import PopUp from "./PopUp";

import InputTrade from "./InputTrade";

import { useTheme } from "@emotion/react";
import SmButton from "./SmButton";
import Buttonfee from "./Buttonfee";



const inputHieght = 54;
const bigbuttonBorderRadius = "8px";

const iconCircle = {
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
};

const pages = [
  {
    content: "بهترین قیمت",
  },
  {
    content: "نرخ ثابت",
  },
  {
    content: "نرخ استاندارد",
  },
];

export default function Tradecard(props) {
  const theme = useTheme();

  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const CardBox = styled(Box)({
    display: "flex",
    padding: 20,
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: props.borderRadius,
    justifyContent: "center",
  });

  const [active, setActive] = useState(-1);
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
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton handleClickOpen={handleClickOpen} />}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ChangeCircleOutlinedIcon sx={iconCircle} />
        </Grid>

        <Grid item xs={12}>
          <InputTrade
            label="دریافت"
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton handleClickOpen={handleClickOpen} />}
          />
        </Grid>
        <PopUp
          borderRadius={props.borderRadius}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />

        <Grid item xs={12}>
          <ButtonTrade
            borderRadius={bigbuttonBorderRadius}
            content="تبادل"
            width="100%"
            fontSize="1.2em"
            height={50}
          />
        </Grid>

        <Grid item xs={12}>
            <Buttonfee inputHieght={inputHieght} bigbuttonBorderRadius={bigbuttonBorderRadius} />
        </Grid>
      </Grid>
    </CardBox>
  );
}
