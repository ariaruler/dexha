import * as React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarCC from "./AvatarCC";

import { useTheme } from "@emotion/react";

export default function SmButton(props) {

  const theme = useTheme()

  const SmButton = styled(Button)({
    color: theme.palette.secondary.contrastText ,
    borderColor: theme.palette.secondary.contrastText ,
    width: "60%",
    "&:hover": {
      color: theme.palette.secondary.contrastText ,
      borderColor: theme.palette.secondary.contrastText ,
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