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
            <p className="text-xs">Wallpaper image by <a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-geometric-background_23985346.htm#from_view=detail_serie#position=0" target="_blank">Freepik</a></p>
        </div>
    );
};

export default Footer;
