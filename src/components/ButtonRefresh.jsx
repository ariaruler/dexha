import * as React from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { useContext } from "react";
import { UserContext } from "../App";
import { Box, Button, CircularProgress } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useState } from 'react';

export default function ButtonRefresh() {

    const [progress, setProgress] = useState(0);


    useLayoutEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 2000);
        return () => {
          clearInterval(timer);
        };
      }, []);

    const {
        flow,
        selectedCC,
        fetchAmount,
        fromAmount,

      } = useContext(UserContext);

    return (
        <Button
        onClick={() => {
          fetchAmount(
            fromAmount,
            selectedCC.currencies[0],
            selectedCC.currencies[1],
            selectedCC.network[0],
            selectedCC.network[1],
            flow
          );
        }}
        color="common"
        sx={{ minWidth: 0 }}
      >
        {/* <SettingsIcon /> */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress size={32} variant="determinate" value={progress} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RefreshIcon />
          </Box>
        </Box>
      </Button>
    );
}