import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

import AvatarCC from "./AvatarCC";
import {
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import InputTrade from "./InputTrade";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";


import styled from "@emotion/styled";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));



const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const expandstyle = {
  fontSize : '2em',
  margin : 2,
}

export default function PopUp(props) {
  const [openSetting, setOpenSetting] = useState(false);
  const theme = useTheme();
  console.log(props.borderRadius);
  const Dialogstyle = {
    "& .MuiPaper-root": {
      maxWidth: 400,
      height: openSetting ? 'auto' : 556,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
  };
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [expanded, setExpanded] = useState(-1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Dialog
      sx={Dialogstyle}
      maxWidth="xs"
      fullWidth={true}
      onClose={handleClose}
      open={open}
    >
      {openSetting ? (
        <>
         <DialogTitle sx={{ backgroundColor: "rgba(256,256,256,0.1)" }}>
            <Grid
              item
              sx={{

                display: "flex",
                justifyContent: " space-between ",
              }}
              xs={12}
            >
              <IconButton onClick={() => setOpenSetting(false)} aria-label="close">
               <ArrowForwardIosSharpIcon />
              </IconButton>
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogTitle>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <MuiAccordionSummary
             expandIcon={<ExpandMoreIcon sx={expandstyle}  />}
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{
                alignItem: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: " space-between ",
                },
                padding: 1,
                borderBottom: "1px  solid #beb7cb",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Collapsible Group Item #1
              </Typography>
            </MuiAccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={expandstyle}  />}
              aria-controls="panel2d-content"
              id="panel2d-header"
              sx={{
                alignItem: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: " space-between ",
                },
                padding: 1,
                borderBottom: "1px  solid #beb7cb",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Collapsible Group Item #2
              </Typography>
            </MuiAccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <MuiAccordionSummary
              sx={{
                alignItem: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: " space-between ",
                },
                padding: 1,
                borderBottom: "1px  solid #beb7cb",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Collapsible Group Item #3
              </Typography>
              <Android12Switch defaultChecked />
            </MuiAccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={expandstyle} />}
              aria-controls="panel3d-content"
              id="panel3d-header"
              sx={{
                alignItem: "center",
                "& .MuiAccordionSummary-content": {
                  justifyContent: " space-between ",
                },
                padding: 1,
                borderBottom: "1px  solid #beb7cb",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Collapsible Group Item #3
              </Typography>
            </MuiAccordionSummary>
            <AccordionDetails>
            <List>
              {emails.map((email) => (
                <ListItem
                  sx={{ padding: 0, borderBottom: "1px  solid #beb7cb" }}
                  disableGutters
                >
                  <ListItemButton key={email}>
                    <ListItemAvatar>
                      <AvatarCC />
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                    <Android12Switch defaultChecked />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <>
          <DialogTitle sx={{ backgroundColor: "rgba(256,256,256,0.1)" }}>
            <Grid
              item
              sx={{
                margin: 1,
                display: "flex",
                justifyContent: " space-between ",
              }}
              xs={12}
            >
              توکن خود را انتخواب کنید
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ margin: "1px 0 " }} xs={12}>
              <InputTrade
                label="جستجو"
                height={inputHieght}
                borderRadius={bigbuttonBorderRadius}
                endAdornment={<SearchIcon sx={{ marginLeft: 20 }} />}
              />
            </Grid>
          </DialogTitle>

          <DialogContent
            sx={{
              padding: 0,
              borderBottom: "1px  solid #beb7cb",
              borderTop: "1px  solid #beb7cb",
            }}
            dividers
          >
            <List>
              {emails.map((email) => (
                <ListItem
                  sx={{ padding: 0, borderBottom: "1px  solid #beb7cb" }}
                  disableGutters
                >
                  <ListItemButton key={email}>
                    <ListItemAvatar>
                      <AvatarCC />
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>

          <DialogActions
            onClick={() => setOpenSetting(true)}
            sx={{ backgroundColor: "rgba(256,256,256,0.1)" }}
          >
            <Grid
              item
              sx={{ margin: 1, display: "flex", justifyContent: " center " }}
              xs={12}
            >
              تنظیمات
            </Grid>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
//
