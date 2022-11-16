/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import InfoOutlinedIcon from "../../../assets/svg/information-white-line.svg";
import OrderPlayIcon from "../../../assets/svg/order-play-white-line.svg";
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
                return <p className="text-white font-medium text-base mb-4">Rest for {intervalDurationSummary(intervalTime)}</p>
        }
    }

    return (
        <div className="px-5 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-screen bg-transparentBlack9">
            <div className="my-4 flex flex-row justify-end">
                <div className="mx-2 cursor-pointer" onClick={props.previewExercise}>
                    <InfoOutlinedIcon/>
                </div>
                <div className="mx-2 cursor-pointer" onClick={props.toggleWorkoutList}>
                    <OrderPlayIcon/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center">
                    <div>
                        {displayIntervalMessage()}
                    </div>
                    <div onClick={skipInterval} className="cursor-pointer">
                        <SkipIcon/>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={props.navigateToWorkoutPreview}
                    className="absolute bottom-0 mb-10 bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium hover:bg-darkPrimary">End
                    Workout
                </button>
            </div>
        </div>
    );
};

export default IntervalModal;