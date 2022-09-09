/* eslint-disable */
import React from "react";
import FittrIcon from "../svg/fittr_symbol.svg";
import FittrIconSmall from "../svg/fittr_symbol_small.svg";
import {Container, useMediaQuery, useTheme} from "@mui/material";

const CreatorProfileLoading = () => {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Container maxWidth="xl"
                   sx={{
                       height: '100vh',
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}>
            {isBigScreen ? <FittrIcon/> : <FittrIconSmall/> }

        </Container>
    );
};

export default CreatorProfileLoading;
