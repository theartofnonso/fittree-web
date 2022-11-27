/* eslint-disable */
import React from "react";
import Link from "next/link";
import FittrSmallIcon from "../../assets/svg/fittr_small.svg";
import FittrBigIcon from "../../assets/svg/fittr.svg";

const Footer = () => {

    return (
        <div className="flex flex-col items-center justify-center items-center my-2">
            <Link href="/">
                <a className="lg:hidden">
                    <FittrSmallIcon/>
                </a>
            </Link>
            <Link href="/">
                <a className="hidden lg:block">
                    <FittrBigIcon/>
                </a>
            </Link>
            <p className="text-xs">Wallpaper image by benzoix<a href="https://www.freepik.com/free-photo/grungy-white-background-natural-cement-stone-old-texture-as-retro-pattern-wall-conceptual-wall-banner-grunge-material-construction_20038962.htm#page=8&query=texture%20background&position=48&from_view=search&track=sph" target="_blank">Freepik</a></p>
        </div>
    );
};

export default Footer;
