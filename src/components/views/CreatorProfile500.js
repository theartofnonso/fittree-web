/* eslint-disable */
import React from "react";
import {Box, Container, createTheme, Link, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import FittrIconBig from "../illustrations/FittrIconBig";

const CreatorProfile500 = ({username}) => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    return (
        <Container maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body1" sx={{marginTop: 5, textAlign: 'center'}}>Unable to load {username}'s page</Typography>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>at this moment</Typography>
                </ThemeProvider>

            <Box sx={{position: 'absolute', bottom: 0}}>
                <Link href='/' sx={{textDecoration: 'none'}}>
                    <FittrIconBig/>
                </Link>
            </Box>
        </Container>
    );
};

export default CreatorProfile500;
