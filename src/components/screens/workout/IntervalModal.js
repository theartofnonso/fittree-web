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
                    <div className="flex flex-col items-center justify-center text-white mb-4">
                        <p className="font-semibold text-lg">{props.description}</p>
                        <p className="font-medium text-base">{intervalDurationSummary(intervalTime)}</p>
                    </div>
                )
            case workoutsConstants.playMessages.NEXT_ROUND:
            case workoutsConstants.playMessages.NEXT_EXERCISE:
                return (
                    <div className="flex flex-col items-center justify-center text-white mb-4">
                        <p className="font-semibold text-lg">{props.description}</p>
                        <p className="font-medium text-base">Rest for {intervalDurationSummary(intervalTime)}</p>
                    </div>
                )
            default:
                return <p className="text-white font-medium text-base mb-4">Rest
                    for {intervalDurationSummary(intervalTime)}</p>
        }
    }

    return (
        <div className="flex flex-row items-center justify-center bg-primary justify-start w-64 m-auto rounded-md">
            {displayIntervalMessage()}
            <div onClick={skipInterval} className="cursor-pointer">
                <SkipIcon/>
            </div>
        </div>
    );
};

export default IntervalModal;
