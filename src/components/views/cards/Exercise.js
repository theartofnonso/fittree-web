/* eslint-disable */
import React from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {intervalDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";
import InfoIcon from "../../../assets/svg/information-line.svg";

const Exercise = ({isActive, data, extraData, type, onClick, style}) => {

    /**
     * Helper function to display appropriate RepsOrTimeValue
     * @returns {number|*}
     */
    const displayDuration = () => {

        let exerciseInfo;
        switch (data.duration.type) {
            case workoutsConstants.duration.REPS:
                exerciseInfo = workoutsConstants.exerciseInfo.REPS + ": " + data.duration.value
                break
            default:
                exerciseInfo = intervalDurationSummary(data.duration.value)
        }

        return exerciseInfo
    };

    return (
        <button onClick={onClick}
                className={`flex flex-row items-center place-content-between py-2 px-4 my-4 sm:my-6 ${isActive ? "bg-primary text-white" : "bg-lightSecondary"} w-full rounded-sm`}>
            <div className="flex flex-row items-center space-y-2 w-full py-3">
                <div className="flex flex-col space-y-2 items-start text-left grow">
                    <p className="font-semibold text-md sm:text-lg">{data.title}</p>
                    <div
                        className={`flex flex-col space-y-1 items-start text-left ${isActive ? "text-white" : "text-gray1"}`}>
                        <p className="text-xs font-semibold">{displayDuration()}</p>
                        {type === workoutsConstants.workoutType.REPS_SETS ?
                            <p className="text-xs font-semibold">{`Sets: ${data.sets}`}</p> : null}
                    </div>
                </div>
                {isActive ? <p className="text-lg font-bold mr-4">{extraData}</p> : null}
            </div>
            <div className="flex flex-row items-center justify-end cursor-pointer h-10">
                <InfoIcon/>
            </div>
        </button>
    );
};

export default Exercise;
