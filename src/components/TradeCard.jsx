import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

import Button from "@mui/material/Button";
import ButtonTrade from "./ButtonTrade";

import ButtonChooze from "./ButtonChooze";
import { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import PopUp from "./PopUp";

import InputTrade from "./InputTrade";


import { ArrowDropDown } from "@mui/icons-material";
import AvatarCC from "./AvatarCC";
import SmButton from "./SmButton";

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

const feeButton = {
  height: inputHieght,
  width: "100%",
  borderRadius :bigbuttonBorderRadius,
  border : '1px solid #beb7cb',
  color: '#beb7cb',
  "&:hover": {
    border : '1px solid #beb7cb',
    color: '#beb7cb',
    backgroundColor: 'transparent'
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
            endAdornment={
              <SmButton handleClickOpen={handleClickOpen} />
            }
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
            endAdornment={
              <SmButton handleClickOpen={handleClickOpen} />
            }
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
            fontSize="1.3em"
            height={50}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            sx={feeButton}
            variant="outlined"
            size="medium"
            startIcon={<ArrowDropDownIcon />}
          >
            medium
          </Button>
        </Grid>
      </Grid>
    </CardBox>
  );
}
