import * as React from 'react';
import Typography from '@mui/material/Typography';
import {motion } from 'framer-motion'

export default function LandingPage() {
    return (
        <motion.div
        initial={{opacity : 0 , width : 0}}
        animate={{opacity : 1 , width : '100%'}}
        exit={{opacity : 0, width : 0}}
        >
        <Typography variant="h1" gutterBottom>
            LandingPage
        </Typography>
        </motion.div>
    );
}