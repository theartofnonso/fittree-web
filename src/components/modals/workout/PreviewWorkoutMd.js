/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";

const PreviewWorkoutMd = ({workout, play, close}) => {

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
            margin: 'auto',
            width: 300,
            backgroundColor: 'red'
        }}>
            <WorkoutCardBig workout={workout}/>
            <Box sx={{
                overflow: 'scroll',
                paddingHorizontal: isBiggerScreen ? 15 : null,
                paddingTop: 1
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body2" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300,
                        whiteSpace: 'pre-line'
                    }}>{workout.description}</Typography>
                </ThemeProvider>
                {workout.workoutExercises.map((workoutExercise, i) =>
                    <Box
                        key={i}
                        onClick={() => playExercise(workoutExercise.exercise)}>
                        <WorkoutExerciseCard workoutExercise={workoutExercise} type={workout.type}/>
                    </Box>)}
            </Box>
        </Box>
    );
};

export default PreviewWorkoutMd;
