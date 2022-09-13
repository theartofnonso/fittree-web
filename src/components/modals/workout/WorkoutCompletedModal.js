import React from 'react';
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import CheckIcon from '../../svg/check.svg'

const WorkoutCompletedModal = props => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    /**
     * calculate workout duration
     * @returns {string}
     */
    const calculateWorkoutDuration = () => {
        const startTime = props.startTime;
        const endTime = Date.now();
        const difference = (endTime - startTime) / 1000
        return toReadableTime(difference)
    };

    /**
     * Convert date to readable format
     * @param difference
     * @returns {string}
     */
    const toReadableTime = (difference) => {
        /* extend the String by using prototypical inheritance */
        let seconds = parseInt(difference, 10); // don't forget the second param
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);
        seconds = seconds - (hours * 3600) - (minutes * 60);

        return minutes > 1 ? minutes + ' min(s)' : ' less than a min';
    }

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white',
            cursor: 'pointer',
            zIndex: 1
        }}>
            <CheckIcon/>
            <Box sx={{
                marginY: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="h6" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 700
                    }}> Workout Completed</Typography>
                    <Typography variant="body1" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 400,
                        my: 1
                    }}> It took you {calculateWorkoutDuration()}</Typography>
                </ThemeProvider>
            </Box>
            <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: '#ef7a75',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: 200,
                    height: 40,
                    position: 'absolute',
                    bottom: 50,
                    display: 'flex'
                }}
                onClick={props.navigateToWorkoutPreview}>
                <Typography sx={{color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                    Close Workout
                </Typography>
            </Box>
        </Box>
    );
};

export default WorkoutCompletedModal;
