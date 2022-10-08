/* eslint-disable */
import React from "react";
import FittrIcon from "/src/components/svg/fittr_small.svg";

const CreatorProfile404 = ({username}) => {

    return (
        <div className="flex flex-col items-center justify-center fixed top-0 right-0 bottom-0 left-0 h-full w-screen">
            <p>
                We can't find <a href="/" className="text-primary font-semibold">Fittree.io/{username}</a>, claim it now
            </p>
            <a rel="noreferrer" href="/" target="_blank" className="absolute bottom-0 mb-10">
                <FittrIcon/>
            </a>
        </div>
    );
};

export default CreatorProfile404;
