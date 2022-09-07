/* eslint-disable */
import React from "react";
import Favicon from "../illustrations/Favicon";
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
            <Favicon/>
        </Container>
    );
};

export default CreatorProfileLoading;
