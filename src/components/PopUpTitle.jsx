import { DialogTitle, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUpTitle(props) {

  const theme = useTheme();

    return (
        <DialogTitle
        sx={{padding: '12px 28px' , backgroundColor: "rgba(256,256,256,0.1)" }}
        // padding: 1, 16px 24px
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: " space-between ",
          }}
          xs={12}
        >
          <IconButton onClick={props.closePopUp}>
            <ArrowForwardIosSharpIcon
              sx={{ fontSize: 1.3*theme.typography.fontSize, width: "22px" }}
            />
          </IconButton>
          <IconButton onClick={props.handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
    );
}