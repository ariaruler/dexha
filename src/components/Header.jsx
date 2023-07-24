import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { createContext } from "react";

import { Link } from "react-router-dom";
import ButtonTrade from "./ButtonTrade";
import ButtonChooze from "./ButtonChooze";


const CardBox = styled("Box")({
  display: "flex",
  padding: 2,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 6,
  justifyContent: "center",
});

const pages = [
  {
   content : "صفحه اصلی",
    to : "/"
  },
  {
    content : "اپ",
    to :"/app"
  },
  {
    content : "ارتباط با ما",
    to : "/contact-us"
  },
  {
    content :"راهنمای مبادله",
    to : "/help"
  },
  {
    content :"سوالات متداول",
    to : "/faq"
  },
  {
    content :"قوانین",
    to : "/rules"
  },
]

export default function Header() {

  const UserContext = createContext();
  const theme = useTheme();


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
              {pages.map(page => (
                <Link style={{ textDecoration: 'none' }} to={page.to}>
                  <ButtonChooze content={page.content} />
                </Link>

              ))}


              {/* 
              <Link style={{ textDecoration : 'none' }} to="/">
                <ButtonChooze content="صفحه اصلی" />
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/app">
                <ButtonChooze content="اپ" />
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/contact-us">
                <ButtonChooze content="ارتباط با ما" />
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/help">
                <ButtonChooze content="راهنمای مبادله" />
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/faq">
                <ButtonChooze content="سوالات متداول" />

              </Link>

              <Link style={{ textDecoration : 'none' }} to="/rules">
                <ButtonChooze content="قوانین" />
              </Link> */}

            </CardBox>
          </Box>


          <ButtonTrade content=" اتصال به کیف پول" />



        </Toolbar>
      </Container>
    </AppBar>
  );
}
