/* eslint-disable */
import React from "react";
import {Box, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PauseModal = props => {

    return (
        <Box sx={{
            position: 'fixed',
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
                <PlayArrowIcon sx={{fontSize: 40, color: 'white', cursor: 'pointer'}} onClick={props.play}/>
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
                        display: 'flex',
                        cursor: 'pointer'
                    }}
                    onClick={props.navigateToWorkoutPreview}>
                    <Typography sx={{color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                        End Workout
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default PauseModal;
