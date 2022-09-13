/* eslint-disable */
import React from "react";
import {Box, Container, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const WorkoutList = ({close, type, list, progress}) => {

    /**
     * Display workout list for Circuit
     * @returns {*}
     */
    const displayCircuitList = () => {
        return list.map((round, roundIndex) => {
            return (
                <Box key={roundIndex} sx={{marginY: 4}}>
                    <Typography variant='h5' sx={{
                        marginY: 1,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        color: roundIndex === progress.roundsIndex ? '#EF7A75' : 'white',
                    }}>Round {roundIndex + 1}</Typography>

                    {round.map((workoutExercise, index) => {

                        return <Typography key={index} sx={{
                            marginBottom: 1,
                            fontFamily: 'Montserrat',
                            fontSize: (index === progress.exerciseIndex && roundIndex === progress.roundsIndex) ? 25 : 18,
                            fontWeight: (index === progress.exerciseIndex && roundIndex === progress.roundsIndex) ? 700 : 400,
                            color: (index === progress.exerciseIndex && roundIndex === progress.roundsIndex) ? '#EF7A75' : 'white',
                        }}>{workoutExercise.exercise.title}</Typography>
                    })}
                </Box>
            )
        })
    }

    /**
     * Display workout list for Reps and Sets
     * @returns {*}
     */
    const displayRepsAndSetsList = () => {
        return list.map((exercise, index) => {
            return (
                <Box key={index} sx={{marginY: 4}}>
                    <Typography variant='h5' sx={{
                        marginY: 1,
                        fontFamily: 'Montserrat',
                        fontSize: index === progress.exerciseIndex ? 25 : 18,
                        fontWeight: index === progress.exerciseIndex ? 700 : 400,
                        color: index === progress.exerciseIndex ? '#EF7A75' : 'white',
                    }}>{exercise[0].exercise.title}</Typography>
                </Box>
            )
        })
    }

    return (
        <Container maxWidth="xl" sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            overflowY: 'scroll',
            backgroundColor: 'rgba(0,0,0,0.9)',
            paddingTop: 2,
            zIndex: 100,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginY: 1
            }}>
                <CloseIcon onClick={close} sx={{cursor: 'pointer', color: 'white'}}/>
            </Box>
            {type === workoutsConstants.workoutType.CIRCUIT ? displayCircuitList() : displayRepsAndSetsList()}
        </Container>
    );
};

export default WorkoutList;
