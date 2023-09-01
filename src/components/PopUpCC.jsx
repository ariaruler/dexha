import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

import {
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import InputTrade from "./InputTrade";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";


import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import CC from "./CC";

const inputHieght = 54;
const bigbuttonBorderRadius = "8px";
const marginOfAccordion = "1px 2em";


export default function PopUpCC(props) {



  const theme = useTheme();
  const Dialogstyle = {
    "& .MuiDialog-paper": {
      maxWidth: 400,
      height:  556,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
    "& .MuiPaper-root": { backgroundColor: theme.palette.background.default },
  };



  const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  const [expanded, setExpanded] = useState(-1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{ opacity: 0, width: 0 }}
      >
        <Dialog
          id={props.id}
          sx={Dialogstyle}
          maxWidth="xs"
          fullWidth={true}
          onClose={handleClose}
          open={props.open === props.id}
        >

            <>
              <DialogTitle
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <Grid
                    item
                    sx={{
                      margin: 2,
                      display: "flex",
                      justifyContent: " space-between ",
                    }}
                    xs={12}
                  >
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      توکن خود را انتخاب کنید
                    </Typography>
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ margin: "1px 0 " }} xs={12}>
                    <InputTrade
                      label="جستجو"
                      inputHieght={52}
                      borderRadius={bigbuttonBorderRadius}
                      endAdornment={<SearchIcon sx={{ marginLeft: 20 }} />}
                    />
                  </Grid>
                </motion.div>
              </DialogTitle>

              <DialogContent
                sx={{
                  padding: 0,
                  borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  borderTop: `1px  solid ${theme.palette.grey["50"]}`,
                }}
                dividers
              >
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <CC id={props.id} />
                </motion.div>
              </DialogContent>

              <DialogActions

                sx={{ backgroundColor: theme.palette.background.paper }}
              >

                  <Grid
                    item
                    sx={{
                      margin: 1,
                      display: "flex",
                      justifyContent: " center ",
                      height : 20,
                    }}
                    xs={12}
                  >

                  </Grid>

              </DialogActions>
            </>

        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}
//
