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
  TextareaAutosize,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import InputTrade from "./InputTrade";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import QrScan, { QrReader } from "react-qr-reader";

export default function PopUpQrScan(props) {
  const theme = useTheme();

  const Dialogstyle = {
    "& .MuiDialog-paper": {
      maxWidth: 400,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
    "& .MuiPaper-root": { backgroundColor: theme.palette.background.default },
  };

//   const { onClose, selectedValue, open, id } = props;

  const handleClose = () => {
    props.onClose(props.selectedValue);
  };


// console.error(props.id);
// console.error(props.open);

  return (
    <Dialog
      id={props.id}
      sx={Dialogstyle}
      maxWidth="xs"
      fullWidth={true}
      onClose={handleClose}
      open={props.open === props.id}
    >
        
        <DialogContent
                sx={{
                  padding: 0,
                  borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  borderTop: `1px  solid ${theme.palette.grey["50"]}`,
                }}
                dividers
              >
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            props.setData((prev)=>   result?.text);
          }

          if (!!error) {
            // console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{props.data}</p>
        </DialogContent>
    </Dialog>
  );
}
