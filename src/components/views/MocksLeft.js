import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import React from 'react';

const MocksLeft = (props) => {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const imageLoader = ({src, width, height, quality}) => {
        return `https://${src}`
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: isBigScreen ? 'row' : 'column',
            justifyContent: isBigScreen ? 'space-evenly' : 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: isBigScreen ? -150 : null,
        }}>
            <Box>
                <Typography variant='h4'
                            sx={{
                                textAlign: isBigScreen ? 'left' : 'center',
                                fontWeight: '700',
                                fontSize: !isBigScreen ? 25 : null,
                                fontFamily: 'Montserrat'}}>
                    Create 5 secs
                </Typography>
                <Typography variant='h4'
                            sx={{
                                textAlign: isBigScreen ? 'left' : 'center',
                                fontWeight: '700',
                                fontSize: !isBigScreen ? 25 : null,
                                fontFamily: 'Montserrat',
                                marginBottom: 1,}}>
                    exercise videos
                </Typography>
                <Typography variant='body1'
                            sx={{
                                my: 0.5,
                                textAlign: isBigScreen ? 'left' : 'center',
                                fontWeight: '400',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 14 : null,
                            }}>
                    Shoot 5 seconds videos
                </Typography>
                <Typography variant='body1'
                            sx={{
                                my: 0.5,
                                textAlign: isBigScreen ? 'left' : 'center',
                                fontWeight: '400',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 14 : null,
                            }}>
                    to demonstrate an exercise
                </Typography>
            </Box>
            <Box sx={{
                height: 700,
                width: 300,
            }}>
                <Image
                    loader={imageLoader}
                    src={props.url}
                    width={300}
                    height={600}
                    objectFit={'contain'}
                    placeholder={'blur'}
                    blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAQAAADFUcJQAAAAFUlEQVR42mPU+M84ikbRKBpFQwEBAJqFzpCmC66fAAAAAElFTkSuQmCC'}
                />
            </Box>
        </Box>
    )
}

export default MocksLeft
