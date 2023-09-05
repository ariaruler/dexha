import { DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUpTitle(props) {

  const theme = useTheme();

  const arowIcon = {
    fontSize: 1.3*theme.typography.fontSize,
     width: "22px" ,

  }

    return (
        <DialogTitle
        sx={{padding: '12px 28px' , backgroundColor: theme.palette.background.paper }}
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
          <IconButton sx={{    opacity : props.displayNone ? 0 : 1,  cursor: props.pointerDisable ? 'auto' : 'pointer' ,}} onClick={props.previosStep}>
            <ArrowForwardIosSharpIcon
              sx={arowIcon}
            />
          </IconButton>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
                {props.header}
              </Typography>
          <IconButton onClick={props.handleClose} aria-label="close">
            <CloseIcon  />
          </IconButton>
        </Grid>
      </DialogTitle>
    );
}