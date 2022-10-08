/* eslint-disable */
import React from "react";
import {FACEBOOK, INSTAGRAM, TIKTOK, TWITTER, YOUTUBE} from "../../utils/utilsConstants";
import InstagramIcon from "../svg/instagram-line.svg";
import FacebookIcon from "../svg/facebook-circle-line.svg";
import TwitterIcon from "../svg/twitter-line.svg";
import TikTokIcon from "../svg/tiktok-line.svg";
import YoutubeIcon from "../svg/youtube-line.svg";

const Socials = ({profile}) => {

    return (
        <div className="flex flex-row justify-center my-2">
            {profile.instagram ?
                <a rel="noreferrer" href={INSTAGRAM + profile.instagram} target="_blank" className="mx-2">
                    <InstagramIcon/></a> : null}

            {profile.facebook ?
                <a rel="noreferrer" href={FACEBOOK + profile.facebook} target="_blank" className="mx-2">
                    <FacebookIcon/></a> : null}

            {profile.twitter ?
                <a rel="noreferrer" href={TWITTER + profile.twitter} target="_blank" className="mx-2">
                    <TwitterIcon/></a> : null}

            {profile.tiktok ?
                <a rel="noreferrer" href={TIKTOK + profile.tiktok} target="_blank" className="mx-1">
                    <TikTokIcon/></a> : null}

            {profile.youtube ?
                <a rel="noreferrer" href={YOUTUBE + profile.youtube} target="_blank" className="mx-2">
                    <YoutubeIcon/></a> : null}
        </div>
    );
};

export default Socials;
