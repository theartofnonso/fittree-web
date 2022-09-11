/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, Container, createTheme, Fab, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import PreviewExercise from "../exercise/PreviewExercise";
import CloseIcon from "@mui/icons-material/Close";

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
        <Container maxWidth="xl" sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'white',
            overflowY: 'scroll',
            zIndex: 1,
        }}>
            <CloseIcon onClick={close} sx={{marginY: 1, cursor: 'pointer'}}/>
            <WorkoutCardBig workout={workout}/>
            <Box>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body2" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300,
                        whiteSpace: 'pre-line',
                        marginY: 2
                    }}>{workout.description}</Typography>
                </ThemeProvider>
                <Typography variant="body2" sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    whiteSpace: 'pre-line',
                    marginY: 1
                }}>{workout.workoutExercises.length} exercises</Typography>
                {workout.workoutExercises.map((workoutExercise, i) =>
                    <Box
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                background: "rgba(245,237,232,0.3)",
                                borderRadius: 2
                            }
                    }}
                        key={i}
                        onClick={() => playExercise(workoutExercise.exercise)}>
                        <WorkoutExerciseCard workoutExercise={workoutExercise} type={workout.type}/>
                    </Box>)}

            </Box>
            {!currentExercise ? <Box sx={{
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                backgroundColor: '#ef7a75',
                borderRadius: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                height: 40,
                display: 'flex',
                marginBottom: 2,
            }} onClick={playWorkout}>
                <Typography sx={{color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                    Play workout
                </Typography>
            </Box> : null }
            {currentExercise ?
                <PreviewExercise
                    exercise={currentExercise}
                    close={() => setCurrentExercise(null)}/> : null}
        </Container>
    );
};

export default PreviewWorkout;
