/* eslint-disable */
import React from "react";
import Link from "next/link";
import FittrSmallIcon from "../../assets/svg/fittr_small.svg";
import FittrBigIcon from "../../assets/svg/fittr.svg";

const Footer = () => {

    return (
        <div className="flex flex-row justify-center items-center">
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
        </div>
    );
};

export default Footer;
