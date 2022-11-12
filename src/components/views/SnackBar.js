/* eslint-disable */
import React, {useEffect} from "react";
import CloseIcon from "../svg/close-line-white.svg";
import CheckIcon from "../svg/check-green-24.svg";
import WarningIcon from "../svg/error-warning-line.svg";
import InfoIcon from "../svg/information-white-line.svg";

const SnackBarType =  {
    ERROR: "Error",
    WARN: "Warning",
    INFO:"Info",
    SUCCESS:"Success"
}

const SnackBar = (props) => {

    /**
     * Hide Snackbar
     */
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                props.close(true)
            }, 5000)
        }
    }, [props.open])

    if(!props.open) {
        return null;
    }

    if(props.type === SnackBarType.INFO) {
        return (
            <div
                className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-blue w-1/2 sm:w-2/5">
                <InfoIcon/>
                <p className="ml-2 text-white font-normal text-sm">{props.message}</p>
            </div>
        );
    } else if(props.type === SnackBarType.SUCCESS) {
        return (
            <div
                className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-lightGreen w-1/2 sm:w-2/5">
                <CheckIcon/>
                <p className="ml-2 text-midnightGreen font-normal text-sm">{props.message}</p>
            </div>
        );
    } else if(props.type === SnackBarType.WARN) {
        return (
            <div
                className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-yellow w-1/2 sm:w-2/5">
                <WarningIcon/>
                <p className="ml-2 font-normal text-sm">{props.message}</p>
            </div>
        );
    } else {
        return (
            <div
                className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-red w-1/2 sm:w-2/5">
                <CloseIcon/>
                <p className="ml-2 text-white font-normal text-sm">{props.message}</p>
            </div>
        );
    }
};

export {SnackBar, SnackBarType}
