import React from 'react';
import workoutsConstants from '../../utils/workout/workoutsConstants';
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import TimerTag from "../Tags/TimerTag";

const WorkoutCardBig = props => {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    const imageLoader = ({src, width, height, quality}) => {
        return `https://${src}`
    }

    return (
        <Box sx={{
            height: isBigScreen ? '100%' : 400,
            overflow: 'hidden',
            borderTopLeftRadius: isBigScreen ? 8 : null,
            borderBottomLeftRadius: isBigScreen ? 8 : null,
            borderRadius: !isBigScreen ? 8 : null,
        }}>
            <Image
                loader={imageLoader}
                src={props.workout.thumbnailUrl}
                layout='fill'
            />
            <Box sx={{
                display: 'flex',
                position: 'absolute',
                left: 10,
                bottom: 10,
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="h6" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 500}}>{props.workout.title}</Typography>
                    <Typography variant="body2" color='#ffffff' sx={{fontFamily: 'Montserrat', fontSize: 11, my: 0.3,}}>
                        {props.workout.intensityLevel}{' '}
                        {props.workout.type === workoutsConstants.workoutType.CIRCUIT ? `| ${props.workout.rounds} Round(s)` : null}
                    </Typography>
                </ThemeProvider>
                {/*<Box sx={styles.scrollViewContainer}>*/}
                    {/*<ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
                    {/*    {props.workout.equipments.map((equipment, index) => {*/}
                    {/*        return (*/}
                    {/*            <Box key={index}>*/}
                    {/*                <ThemeProvider theme={responsiveFontTheme}>*/}
                    {/*                    <Typography*/}
                    {/*                        variant="body2"*/}
                    {/*                        color='#ffffff'*/}
                    {/*                        sx={{*/}
                    {/*                            fontSize: 12,*/}
                    {/*                            marginRight: 0.5,*/}
                    {/*                            my: 0.3,*/}
                    {/*                            fontFamily: 'Montserrat',*/}
                    {/*                            fontWeight: 300,*/}
                    {/*                        }}>{equipment}</Typography>*/}
                    {/*                </ThemeProvider>*/}
                    {/*            </Box>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</ScrollView>*/}
                {/*</Box>*/}
                {/*<Box sx={styles.scrollViewContainer}>*/}
                    {/*<ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
                    {/*    {props.workout.bodyParts.map((bodyPart, index) => {*/}
                    {/*        return (*/}
                    {/*            <Box key={index}>*/}
                    {/*                <ThemeProvider theme={responsiveFontTheme}>*/}
                    {/*                    <Typography*/}
                    {/*                        variant="body2"*/}
                    {/*                        color='#ffffff'*/}
                    {/*                        sx={{*/}
                    {/*                            fontSize: 12,*/}
                    {/*                            marginRight: 0.5,*/}
                    {/*                            my: 0.3,*/}
                    {/*                            fontFamily: 'Montserrat',*/}
                    {/*                            fontWeight: 300,*/}
                    {/*                        }}>{bodyPart}</Typography>*/}
                    {/*                </ThemeProvider>*/}
                    {/*            </Box>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</ScrollView>*/}
                {/*</Box>*/}
            </Box>
            <TimerTag duration={props.workout.duration}/>
        </Box>
    );
};

export default WorkoutCardBig;
