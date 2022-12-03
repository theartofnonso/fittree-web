/* eslint-disable */
import React, {useEffect} from "react";
import CheckIcon from "../../assets/svg/check-green-24.svg";
import WarningIcon from "../../assets/svg/error-warning-line.svg";
import WarningWhiteIcon from "../../assets/svg/error-warning-white-line.svg";
import InfoIcon from "../../assets/svg/information-white-line.svg";

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
                className="z-50 fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-blue w-5/6 sm:w-2/5">
                <InfoIcon/>
                <p className="ml-2 text-white font-normal text-sm">{props.message}</p>
            </div>
        );
    } else if(props.type === SnackBarType.SUCCESS) {
        return (
            <div
                className="z-50 fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-lightGreen w-5/6 sm:w-2/5">
                <CheckIcon/>
                <p className="ml-2 text-midnightGreen font-bold text-sm">{props.message}</p>
            </div>
        );
    } else if(props.type === SnackBarType.WARN) {
        return (
            <div
                className="z-50 fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-yellow w-5/6 sm:w-2/5">
                <WarningIcon/>
                <p className="ml-2 font-normal text-sm">{props.message}</p>
            </div>
        );
    } else {
        return (
            <div
                className="z-50 fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-red w-5/6 sm:w-2/5">
                <WarningWhiteIcon/>
                <p className="ml-2 text-white font-normal text-sm">{props.message}</p>
            </div>
        );
    }
};

export {SnackBar, SnackBarType}
