/* eslint-disable */
import React from "react";
import {FACEBOOK, INSTAGRAM, TIKTOK, TWITTER, YOUTUBE} from "../../utils/utilsConstants";
import InstagramIcon from "../../assets/svg/instagram-primary-line.svg";
import FacebookIcon from "../../assets/svg/facebook-circle-primary-line.svg";
import TwitterIcon from "../../assets/svg/twitter-primary-line.svg";
import TikTokIcon from "../../assets/svg/tiktok-primary-line.svg";
import YoutubeIcon from "../../assets/svg/youtube-primary-line.svg";
import Link from "next/link";

const Socials = ({profile}) => {

    return (
        <div className="flex flex-row justify-center my-2">
            {profile.instagram ?
                <Link href={INSTAGRAM + profile.instagram}>
                    <a className="mx-2" target="_blank">
                        <InstagramIcon/>
                    </a>
                </Link> : null}

            {profile.facebook ?
                <Link href={FACEBOOK + profile.facebook}>
                    <a className="mx-2" target="_blank">
                        <FacebookIcon/>
                    </a>
                </Link> : null}

            {profile.twitter ?
                <Link href={TWITTER + profile.twitter}>
                    <a className="mx-2" target="_blank">
                        <TwitterIcon/>
                    </a>
                </Link> : null}

            {profile.tiktok ?
                <Link href={TIKTOK + profile.tiktok}>
                    <a className="mx-1" target="_blank">
                        <TikTokIcon/>
                    </a>
                </Link> : null}

            {profile.youtube ?
                <Link href={YOUTUBE + profile.youtube}>
                    <a className="mx-2" target="_blank">
                        <YoutubeIcon/>
                    </a>
                </Link> : null}
        </div>
    );
};

export default Socials;
