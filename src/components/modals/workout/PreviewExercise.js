/* eslint-disable */
import React from "react";
import {Container, createTheme, responsiveFontSizes} from "@mui/material";
import ReactPlayer from "react-player";

const PreviewExercise = ({exercise, close}) => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);


    // return (
    //     <Container maxWidth="md" sx={{}}>
    //         <ReactPlayer
    //             url={"https://" + exercise.videoUrls[0]}
    //             style={{
    //                 borderRadius: 5,
    //                 marginRight: 10,
    //                 backgroundColor: '#282828',
    //                 overflow: 'hidden',
    //                 position:'relative'
    //             }}
    //             height={60}
    //             width={60}
    //         />
    //     </Container>
    // );
};

export default PreviewExercise;
