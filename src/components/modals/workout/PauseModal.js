/* eslint-disable */
import React from "react";
import {Box, Container, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

const PauseModal = props => {

    return (
        <Container maxWidth="xl" sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            overflowY: 'scroll',
            zIndex: 1
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginY: 1
            }}>
                <InfoOutlinedIcon style={{color: 'white'}}
                                  onClick={props.previewExercise}
                                  sx={{cursor: 'pointer', marginLeft: 1.5}}/>
                <ViewStreamIcon style={{color: 'white'}}
                                onClick={props.toggleWorkoutList}
                                sx={{cursor: 'pointer', marginLeft: 1.5}}/>

            </Box>
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
        </Container>
    );
};

export default PauseModal;
