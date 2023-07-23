import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import {  Link } from "react-router-dom";


const CardBox = styled("Box")({
  display: "flex",
  padding: 2,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 12,
  justifyContent: "center",
});

export default function Header() {


  const theme = useTheme();

  return (
    <AppBar elevation={0} position="static">
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

              <Link style={{ textDecoration : 'none' }} to="/">
                <Button sx={{ color: "white", display: "block" }} >
                  صفحه اصلی
                </Button>
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/app">
              <Button sx={{ color: "white", display: "block" }} >
                  اپ
                </Button>
              </Link>

              <Link style={{ textDecoration : 'none' }} to="/contact-us">
              <Button sx={{ color: "white", display: "block" }} >
                   ارتباط با ما
                </Button>
              </Link>

            </CardBox>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" color="primary">
              Contained
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
