import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tradecard from "../components/TradeCard";
import {motion } from 'framer-motion'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const cardBorderRadius = "12px";

export default function AppTrade() {
  return (
    <motion.div
    initial={{opacity : 0 , width : 0}}
    animate={{opacity : 1 , width : '100%'}}
    exit={{opacity : 0, width : 0}}
    >
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Tradecard borderRadius={cardBorderRadius} />
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Container>
    </motion.div>
  );
}
