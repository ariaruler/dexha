import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

import Button from "@mui/material/Button";
import ButtonTrade from "./ButtonTrade";
import { iconClasses } from "@mui/material";
import ButtonChooze from "./ButtonChooze";

const CardBox = styled(Box)({
  display: "flex",
  padding: 20,
  backgroundColor: "rgba(256,256,256,0.1)",
  borderRadius: 12,
  justifyContent: "center",
});

const Input = styled(TextField)({
  backgroundColor: "rgba(256,256,256,0.1)",
  border: "none",
  width: "100%",
});

const iconCircle = {
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
};

const pages = [
  {
    content: "بهترین قیمت",
  },
  {
    content: "نرخ ثابت",
  },
  {
    content: "نرخ استاندارد",
  },
];

export default function Tradecard() {
  return (
    <CardBox>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {pages.map((page) => (
            <ButtonChooze content={page.content} />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Input id="outlined-basic" label="پرداخت" />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ChangeCircleOutlinedIcon sx={iconCircle} />
        </Grid>

        <Grid item xs={12}>
          <Input id="outlined-basic" label="دریافت" />
        </Grid>

        <Grid item xs={12}>
          <ButtonTrade
            content="تبادل"
            width="100%"
            height="56px"
            fontSize="1.3em"
          />
        </Grid>
      </Grid>
    </CardBox>
  );
}
