/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import InstagramSvg from "../../icons/InstagramSvg";
import PreviewWorkoutMd from "./PreviewWorkoutMd";

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
            {isBigScreen &&
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    margin: 5
                }} onClick={close}>
                    <InstagramSvg/>
                </Box>
            }
            <PreviewWorkoutMd workout={workout}
                              play={play}
                              close={close}/>
        </Box>
    );
};

export default PreviewWorkout;
