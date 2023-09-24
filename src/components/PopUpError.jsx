import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Alert,
    //  Box, CircularProgress, Stack
   } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Warning } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


export default function PopUpError(props) {
  const theme = useTheme();

  const Dialogstyle = {
    left: '-18px',
    right: '-18px',
    "& .MuiDialog-paper": {
      maxWidth: 400,
      maxHeight: 556,
      backgroundColor: theme.palette.background.default,
      backgroundImage: "none",
      borderRadius: props.borderRadius,
    },
    "& .MuiPaper-root": { backgroundColor: theme.palette.background.default },
  };

  const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  // console.error(props.id);
  // console.error(props.open);

  // useEffect(() => {
  //   handleClose()

  // }, [props.data]);

  return (
    <Dialog
      id={props.id}
      maxWidth="xs"
      sx={Dialogstyle}
      fullWidth={true}
      onClose={handleClose}
      open={props.open === props.id}
    >
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <Alert

          sx={{ alignItems: "flex-start", gap: "1rem",borderRadius : 'none' ,'.MuiAlert-icon' : { display : 'none'} }}
        >

              <Warning />

          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">آیا میخواهید پنجره را ببندید</Typography>
            <Typography level="body-md">
              در صورت بستن پنجره عملایات متوقف نخواهد شد
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button onClick={props.onClose} variant="solid" size="sm">
                باشه
              </Button>
              <Button onClick={props.handleClose} variant="outlined" size="sm">
                در هر صورت پنجره را ببند
              </Button>
            </Box>
          </Box>
        </Alert>
      </Stack>
    </Dialog>
  );
}
