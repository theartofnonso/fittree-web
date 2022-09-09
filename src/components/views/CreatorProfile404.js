/* eslint-disable */
import React from "react";
import {Box, Container, createTheme, Link, responsiveFontSizes, ThemeProvider, Typography} from "@mui/material";
import FittrIcon from "/src/components/svg/fittr.svg";

const CreatorProfile404 = ({username}) => {

    let responsiveFontTheme = createTheme();
    responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

    return (
        <Container maxWidth="xl"
                   sx={{
                       height: '100vh',
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}>
                <ThemeProvider theme={responsiveFontTheme}>
                    <Typography variant="body1" sx={{marginTop: 5}}>We can't find {username}, claim <Link href='#'
                                                                                                          color='#ef7a75'
                                                                                                          sx={{
                                                                                                              textDecoration: 'underline',
                                                                                                              fontWeight: 'bold'
                                                                                                          }}>Fittree.io/{username}</Link></Typography>
                </ThemeProvider>

            <Box sx={{position: 'absolute', bottom: 0}}>
                <Link href='/' sx={{textDecoration: 'none'}}>
                    <FittrIcon/>
                </Link>
            </Box>
        </Container>
    );
};

export default CreatorProfile404;
