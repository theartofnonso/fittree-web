/* eslint-disable */
import React from "react";
import {Box, Link} from "@mui/material";
import {INSTAGRAM, TIKTOK, TWITTER, YOUTUBE} from "../../utils/workout/utilsConstants";
import TikTokSvg from "../icons/TikTokSvg";
import TwitterSvg from "../icons/TwitterSvg";
import InstagramSvg from "../icons/InstagramSvg";
import FacebookSvg from "../icons/FacebookSvg";
import YoutubeSvg from "../icons/YoutubeSvg";

const Socials = ({profile}) => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            my: 3
        }}>
            {profile.instagram ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={INSTAGRAM + profile.instagram} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <InstagramSvg/>
                    </Link>
                </Box> : null}
            {profile.facebook ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={INSTAGRAM + profile.facebook} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <FacebookSvg />
                    </Link>
                </Box> : null}
            {profile.twitter ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={TWITTER + profile.twitter} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <TwitterSvg/>
                    </Link>
                </Box> : null}
            {profile.tiktok ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={TIKTOK + profile.tiktok} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <TikTokSvg/>
                    </Link>
                </Box> : null}
            {profile.youtube ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={YOUTUBE + profile.youtube} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <YoutubeSvg/>
                    </Link>
                </Box> : null}
        </Box>
    );
};

export default Socials;
