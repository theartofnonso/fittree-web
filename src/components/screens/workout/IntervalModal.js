/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import SkipIcon from "../../../assets/svg/skip-forward-fill.svg";
import {intervalDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";

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
                        <p className="">{intervalDurationSummary(intervalTime)}</p>
                    </div>
                )
            case workoutsConstants.playMessages.NEXT_ROUND:
            case workoutsConstants.playMessages.NEXT_EXERCISE:
                return (
                    <div className="flex flex-col items-center justify-center">
                        <p className="">{props.description}</p>
                        <p className="">Rest for {intervalDurationSummary(intervalTime)}</p>
                    </div>
                )
            default:
                return (
                    <p className=""> Rest for {intervalDurationSummary(intervalTime)}</p>
                )
        }
    }

    return (
        <div className="absolute flex flex-col items-center justify-center bg-primary top-0 right-0 bottom-0 left-0 rounded-md text-xl font-bold text-white">
            {displayIntervalMessage()}
            <p className="text-xl font-bold my-4">or</p>
            <button onClick={skipInterval} className="cursor-pointer bg-secondary py-2 px-6 rounded-full text-primary font-semibold hover:bg-darkSecondary">
                skip
            </button>
        </div>
    );
};

export default IntervalModal;
