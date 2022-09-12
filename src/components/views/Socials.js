/* eslint-disable */
import React from "react";
import {Box, Link} from "@mui/material";
import {FACEBOOK, INSTAGRAM, TIKTOK, TWITTER, YOUTUBE} from "../../utils/workout/utilsConstants";
import TikTokIcon from "../svg/tiktok-line.svg";
import TwitterIcon from "../svg/twitter-line.svg";
import InstagramIcon from "../svg/instagram-line.svg";
import FacebookIcon from "../svg/facebook-circle-line.svg";
import YoutubeIcon from "../svg/youtube-line.svg";

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
                        <InstagramIcon/>
                    </Link>
                </Box> : null}
            {profile.facebook ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={FACEBOOK + profile.facebook} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <FacebookIcon />
                    </Link>
                </Box> : null}
            {profile.twitter ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={TWITTER + profile.twitter} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <TwitterIcon/>
                    </Link>
                </Box> : null}
            {profile.tiktok ?
                <Box sx={{marginX: 0.6}}>
                    <Link target="_blank" href={TIKTOK + profile.tiktok} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <TikTokIcon/>
                    </Link>
                </Box> : null}
            {profile.youtube ?
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={YOUTUBE + profile.youtube} sx={{textDecoration: 'none'}}
                          rel="noopener">
                        <YoutubeIcon/>
                    </Link>
                </Box> : null}
        </Box>
    );
};

export default Socials;
