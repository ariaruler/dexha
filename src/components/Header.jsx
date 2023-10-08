import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import logo from "../assets/logo.png";
import logo2 from "../assets/logo1.png";

import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";

import { Link } from "react-router-dom";
import ButtonTrade from "./ButtonTrade";
import ButtonChooze from "./ButtonChooze";

import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PopUpTitle from "./PopUpTitle";

import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const pages = [
  // {
  //   content: "صفحه اصلی",
  //   to: "https://dexha.io/",
  //   // active : false,
  // },
  {
    content: "اپ",
    to: "/swap",
    // active : false,
  },
  // {
    //   content: "ارتباط با ما",
    //   to: "/contact-us",
    //   // active : false,
    // },
    {
    content: "درباره ما",
    to: "/about-us",
    // active : false,
  },
  {
    content: "راهنمای مبادله",
    to: "/help",
    // active : false,
  },
  {
    content: "سوالات متداول",
    to: "/faq",
    // active : false,
  },
  // {
  //   content: "قوانین",
  //   to: "/rules",
  //   // active : false,
  // },
  {
    content: "پیگیری تبادل",
    to: "/transaction-tracking",
    // active : false,
  },
];

export default function Header() {
  const [active, setActive] = useState(-1);
  const changeColor = (id) => {
    setActive(id);
  };

  const theme = useTheme();

  const CardBox = styled("Box")({
    display: "flex",
    padding: 2,
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: theme.shape.borderRadius["0"],
    justifyContent: "center",
  });

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => {
    setState(open);
  };



  return (
    <AppBar
      sx={{ marginBottom: 3, backgroundColor: "transparent" }}
      elevation={0}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            component="img"
            sx={{ display: {md : "flex" , xs : 'none'}, mr: 1, width: 173 }}
            alt="DEXHA"
            src={logo}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <CardBox>
                <a
                  key={0}
                  style={{ textDecoration: "none" }}

                  href='https://dexha.io/'
                >
                  <ButtonChooze
                    id={0}
                    content="صفحه اصلی"
                    active={active === 0}
                    changeColor={changeColor}
                  />
                </a>
              {pages.map((page, index) => (
                <Link
                key={index+1}
                style={{ textDecoration: "none" }}
                to={page.to}
                href={page.to}
                >
                  <ButtonChooze
                    id={index+1}
                    content={page.content}
                    active={active === index+1}
                    changeColor={changeColor}
                  />
                </Link>
              ))}
            </CardBox>
          </Box>

          {/* <BootstrapTooltip
            title='به زودی'
            // sx={{' .MuiTooltip-popper' : {backgroundColor : theme.palette.secondary.main} ,backgroundColor : theme.palette.secondary.main}}
            arrow
          > */}
          <ButtonTrade  display={ "none"  } borderRadius="6px" content=" اتصال به کیف پول" connect={true} />
          {/* </BootstrapTooltip> */}
          <Box
            component="img"
            sx={{ display: {xs : "flex" , md : 'none'}, mr: 1, width: 120 }}
            alt="DEXHA"
            src={logo}
          />

          <Button
            onClick={() => {
              toggleDrawer(true);
            }}
            color="common"
            sx={{ minWidth: 0, padding: 1 }}
          >
            <MenuIcon sx={{ display: { xs: "block", md: "none" } }} />
          </Button>

          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: theme.palette.background.default,
                backgroundImage: "none",
              },
            }}
            anchor="top"
            open={state}
            onClose={() => {
              toggleDrawer(false);
              // console.log('ooooo');
            }}
          >
            <PopUpTitle
              handleClose={() => {
                toggleDrawer(false);
                // console.log('ooooo');
              }}
              rightComponent={
                <Box
                  component="img"
                  sx={{
                    display: "flex",
                    mr: 1,
                    width: 32,
                    height: 32,
                    margin: 0,
                  }}
                  alt="DEXHA"
                  src={logo2}
                />
              }
            />
            <Box
              sx={{
                width: "100%",
              }}
              role="presentation"
            >
              <List sx={{ width: "100%" }}>
              <ListItem key={100} disablePadding>
                    <a
                      key={100}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.secondary.contrastText,
                        width: "100%",
                      }}
                      href='https://dexha.io/'
                    >
                      <ListItemButton
                        onClick={() => {
                          toggleDrawer(false);
                          // console.log('ooooo');
                        }}
                      >
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: 0.5,
                          }}
                          primary='صفحه اصلی'
                        />
                      </ListItemButton>
                    </a>
                  </ListItem>
                {pages.map((x, index) => (
                  <ListItem key={x.content} disablePadding>
                    <Link
                      key={index}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.secondary.contrastText,
                        width: "100%",
                      }}
                      to={x.to}
                    >
                      <ListItemButton
                        onClick={() => {
                          toggleDrawer(false);
                          // console.log('ooooo');
                        }}
                      >
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: 0.5,
                          }}
                          primary={x.content}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-around", margin: 2 }}
            >
              <Avatar   sx={{ width: 30, height: 30 , backgroundColor : theme.palette.secondary.contrastText, }}>
                <InstagramIcon />
              </Avatar>
              <Avatar   sx={{ width: 30, height: 30 , backgroundColor : theme.palette.secondary.contrastText, }}>
                <TelegramIcon />
              </Avatar>
              <Avatar   sx={{ width: 30, height: 30 , backgroundColor : theme.palette.secondary.contrastText, }}>
                <TwitterIcon />
              </Avatar>
              <Avatar   sx={{ width: 30, height: 30 , backgroundColor : theme.palette.secondary.contrastText, }}>
                <LinkedInIcon />
              </Avatar>
            </Stack>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
