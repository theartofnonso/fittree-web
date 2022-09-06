import React from 'react';
import workoutsConstants from '../../utils/workout/workoutsConstants';
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import TimerTag from "../Tags/TimerTag";

const WorkoutCardBig = props => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    const imageLoader = ({src, width, height, quality}) => {
        return `https://${src}`
    }

    return (
        <Box sx={{
            height: 400,
            overflow: 'hidden',
            borderRadius: 2,
            position: 'relative',
        }}>
            <Image
                loader={imageLoader}
                src={props.workout.thumbnailUrl}
                layout='fill'
                objectFit={'cover'}
                placeholder={'blur'}
                blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAQAAADFUcJQAAAAFUlEQVR42mPU+M84ikbRKBpFQwEBAJqFzpCmC66fAAAAAElFTkSuQmCC'}
            />
            <Box sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, #000000)',
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
                margin: 1
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="h6" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 500}}>{props.workout.title}</Typography>
                    <Typography variant="body2" color='#ffffff' sx={{fontFamily: 'Montserrat', fontSize: 11, my: 0.3,}}>
                        {props.workout.intensityLevel}{' '}
                        {props.workout.type === workoutsConstants.workoutType.CIRCUIT ? `| ${props.workout.rounds} Round(s)` : null}
                    </Typography>
                </ThemeProvider>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {props.workout.equipments.map((equipment, index) => {
                        return (
                            <Box key={index}>
                                <ThemeProvider theme={responsiveFontTheme}>
                                    <Typography
                                        variant="body2"
                                        color='#ffffff'
                                        sx={{
                                            fontSize: 12,
                                            marginRight: 0.5,
                                            my: 0.3,
                                            fontFamily: 'Montserrat',
                                            fontWeight: 300,
                                        }}>{equipment}</Typography>
                                </ThemeProvider>
                            </Box>
                        );
                    })}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {props.workout.bodyParts.map((equipment, index) => {
                        return (
                            <Box key={index}>
                                <ThemeProvider theme={responsiveFontTheme}>
                                    <Typography
                                        variant="body2"
                                        color='#ffffff'
                                        sx={{
                                            fontSize: 12,
                                            marginRight: 0.5,
                                            my: 0.3,
                                            fontFamily: 'Montserrat',
                                            fontWeight: 300,
                                        }}>{equipment}</Typography>
                                </ThemeProvider>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <TimerTag duration={props.workout.duration}/>
        </Box>
    );
};

export default WorkoutCardBig;
