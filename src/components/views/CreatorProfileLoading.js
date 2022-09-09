/* eslint-disable */
import React from "react";
import FittrIcon from "../svg/fittr_symbol.svg";
import {Container} from "@mui/material";

const CreatorProfileLoading = () => {

    return (
        <Container maxWidth="lg"
                   sx={{
                       height: '100vh',
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}>
            <FittrIcon/>
        </Container>
    );
};

export default CreatorProfileLoading;
