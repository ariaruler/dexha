import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

const CardBox = styled("Box")({
  display: "flex",
  padding: 20,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 12,
  justifyContent: "center",
});

const Input = styled(TextField)({
  backgroundColor: "rgba(256,256,256,0.1)",
  border: "none",
  width : '100%'
});

export default function Tradecard() {
  return (
    <CardBox>
      <Grid container spacing={2}>
        <Grid item xs={12}>

          <Input id="outlined-basic"  label="Name"/>

        </Grid>
        <Grid item xs={12}>
          <Input id="outlined-basic"   label="Name"/>
        </Grid>
      </Grid>
    </CardBox>
  );
}
