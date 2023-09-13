import * as React from "react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Container, Divider, Grid } from "@mui/material";
import InputTrade from "../components/InputTrade";
import SearchIcon from "@mui/icons-material/Search";

import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext } from "react";
import { UserContext } from "../App";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TransactionTracking() {
  const theme = useTheme();

  const {
    setStep,
    handleClickOpen,
  } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: 0 }}
    >
      <Container maxWidth="xs">
        <Grid item sx={{ margin: "1px 0 " }} xs={12}>
          <InputTrade
            onChange={(e) => e.target.value}
            label="جستجو"
            inputHieght={52}
            borderRadius={theme.shape.borderRadius[1]}
            endAdornment={<SearchIcon sx={{ marginLeft: 20 }} />}
          />
        </Grid>
        <button onClick={()=>{setStep(2);handleClickOpen(2);}}>button</button>
      </Container>
      <Container maxWidth="md">
        <TableContainer
          component={Paper}
          sx={{ margin: "2em 0", backgroundColor: "transparent" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } ,border: 'none'
                //  `1px solid ${theme.palette.secondary.contrastText}`
                 }} 
              >
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Fat&nbsp;(g)</TableCell>
                <TableCell>Carbs&nbsp;(g)</TableCell>
                <TableCell>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ border: 'none'
                    //  `1px solid ${theme.palette.secondary.contrastText}` 
                    }}
                >
                  <TableCell sx={{ border: 0 }}>{row.name}</TableCell>
                  <TableCell sx={{ border: 0 }}>{row.calories}</TableCell>
                  <TableCell sx={{ border: 0 }}>{row.fat}</TableCell>
                  <TableCell sx={{ border: 0 }}>{row.carbs}</TableCell>
                  <TableCell sx={{ border: 0 }}>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </motion.div>
  );
}
