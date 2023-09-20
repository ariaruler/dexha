import { DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUpTitle(props) {

  const theme = useTheme();



    return (
        <DialogTitle
        sx={{padding: '12px 28px' , backgroundColor: props.backgroundPaper }}
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
            {props.rightComponent}

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