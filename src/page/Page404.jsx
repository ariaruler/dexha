import * as React from 'react';
import Typography from '@mui/material/Typography';
import {motion } from 'framer-motion'
import { Container } from '@mui/material';

export default function Page404() {
    return (
        <motion.div
        initial={{opacity : 0 , width : 0}}
        animate={{opacity : 1 , width : '100%'}}
        exit={{opacity : 0, width : 0}}
        >
      <Container maxWidth="md">
        <Typography sx={{ textAlign: "center" }} variant="h2" gutterBottom>
          صفحه مورد نظر پیدا نشد
        </Typography>
        </Container>
        </motion.div>
    );
}