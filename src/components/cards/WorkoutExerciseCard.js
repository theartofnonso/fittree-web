/* eslint-disable */
import React from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {Box, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import {timeOrReps} from "../../utils/workout/workoutsHelperFunctions";

const WorkoutExerciseCard = props => {

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    /**
     * Helper function to display appropriate RepsOrTimeValue
     * @returns {number|*}
     */
    const displayRepsOrTime = () => {
        let exerciseInfo;
        if (props.workoutExercise.repsOrTime === workoutsConstants.exerciseInfo.TIME) {
            exerciseInfo = props.workoutExercise.repsOrTimeValue / 1000 + " " + timeOrReps(props.workoutExercise.repsOrTime);
        } else {
            exerciseInfo = props.workoutExercise.repsOrTimeValue + " " + timeOrReps(props.workoutExercise.repsOrTime);
        }
        return exerciseInfo
    };

    /**
     * Only load workout exercise information when available
     */
    if (!props.workoutExercise.exercise) {
        return <Box/>
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginY: 2,
        }}>
            <Box>
                <video style={{ width: '50px', height: '50px' }}>
                    <source src="https://d26u7w064jxl38.cloudfront.net/public/Videos/0OStcywbRTXI50hdM88Z5X2nf6MIic87aqMKoY257OBD5CJN56.mp4"/>
                </video>
            </Box>
            {/*<Video*/}
            {/*    sx={styles.videoStyle}*/}
            {/*    source={{*/}
            {/*        uri: "https://" + props.workoutExercise.exercise.videoUrls[0],*/}
            {/*    }}*/}
            {/*    resizeMode="contain"*/}
            {/*    shouldPlay={true}*/}
            {/*/>*/}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                flex: 1,
            }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                        fontSize: 12
                    }}>{props.workoutExercise.exercise.title}</Typography>
                    {props.type === workoutsConstants.workoutType.CIRCUIT ?
                        <Typography variant="body2" sx={{
                            fontFamily: 'Montserrat',
                            fontWeight: 300,
                            fontSize: 12
                        }}>{displayRepsOrTime()}</Typography> :
                        <Typography variant="body2" sx={{
                            fontFamily: 'Montserrat',
                            fontWeight: 300,
                            fontSize: 12
                        }}>{`${displayRepsOrTime()} x ${props.workoutExercise.sets} Set(s)`}</Typography>
                    }
                </ThemeProvider>
            </Box>
        </Box>
    );
};

export default WorkoutExerciseCard;
