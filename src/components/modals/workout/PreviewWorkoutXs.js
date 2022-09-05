/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import InstagramSvg from "../../icons/InstagramSvg";

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
            <Box sx={{
                position: !isBigScreen || !isBiggerScreen ? 'fixed' : null,
                top: !isBigScreen || !isBiggerScreen ? 0 : null,
                bottom: !isBigScreen || !isBiggerScreen ? 0 : null,
                right: !isBigScreen || !isBiggerScreen ? 0 : null,
                left: !isBigScreen || !isBiggerScreen ? 0 : null,
                overflow: !isBigScreen || !isBiggerScreen ? 'scroll' : null,
                padding: !isBigScreen || !isBiggerScreen ? 1 : null,
                backgroundColor: 'white',

                width: isBigScreen || isBiggerScreen ? 200 : null,
                display: isBigScreen || isBiggerScreen ? 'flex' : null,
                gridTemplateColumns: isBigScreen ? '300px 300px' : '400px 400px',
                // gridTemplateRows: isBigScreen ? '400px' : '500px',
                margin: isBigScreen || isBiggerScreen ? 'auto' : null,
                borderRadius: isBigScreen || isBiggerScreen ? 2 : null,
            }}>
                {!isBigScreen &&
                    <Box sx={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: 1
                    }} onClick={close}>
                        <InstagramSvg/>
                    </Box>
                }
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
        </Box>
    );
};

export default PreviewWorkout;
