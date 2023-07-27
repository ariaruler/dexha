import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import AvatarCC from "./AvatarCC";
import { DialogActions, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import InputTrade from "./InputTrade";
import SearchIcon from '@mui/icons-material/Search';

import { ArrowDropDown } from "@mui/icons-material";

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";


const emails = [
  "username@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
  "user02@gmail.com",
];

export default function PopUp(props) {
  const theme = useTheme();
  console.log(props.borderRadius);
  const Dialogstyle = {
    "& .MuiPaper-root": {
      maxWidth: 400,
      height: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
  };
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      sx={Dialogstyle}
      maxWidth="xs"
      fullWidth={true}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle sx={{ backgroundColor: "rgba(256,256,256,0.1)" }}>
        Set backup account
        <InputTrade
          label="جستجو"
          height={inputHieght}
          borderRadius={bigbuttonBorderRadius}
          endAdornment={
            <SearchIcon />
          }
        />
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }} dividers>
        <List>
          {emails.map((email) => (
            <ListItem sx={{ padding: 0 }} disableGutters>
              <ListItemButton
                onClick={() => handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <AvatarCC />
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "rgba(256,256,256,0.1)" }}>
        <Button autoFocus>Cancel</Button>
        <Button>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
