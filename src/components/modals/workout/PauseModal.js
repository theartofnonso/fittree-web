/* eslint-disable */
import React from "react";
import {Box, Typography} from "@mui/material";
import PlaySvg from "../../icons/PlaySvg";

const PauseModal = props => {

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
                <Box sx={{
               
                }} onClick={props.play}>
                    <PlaySvg/>
                </Box>
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

export default PauseModal;
