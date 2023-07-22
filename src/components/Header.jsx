import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";


import { Outlet, Link } from "react-router-dom";



const CardBox = styled("Box")({
  display: "flex",
  padding: 1,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 3,
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
              
              {/* <Link to="/landing-page"> */}
                <Button
                  sx={{ color: "white", display: "block" }}
                >
                  صفحه اصلی
                </Button>
              {/* </Link> */}
              
              {/* <Link to="/"> */}
                <Button
                  sx={{ color: "white", display: "block" }}
                >
                  اپ
                </Button>
              {/* </Link> */}
              
              {/* <Link to="/contact-us"> */}
                <Button
                  sx={{ color: "white", display: "block" }}
                >
                  درباره ما
                </Button>
              {/* </Link> */}
              <Outlet />
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
