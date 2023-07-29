import * as React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarCC from "./AvatarCC";

export default function SmButton(props) {



  const SmButton = styled(Button)({
    color: "#beb7cb",
    borderColor: "#beb7cb",
    width: "60%",
    "&:hover": {
      color: "#beb7cb",
      borderColor: "#beb7cb",
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
