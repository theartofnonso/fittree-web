/* eslint-disable */
import React from "react";
import Favicon from "../illustrations/Favicon";
import {Container} from "@mui/material";

const CreatorProfileLoading = () => {

    return (
        <Container maxWidth="md"
                   sx={{
                       height: '100vh',
                       display: 'flex',
                       padding: 2,
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}>
            <Favicon/>
        </Container>
    );
};

export default CreatorProfileLoading;
