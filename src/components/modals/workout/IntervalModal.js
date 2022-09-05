/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import SkipNextIcon from '@mui/icons-material/SkipNext';

const IntervalModal = props => {

    const [intervalTime, setIntervalTime] = useState(props.intervalTime);

    let intervalId = 0;

    useEffect(() => {
        intervalId = setInterval(() => {
            if (intervalTime === 0) {
                props.onFinish();
            } else {
                setIntervalTime(prevValue => prevValue - 1000);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [intervalTime]);

    /**
     * Skip the interval
     */
    const skipInterval = () => {
        props.onFinish();
        clearInterval(intervalId)
    }

    /**
     * Display messages for respective intervals
     * @returns {JSX.Element}
     */
    const displayIntervalMessage = () => {

        switch (props.description) {
            case workoutsConstants.playMessages.WORKOUT_STARTING:
                return <Box xs={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <Typography variant="body2" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 500, my: 0.5, textAlign: 'center'}}>
                        {props.description}
                    </Typography>
                    <Typography variant="body2" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 700, my: 0.5, textAlign: 'center'}}>
                        {intervalTime / 1000}s
                    </Typography>
                </Box>
            case workoutsConstants.playMessages.NEXT_ROUND:
            case workoutsConstants.playMessages.NEXT_EXERCISE:
                return <Box xs={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography variant="body2" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 500, my: 0.5, textAlign: 'center'}}>
                        {props.description}
                    </Typography>
                    <Typography variant="body2" color='#ffffff'
                                sx={{fontFamily: 'Montserrat', fontWeight: 700, my: 0.5, textAlign: 'center'}}>
                        Rest for {intervalTime / 1000}s
                    </Typography>
                </Box>
            default:
                return <Typography variant="body2" color='#ffffff'
                                   sx={{fontFamily: 'Montserrat', fontWeight: 500, my: 0.5}}>
                    Rest for {intervalTime / 1000}s
                </Typography>
        }
    }

    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
            <Box sx={{
                height: '100vh',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {displayIntervalMessage()}
                <SkipNextIcon sx={{fontSize: 40, color: 'white'}} onClick={skipInterval}/>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: '#ef7a75',
                        borderRadius: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 200,
                        height: 40,
                        position: 'absolute',
                        bottom: 50,
                        display: 'flex'
                    }}
                    onClick={props.navigateToWorkoutPreview}
                    testID="End_Workout_Btn">
                    <Typography sx={{color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                        End Workout
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default IntervalModal;
