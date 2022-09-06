import React from 'react';
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import Image from "next/image";
import TimerTag from "../Tags/TimerTag";

const WorkoutCard = ({workout}) => {

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const imageLoader = ({ src, width, height, quality }) => {
        return `https://${src}`
    }

    return (
        <Box sx={{
            display: 'flex',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            height: 250,
            width: '100%'
        }}>
            <Image
                loader={imageLoader}
                src={workout.thumbnailUrl}
                layout='fill'
                objectFit={'cover'}
                placeholder={'blur'}
                blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD6CAQAAADKSeXYAAAAEUlEQVR42mPU+M84ikbRyEAAIqMhII3S3FoAAAAASUVORK5CYII='}
             />
            <Box sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(transparent, #000000)',
                position: 'absolute'
            }}></Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                position: 'absolute',
                left: 0,
                bottom: 0,
                margin: 1,
            }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h6" color='#ffffff' sx={{fontFamily: 'Montserrat', fontWeight: 500}}>{workout.title}</Typography>
                    <Typography variant="body2" color='#ffffff' sx={{fontFamily: 'Montserrat', fontWeight: 500, fontSize: 10}}>{workout.intensityLevel}</Typography>
                </ThemeProvider>
            </Box>
           <TimerTag duration={workout.duration}/>
        </Box>
    );
};

export default WorkoutCard;
