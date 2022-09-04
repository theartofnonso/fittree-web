import {Box, Typography} from "@mui/material";
import React from 'react';

const TimerTag = ({duration}) => {
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: '#ef7a75',
            position: 'absolute',
            right: 0,
            margin: 1,
        }}>
            <Typography variant="h6" color='#ffffff' sx={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Montserrat',
                fontSize: 10,
                fontWeight: 'bold',
                paddingY: 0.2,
                paddingX: 0.5
            }}>{Math.round(duration / 60000)} mins</Typography>
        </Box>
    )
}

export default TimerTag
