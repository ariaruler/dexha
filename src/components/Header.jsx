import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import logo from "../assets/logo.png";

import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";

import { Link } from "react-router-dom";
import ButtonTrade from "./ButtonTrade";
import ButtonChooze from "./ButtonChooze";

import { useState } from "react";
import { Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  {
    content: "صفحه اصلی",
    to: "/",
    // active : false,
  },
  {
    content: "اپ",
    to: "/app",
    // active : false,
  },
  {
    content: "ارتباط با ما",
    to: "/contact-us",
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
  {
    content: "قوانین",
    to: "/rules",
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
            sx={{ display: "flex", mr: 1, width: "13vw" }}
            alt="The house from the offer."
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
              {pages.map((page, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: "none" }}
                  to={page.to}
                >
                  <ButtonChooze
                    id={index}
                    content={page.content}
                    active={active === index}
                    changeColor={changeColor}
                  />
                </Link>
              ))}
            </CardBox>
          </Box>

          <ButtonTrade borderRadius="6px" content=" اتصال به کیف پول" />

          <Button
            onClick={() => {
              toggleDrawer(true);
            }}
            color="common"
            sx={{ minWidth: 0, padding: 1 }}
          >
            <MenuIcon sx={{ display: { xs: "block", md: "none" } }} />
          </Button>

          <Drawer anchor="top" open={state} 
          onClose={()=>{

            toggleDrawer(false)
            // console.log('ooooo');
          }
          }
          >
    <Box
      sx={{ width : 250 }}
      role="presentation"

    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
