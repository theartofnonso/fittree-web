/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";
import {
    Box,
    Container,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ReactPlayer from "react-player";
import PauseModal from "./PauseModal";
import PauseIcon from '@mui/icons-material/Pause';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IntervalModal from "./IntervalModal";
import WorkoutCompletedModal from "./WorkoutCompletedModal";
import PreviewExercise from "../exercise/PreviewExercise";
import ErrorModal from "./ErrorModal";
import WorkoutList from "../../views/WorkoutList";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";

const PlayWorkout = props => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [showExercise, setShowExercise] = useState(false)

    const [startTime, setStartTime] = useState(0)

    const [isError, setIsError] = useState(false);

    const [showWorkoutList, setShowWorkoutList] = useState(false)

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

    /**
     * Preview exercise information
     */
    const previewExercise = () => {
        props.previewExercise()
        setShowExercise(true)
    }

    /**
     * Display Workout list
     */
    const toggleWorkoutList = () => {
        props.pause()
        setShowWorkoutList(true)
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
            zIndex: 1
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginY: 1
            }}>
                <CloseIcon onClick={props.close} sx={{cursor: 'pointer'}}/>
                <Box>
                    <InfoOutlinedIcon onClick={previewExercise} sx={{cursor: 'pointer', marginLeft: 1.5}}/>
                    <ViewStreamIcon onClick={toggleWorkoutList} sx={{cursor: 'pointer', marginLeft: 1.5}}/>
                </Box>

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
                onError={() => {
                    setIsError(true)
                    props.pause()
                }}
            />
            <Box sx={{
                overflowY: 'scroll',
            }}>
                {!props.isPaused ?
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginY: 3,
                    }}>
                        <Box onClick={props.seekBackward} sx={{cursor: 'pointer'}}>
                            <Typography variant="body1"
                                        sx={{fontFamily: 'Montserrat', fontWeight: 500}}>Prev</Typography>
                        </Box>
                        <Box sx={{marginX: 2, cursor: 'pointer'}}>
                            <PauseIcon sx={{fontSize: 24}} onClick={props.pause}/>
                        </Box>
                        <Box onClick={props.seekForward} sx={{cursor: 'pointer'}}>
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
            <Box sx={{
                position: isBigScreen ? 'absolute' : null,
                right: isBigScreen ? 0 : null,
                bottom: 0,
                marginRight: isBigScreen ? 6 : null,
                marginBottom: isBigScreen ? 2 : null,
                marginTop: !isBigScreen ? 4 : null,
            }}>
                {props.nextWorkoutExercise ?
                    <Box>
                        <Typography variant="body1" sx={{
                            fontFamily: 'Montserrat',
                            fontWeight: 500,
                            marginBottom: 0.5
                        }}>Up Next:</Typography>
                        <WorkoutExerciseCard workoutExercise={props.nextWorkoutExercise} type={props.type}/>
                    </Box>: null}
            </Box>
            {showWorkoutList ?
                <WorkoutList
                    type={props.type}
                    close={() => setShowWorkoutList(false)}
                    list={props.data} progress={props.progress}/> : null}
            {props.isPaused ?
                <PauseModal
                    isVisible={props.isPaused}
                    navigateToWorkoutPreview={props.close}
                    play={props.play}
                /> : null}
            {isError ?
                <ErrorModal
                    isVisible={props.isError}
                    navigateToWorkoutPreview={props.close}
                /> : null}
            {props.shouldPlayInterval ?
                <IntervalModal
                    description={props.interval.description}
                    intervalTime={props.interval.duration}
                    navigateToWorkoutPreview={props.close}
                    onFinish={props.onFinishInterval}/> : null}
            {showExercise ?
                <PreviewExercise
                    exercise={props.workoutExercise.exercise}
                    close={() => setShowExercise(false)}/> : null}
            {props.onEnd ?
                <WorkoutCompletedModal
                    isVisible={props.onEnd}
                    startTime={startTime}
                    navigateToWorkoutPreview={props.close}/> : null}
        </Container>
    );
};

export default PlayWorkout;
