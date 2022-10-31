/* eslint-disable */
import React from "react";
import FittrIcon from "/src/components/svg/fittr_small.svg";
import Link from "next/link";

const CreatorProfile404 = ({username}) => {

    return (
        <div className="flex flex-col items-center justify-center fixed top-0 right-0 bottom-0 left-0 h-full w-screen">
            <p>
                We can't find
                <Link href="/">
                    <a className="text-primary font-semibold">Fittree.io/{username}</a>
                </Link>,
                claim it now
            </p>
            <Link href="/">
                <a className="absolute bottom-0 mb-10">
                    <FittrIcon/>
                </a>
            </Link>
        </div>
    );
};

export default CreatorProfile404;
