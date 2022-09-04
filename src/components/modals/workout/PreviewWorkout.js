/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, createTheme, responsiveFontSizes, useMediaQuery, useTheme} from "@mui/material";

const PreviewWorkout = ({workout, play, close}) => {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const isBiggerScreen = useMediaQuery(theme.breakpoints.up('md'));

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    const [currentExercise, setCurrentExercise] = useState(null)

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        play()
    };

    /**
     * Preview exercise information
     */
    const playExercise = (exercise) => {
        setCurrentExercise(exercise)
    }

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
            <Box sx={{height: '100vh'}}>
                {isBigScreen &&
                    <Box sx={{
                        position: 'fixed',
                        top: 10,
                        right: 10
                    }} onClick={close}>
                        {/*<Entypo name="cross" size={32} color="white"/>*/}
                    </Box>
                }
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    overflow: 'scroll',
                    backgroundColor: 'white',
                    padding: 8,
                }}>
                    <WorkoutCardBig workout={workout}/>
                </Box>
            </Box>
        </Box>
    );
};

export default PreviewWorkout;
