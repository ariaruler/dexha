import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
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
import { useState, useEffect } from "react";
import InputTrade from "./InputTrade";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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

import axios from "axios";
import { useInfiniteQuery } from "react-query";


const inputHieght = 54;
const bigbuttonBorderRadius = "8px";
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

export default function PopUp(props) {
  const [openSetting, setOpenSetting] = useState(0);

  const theme = useTheme();
  const Dialogstyle = {
    "& .MuiDialog-paper": {
      maxWidth: 400,
      height: openSetting ? "auto" : 556,
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

  const [currencies, setCurrencies] = useState([]);

  useEffect(
  //   () => {
  //   axios
  //     .get(
  //       "https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true"
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setCurrencies(res.data);
  //     });

  
  // }
  
  () =>{

    axios.get("https://bamanchange.com/exchange/api/currencies?active=true&flow=standard&buy=true&sell=true$_start=&_limit=10").then((res) => {
             console.log(res);
            setCurrencies(res.data);
          });
  }
  , []);



  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage.data.length === 10;
      if (!morePagesExist) {
        return undefined;
      }
      return pages.length * 10;
    },
  });


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{ opacity: 0, width: 0 }}
      >
        <Dialog
          sx={Dialogstyle}
          maxWidth="xs"
          fullWidth={true}
          onClose={handleClose}
          open={open === id}
        >
          {openSetting === 0 ? (
            <>
              <DialogTitle
                sx={{ backgroundColor: theme.palette.background.paper }}
              >
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <div>{console.log(currencies)}</div>

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
                  borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
                  borderTop: `1px  solid ${theme.palette.secondary.contrastText}`,
                }}
                dividers
              >
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  {currencies.map((x) => (
                      <React.Suspense >
                    <Accordion>
                        <MuiAccordionSummary
                          sx={{
                            height: "auto",
                            alignItem: "center",

                            "& .MuiAccordionSummary-expandIconWrapper": {
                              transform: "none",
                            },
                            margin: marginOfAccordion,
                            borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
                          }}
                        >
                          <AvatarCC image={x.image} />
                          <Typography>{x.name}</Typography>
                        </MuiAccordionSummary>
                        <AccordionDetails>
                          <ToggleButtons
                            first="0.1%"
                            second="0.1%"
                            third="0.1%"
                          />
                        </AccordionDetails>
                    </Accordion>
                      </React.Suspense>
                  ))}
                </motion.div>
              </DialogContent>

              <DialogActions
                onClick={() => setOpenSetting(openSetting + 1)}
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
                      margin: 1,
                      display: "flex",
                      justifyContent: " center ",
                    }}
                    xs={12}
                  >
                    تنظیمات
                  </Grid>
                </motion.div>
              </DialogActions>
            </>
          ) : (
            <>
              <PopUpTitle
                header="تنظیمات"
                previosStep={() => setOpenSetting(openSetting - 1)}
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
                      borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
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
                  <AccordionDetails>
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
                      borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
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
                  <AccordionDetails>
                    <ToggleButtons
                      first="معمولی"
                      second="سریع"
                      third="سرعت زیاد"
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <MuiAccordionSummary
                    expandIcon={<Android12Switch defaultChecked />}
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
                      borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
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
                      borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
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
                          expandIcon={<Android12Switch defaultChecked />}
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
                            borderBottom: `1px  solid ${theme.palette.secondary.contrastText}`,
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
            </>
          )}
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}
//
