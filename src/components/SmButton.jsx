import * as React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import AvatarCC from "./AvatarCC";

export default function SmButton(props) {

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


  const SmButton = styled(Button)({
    color: "#fff",
    borderColor: "#fff",
    width: "60%",
    "&:hover": {
      color: "#fff",
      borderColor: "#fff",
      backgroundColor: "transparent",
    },
  });

  return (
    <SmButton
      onClick={props.handleClickOpen}
      variant="outlined"
      size="medium"
      startIcon={<ArrowDropDown />}
    >
      medium
      <AvatarCC />
    </SmButton>
  );
}
