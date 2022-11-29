/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeSummary} from "../../../utils/workout/workoutsHelperFunctions";

const IntervalModal = props => {

    const [intervalTime, setIntervalTime] = useState(props.intervalTime);

    let intervalId = 0;

    useEffect(() => {
        intervalId = setInterval(() => {
            if (intervalTime === 0) {
                props.onFinish();
            } else {
                setIntervalTime(prevValue => prevValue - 1000);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [intervalTime]);

    /**
     * Skip the interval
     */
    const skipInterval = () => {
        props.onFinish();
        clearInterval(intervalId)
    }

    /**
     * Display messages for respective intervals
     * @returns {JSX.Element}
     */
    const displayIntervalMessage = () => {

        switch (props.description) {
            case workoutsConstants.playMessages.WORKOUT_STARTING:
                return (
                    <div className="flex flex-col items-center justify-center">
                        <p className="">{props.description}</p>
                        <p className="">{timeSummary(intervalTime)}</p>
                    </div>
                )
            case workoutsConstants.playMessages.NEXT_ROUND:
            case workoutsConstants.playMessages.NEXT_EXERCISE:
                return (
                    <div className="flex flex-col items-center justify-center">
                        <p className="">{props.description}</p>
                        <p className="">Rest for {timeSummary(intervalTime)}</p>
                    </div>
                )
            default:
                return (
                    <p className=""> Rest for {timeSummary(intervalTime)}</p>
                )
        }
    }

    return (
        <div className="absolute bg-whiteOpacity1 flex flex-col items-center sm:items-center sm:justify-center pt-10 bg-primary top-0 right-0 bottom-0 left-0 rounded text-xl font-bold text-black">
            {displayIntervalMessage()}
            <p className="text-xl font-bold my-4">or</p>
            <button onClick={skipInterval}
                    className="cursor-pointer bg-primary py-2 px-6 rounded-full text-secondary font-semibold hover:bg-darkPrimary">
                skip
            </button>
        </div>
    );
};

export default IntervalModal;
