/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, Container, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import CloseSvg from "../../icons/CloseSvg";

const PreviewWorkout = ({workout, play, close}) => {

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
        <Container maxWidth="md" sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'white',
            overflow: 'scroll',
        }}>
            <Box sx={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginY: 1
            }} onClick={close}>
                <CloseSvg/>
            </Box>
            <WorkoutCardBig workout={workout}/>
            <Box sx={{
                overflow: 'scroll',
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body2" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300,
                        whiteSpace: 'pre-line',
                        marginY: 2
                    }}>{workout.description}</Typography>
                </ThemeProvider>
                {workout.workoutExercises.map((workoutExercise, i) =>
                    <Box
                        key={i}
                        onClick={() => playExercise(workoutExercise.exercise)}>
                        <WorkoutExerciseCard workoutExercise={workoutExercise} type={workout.type}/>
                    </Box>)}
            </Box>
        </Container>
    );
};

export default PreviewWorkout;
