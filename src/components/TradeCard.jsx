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
import SimpleDialog from "./PopUp";

const inputHieght = 52;

const CardBox = styled(Box)({
  display: "flex",
  padding: 20,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 12,
  justifyContent: "center",
});

const input = {
  backgroundColor: "rgba(256,256,256,0.1)",
  border: "none",
  width: "100%",
  height: inputHieght,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: 1.5,
  "& fieldset": {
    border: "none",
    height: inputHieght,
  },
};

const smallButton = {
  color: "#fff",
  borderColor: "#fff",
  width: "60%",
  "&:hover": {
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
};

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
}

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

export default function Tradecard() {
  const [active, setActive] = useState(-1);
  const changeColor = (id) => {
    setActive(id);
  };
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
          <TextField
            sx={input}
            id="outlined-basic"
            label="پرداخت"
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleClickOpen}
                  sx={smallButton}
                  variant="outlined"
                  size="medium"
                  startIcon={<ArrowDropDownIcon />}
                >
                  medium
                  <Avatar
                    sx={{ width: 20, height: 20, margin: "0 4px " }}
                    src="/static/images/avatar/1.jpg"
                  />
                </Button>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ChangeCircleOutlinedIcon sx={iconCircle} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={input}
            id="outlined-basic"
            label="دریافت"
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleClickOpen}
                  sx={smallButton}
                  variant="outlined"
                  size="medium"
                  startIcon={<ArrowDropDownIcon />}
                >
                  medium
                  <Avatar
                    sx={{ width: 20, height: 20, margin: "0 4px" }}
                    src="/static/images/avatar/1.jpg"
                  />
                </Button>
              ),
            }}
          />
        </Grid>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />

        <Grid item xs={12}>
          <ButtonTrade
            content="تبادل"
            width="100%"
            height={inputHieght}
            fontSize="1.3em"
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
            <Avatar
              sx={{ width: 20, height: 20, margin: "0 4px " }}
              src="/static/images/avatar/1.jpg"
            />
          </Button>
        </Grid>
      </Grid>
    </CardBox>
  );
}
