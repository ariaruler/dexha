import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import logo from "../assets/logo.png";

import { styled } from "@mui/system";


import { Link } from "react-router-dom";
import ButtonTrade from "./ButtonTrade";
import ButtonChooze from "./ButtonChooze";

import { useState } from "react";


const CardBox = styled("Box")({
  display: "flex",
  padding: 2,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 6,
  justifyContent: "center",
});

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
]

export default function Header() {


  const [active, setActive] = useState(-1);
  const changeColor = (id) => { setActive(id) };


  return (
    <AppBar sx={{ marginBottom: 3 }} elevation={0} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


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
                <Link key={index} style={{ textDecoration: 'none' }} to={page.to}>
                  <ButtonChooze id={index} content={page.content} active={active === index} changeColor={changeColor} />
                </Link>
              ))}

            </CardBox>
          </Box>


          <ButtonTrade  borderRadius='6px' content=" اتصال به کیف پول" />


        </Toolbar>
      </Container>
    </AppBar>
  );
}
