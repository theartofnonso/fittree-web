/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";
import {Box, Container, createTheme, responsiveFontSizes, ThemeProvider, Typography,} from "@mui/material";
import ReactPlayer from "react-player";
import CloseSvg from "../../icons/CloseSvg";
import InformationSvg from "../../icons/InformationSvg";
import PauseSvg from "../../icons/PauseSvg";
import PauseModal from "./PauseModal";

const PlayWorkout = props => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    const [showExercise, setShowExercise] = useState(false)

    const [startTime, setStartTime] = useState(0)

    useEffect(() => {
        const currentTime = Date.now();
        setStartTime(currentTime)
    }, [])

    /**
     * Display Reps or Time value
     * @returns {string}
     */
    const getRepsOrTimeValue = () => {
        let repsOrTimeValue = props.workoutExercise.repsOrTimeValue;
        if (props.workoutExercise.repsOrTime === workoutsConstants.exerciseInfo.TIME) {
            repsOrTimeValue = props.extraData.exerciseDuration / 1000;
        }
        return repsOrTimeValue + " " + timeOrReps(props.workoutExercise.repsOrTime);
    };

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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginY: 1
            }}>
                <Box onClick={props.close}>
                    <CloseSvg/>
                </Box>
                <Box><InformationSvg/></Box>
            </Box>
            <ReactPlayer
                url={"https://" + props.workoutExercise.exercise.videoUrls[0]}
                style={{
                    borderRadius: 5,
                    marginRight: 10,
                    backgroundColor: '#282828',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: 10
                }}
                height={400}
                width='100%'
                loop={true}
                playing={true}
                playsinline={true}
            />
            <Box sx={{
                overflow: 'scroll',
            }}>
                {!props.isPaused ?
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 20,
                    }}>
                        <Box onClick={props.seekBackward}>
                            <Typography variant="body1"
                                        sx={{fontFamily: 'Montserrat', fontWeight: 500}}>Prev</Typography>
                        </Box>
                        <Box sx={{
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            marginX: 1,
                        }} onClick={props.pause}>
                            <PauseSvg/>
                        </Box>
                        <Box onClick={props.seekForward}>
                            <Typography variant="body1"
                                        sx={{fontFamily: 'Montserrat', fontWeight: 500}}>Next</Typography>
                        </Box>
                    </Box> : null}
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="h6" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 500
                    }}>{props.workoutExercise.exercise.title}</Typography>
                    <Typography variant="body1" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300
                    }}>{getRepsOrTimeValue()}</Typography>
                    <Typography variant="body1" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300
                    }}>{props.extraData.exerciseExtras}</Typography>
                </ThemeProvider>
            </Box>
            {props.isPaused ?
                <PauseModal
                    isVisible={props.isPaused}
                    close={props.close}
                    play={props.play}
                /> : null}
        </Container>
    );
};

export default PlayWorkout;
