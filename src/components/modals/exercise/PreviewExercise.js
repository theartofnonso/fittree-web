/* eslint-disable */
import React from "react";
import {Box, Container, createTheme, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";

const PreviewExercise = ({exercise, close}) => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    return (
        <Container maxWidth="sm" sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'white',
            overflow: 'scroll',
        }}>
            <CloseIcon onClick={close} sx={{marginY: 1}}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                overflow: 'scroll',
                marginBottom: 3
            }}>
                {exercise.videoUrls.map((url, index) => {
                    return (
                        <ReactPlayer
                            key={index}
                            url={"https://" + url}
                            style={{
                                flex: '0 0 25em',
                                borderRadius: 5,
                                marginRight: 5,
                                backgroundColor: '#282828',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                            width='100%'
                            loop={true}
                            playing={true}
                            playsinline={true}
                        />
                    );
                })}
            </Box>

            <Box>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="h6" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                    }}>{exercise.title}</Typography>
                </ThemeProvider>
            </Box>
            <Box sx={{marginY: 2,}}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body2" sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 400,
                        whiteSpace: 'pre-line'
                    }}>{exercise.description}</Typography>
                </ThemeProvider>
            </Box>

            <Box sx={{marginBottom: 1}}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                    }} variant="body2">Body Parts</Typography>
                </ThemeProvider>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 2
            }}>
                {exercise.bodyParts.map((part, index) => {
                    return (
                        <Box key={index} sx={{
                            backgroundColor: "#ef7a75",
                            marginRight: 0.8,
                            marginBottom: 0.8,
                            borderRadius: 1,
                        }}>
                            <ThemeProvider theme={responsiveFontTheme}>
                                <Typography sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: 'Montserrat',
                                    fontWeight: 300,
                                    paddingX: 0.8,
                                    paddingY: 0.3,
                                }}
                                            variant="body2">{part}</Typography>
                            </ThemeProvider>
                        </Box>
                    );
                })}
            </Box>
            <Box sx={{marginBottom: 1}}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                    }} variant="body2">Equipment</Typography>
                </ThemeProvider>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginY: 1,
            }}>
                {exercise.equipments.map((equipment, index) => {
                    return (
                        <Box key={index} sx={{
                            backgroundColor: "#ef7a75",
                            marginRight: 0.8,
                            marginBottom: 0.8,
                            borderRadius: 1,
                        }}>
                            <ThemeProvider theme={responsiveFontTheme}>
                                <Typography sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: 'Montserrat',
                                    fontWeight: 300,
                                    paddingX: 0.8,
                                    paddingY: 0.3,
                                }} variant="body2">{equipment}</Typography>
                            </ThemeProvider>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
};

export default PreviewExercise;
