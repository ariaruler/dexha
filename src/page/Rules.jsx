import * as React from 'react';
import Typography from '@mui/material/Typography';
import {motion } from 'framer-motion'

export default function Rules() {

    
  React.useEffect(() => {
    // post();
    console.log('pppppppppppppppppppp');
  }, []);
    return (
        <motion.div
        initial={{opacity : 0 , width : 0}}
        animate={{opacity : 1 , width : '100%'}}
        exit={{opacity : 0, width : 0}}
        >
        <Typography variant="h1" gutterBottom>
            Rules
        </Typography>
        </motion.div>
    );
}