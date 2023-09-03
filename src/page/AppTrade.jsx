import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tradecard from "../components/TradeCard";
import {motion } from 'framer-motion'
import { useTheme } from "@emotion/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



export default function AppTrade() {
  const theme = useTheme()
  
  return (
    <motion.div
    initial={{opacity : 0 , width : 0}}
    animate={{opacity : 1 , width : '100%'}}
    exit={{opacity : 0, width : 0}}
    >
    <Container maxWidth="xs">
      {/* <Grid container spacing={2}  sx={{ justifyContent : 'center'}}>
        <Grid item xs={4}> */}
        <Tradecard borderRadius={theme.shape.borderRadius['2']} />
        {/* </Grid> */}
        {/* <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
      {/* </Grid> */}
    </Container>
    </motion.div>
  );
}
