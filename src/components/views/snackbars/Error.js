/* eslint-disable */
import React, {useEffect} from "react";
import CloseIcon from "../../svg/close-line-white.svg";

const Error = ({message, open, close}) => {

    /**
     * Hide Snackbar
     */
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                close(true)
            }, 5000)
        }
    }, [open])

    if(!open) {
        return null;
    }


    return (
        <div
            className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-red w-1/2 sm:w-2/5">
            <CloseIcon/>
            <p className="ml-2 text-white font-normal text-sm">{message}</p>
        </div>
    );
};

export default Error;