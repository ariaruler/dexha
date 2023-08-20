import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";

import {
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";


import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import styled from "@emotion/styled";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ToggleButtons from "./TogglrButtons";
import ButtonTrade from "./ButtonTrade";
import PopUpTitle from "./PopUpTitle";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";


const marginOfAccordion = "1px 2em";

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
  fontSize: "2em",
  margin: 1,
};

export default function PopUpSetting(props) {
  const [openSetting, setOpenSetting] = useState(0);

  const theme = useTheme();
  const Dialogstyle = {
    "& .MuiDialog-paper": {
      maxWidth: 400,
      height:  "auto" ,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
    "& .MuiPaper-root": { backgroundColor: theme.palette.background.default },
  };
  const { onClose, selectedValue, open, id } = props;

  const handleClose = () => {
    onClose(selectedValue);
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
          open={open === id}
        >

            <PopUpTitle
              header="تنظیمات"
              displayNone={true}
              handleClose={handleClose}
            />
            <motion.Fragment
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0 }}
            >
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ backgroundColor: theme.palette.background.default }}
              >
                <MuiAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={expandstyle} />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{
                    alignItem: "center",
                    "& .MuiAccordionSummary-content": {
                      justifyContent: " space-between ",
                    },
                    margin: marginOfAccordion,
                    borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    بازه قیمت
                  </Typography>
                </MuiAccordionSummary>
                <AccordionDetails sx={{ padding: "15px 30px !important" }}>
                  <ToggleButtons first="0.1%" second="0.1%" third="0.1%" />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <MuiAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={expandstyle} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                  sx={{
                    alignItem: "center",
                    "& .MuiAccordionSummary-content": {
                      justifyContent: " space-between ",
                    },
                    margin: marginOfAccordion,
                    borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    سرعت واکنش
                  </Typography>
                </MuiAccordionSummary>
                <AccordionDetails sx={{ padding: "15px 30px !important" }}>
                  <ToggleButtons
                    first="معمولی"
                    second="سریع"
                    third="سرعت زیاد"
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <MuiAccordionSummary
                  expandIcon={
                    <Android12Switch color="secondary" defaultChecked />
                  }
                  defaultExpanded={true}
                  onChange={() => {}}
                  sx={{
                    alignItem: "center",
                    "& .MuiAccordionSummary-content": {
                      justifyContent: " space-between ",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transform: "none",
                    },
                    margin: marginOfAccordion,
                    borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    قابلیت بازگشت وجه
                  </Typography>
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
                    margin: marginOfAccordion,
                    borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    صرافی های فعال
                  </Typography>
                </MuiAccordionSummary>
                <AccordionDetails>
                  {emails.map((email) => (
                    <Accordion>
                      <MuiAccordionSummary
                        expandIcon={
                          <Android12Switch color="secondary" defaultChecked />
                        }
                        defaultExpanded={true}
                        onChange={() => {}}
                        sx={{
                          alignItem: "center",
                          "& .MuiAccordionSummary-content": {
                            justifyContent: " space-between ",
                          },
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            transform: "none",
                          },
                          margin: marginOfAccordion,
                          borderBottom: `1px  solid ${theme.palette.grey["50"]}`,
                        }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {email}
                        </Typography>
                      </MuiAccordionSummary>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            </motion.Fragment>
            <ButtonTrade
              content="بازگشت به تنظیمات پیشفرض"
              margin={3}
              borderRadius="6px"
              // width="80%"
            />

        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}
