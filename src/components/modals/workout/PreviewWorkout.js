/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, Container, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import PreviewExercise from "../exercise/PreviewExercise";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
            <CloseIcon onClick={close} sx={{marginY: 1}}/>
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
                <Box sx={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    marginRight: 4,
                    marginBottom: 4,
                    backgroundColor: '#ef7a75',
                    padding: 1,
                    borderRadius: 2
                }} onClick={playWorkout}>
                    <PlayArrowIcon sx={{fontSize: 40, color: 'white'}}  onClick={playWorkout}/>
                </Box>
            </Box>
            {currentExercise ?
                <PreviewExercise
                    exercise={currentExercise}
                    close={() => setCurrentExercise(null)}/> : null}
        </Container>
    );
};

export default PreviewWorkout;
