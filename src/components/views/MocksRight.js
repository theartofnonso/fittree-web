import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import React from 'react';


const MocksRight = (props) => {

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
            marginTop: -5,
        }}>
            {isBigScreen ? <Box sx={{
                height: 700,
                width: 300,
            }}>
                <Image
                    loader={imageLoader}
                    src={props.url}
                    width={300}
                    height={600}
                    objectFit={'contain'}/>
            </Box> : null}
            <Box>
                <Typography variant='h4'
                            sx={{
                                textAlign: isBigScreen ? 'right' : 'center',
                                fontWeight: '700',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 25 : null}}>
                    {props.title[0]}
                </Typography>
                <Typography variant='h4'
                            sx={{
                                textAlign: isBigScreen ? 'right' : 'center',
                                fontWeight: '700',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 25 : null,
                                marginBottom: 1}}>
                    {props.title[1]}
                </Typography>
                <Typography variant='body1'
                            sx={{
                                my: 0.5,
                                textAlign: isBigScreen ? 'right' : 'center',
                                fontWeight: '400',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 14 : null,
                            }}>
                    {props.description[0]}
                </Typography>
                <Typography variant='body1'
                            sx={{
                                my: 0.5,
                                textAlign: isBigScreen ? 'right' : 'center',
                                fontWeight: '400',
                                fontFamily: 'Montserrat',
                                fontSize: !isBigScreen ? 14 : null,
                            }}>
                    {props.description[1]}
                </Typography>
            </Box>
            {!isBigScreen ? <Box sx={{
                height: 700,
                width: 300,
            }}>
                <Image
                    loader={imageLoader}
                    src={props.url}
                    width={300}
                    height={600}
                    objectFit={'contain'}/>
            </Box> : null}
        </Box>
    )
}

export default MocksRight
