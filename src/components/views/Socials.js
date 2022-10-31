/* eslint-disable */
import React from "react";
import {FACEBOOK, INSTAGRAM, TIKTOK, TWITTER, YOUTUBE} from "../../utils/utilsConstants";
import InstagramIcon from "../svg/instagram-primary-line.svg";
import FacebookIcon from "../svg/facebook-circle-primary-line.svg";
import TwitterIcon from "../svg/twitter-primary-line.svg";
import TikTokIcon from "../svg/tiktok-primary-line.svg";
import YoutubeIcon from "../svg/youtube-primary-line.svg";
import Link from "next/link";

const Socials = ({profile}) => {

    return (
        <div className="flex flex-row justify-center my-2">
            {profile.instagram ?
                <Link href={INSTAGRAM + profile.instagram} target="_blank" className="mx-2">
                    <InstagramIcon/></Link> : null}

            {profile.facebook ?
                <Link href={FACEBOOK + profile.facebook} target="_blank" className="mx-2">
                    <FacebookIcon/></Link> : null}

            {profile.twitter ?
                <Link href={TWITTER + profile.twitter} target="_blank" className="mx-2">
                    <TwitterIcon/></Link> : null}

            {profile.tiktok ?
                <Link href={TIKTOK + profile.tiktok} target="_blank" className="mx-1">
                    <TikTokIcon/></Link> : null}

            {profile.youtube ?
                <Link href={YOUTUBE + profile.youtube} target="_blank" className="mx-2">
                    <YoutubeIcon/></Link> : null}
        </div>
    );
};

export default Socials;
