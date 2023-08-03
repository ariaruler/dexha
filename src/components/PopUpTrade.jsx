import * as React from "react";

import Dialog from "@mui/material/Dialog";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

import { DialogActions, DialogContent, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import InputTrade from "./InputTrade";

import PopUpTitle from "./PopUpTitle";
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

export default function PopUpTrade(props) {
  const [openSetting, setOpenSetting] = useState(false);
  const theme = useTheme();
  const Dialogstyle = {
    "& .MuiPaper-root": {
      maxWidth: 400,
      height: openSetting ? "auto" : 556,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
  };
  const { onClose, selectedValue, open, id } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [expanded, setExpanded] = useState(-1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const closePopUp = () => setOpenSetting(false);

  return (
    <Dialog
      sx={Dialogstyle}
      maxWidth="xs"
      fullWidth={true}
      onClose={handleClose}
      open={open === id}
    >
      <PopUpTitle closePopUp={closePopUp} handleClose={handleClose} />

      <DialogContent>
        <Grid item xs={12}>
          <InputTrade
            disabled={true}
            margin='1em auto'
            label="پرداخت"
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton />}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ChangeCircleOutlinedIcon sx={iconCircle} />
        </Grid>

        <Grid item xs={12}>
          <InputTrade
            disabled={true}
            margin='1em auto'
            label="دریافت"
            height={inputHieght}
            borderRadius={bigbuttonBorderRadius}
            endAdornment={<SmButton />}
          />
        </Grid>
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
}
//
