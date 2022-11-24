/* eslint-disable */
import React from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeSummary} from "../../../utils/workout/workoutsHelperFunctions";
import InfoIcon from "../../../assets/svg/information-line.svg";

/**
 * Helper function to display appropriate RepsOrTime summary
 * @returns {number|*}
 */
const displayDurationSummary = (workoutType, exercise, currentSet, duration, timeLeft) => {
    let description;
    if (duration.type === workoutsConstants.exerciseInfo.REPS) {
        description = timeLeft + " " + "Reps"
    } else {
        description = timeSummary(timeLeft)
    }

    return description
};


/**
 * Return the exercise duration in reps or seconds/minutes
 */
const returnRepsOrTime = (duration) => {
    let description;
    if (duration.type === workoutsConstants.duration.REPS) {
        description = duration.value + " " + workoutsConstants.exerciseInfo.REPS
    } else {
        description = timeSummary(duration.value)
    }
    return description
}

/**
 * Helper function to display appropriate RepsOrTimeValue
 * @returns {number|*}
 */
const displayDuration = (workoutType, exercise, set = null) => {
    let description;
    if (workoutType === workoutsConstants.workoutType.CIRCUIT) {
        description = returnRepsOrTime(exercise.duration)
    } else {
        description = returnRepsOrTime(set.duration)
    }

    return description
};

const ExerciseInfo = ({workoutType, exercise, set, isActive}) => {
    return (
        <p className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${isActive ? "bg-secondary text-primary" : "bg-primary text-white"}`}>{displayDuration(workoutType, exercise, set)}</p>
    )
}

const Exercise = ({isActive, exercise, currentSet, duration, timeLeft, workoutType, onClick}) => {

    return (
        <button onClick={onClick}
                className={`flex flex-row items-center place-content-between py-2 px-4 mt-2 mb-4 ${isActive ? "bg-primary" : "bg-lightSecondary"} w-full rounded-sm`}>
            <div className="flex flex-row items-center space-y-2 w-full py-3">
                <div className="flex flex-col space-y-2 items-start text-left grow">
                    <p className={`font-semibold text-md sm:text-lg ${isActive ? "text-white" : "text-gray1"}`}>{exercise.title}</p>
                    <div
                        className={`flex flex-row space-x-1 justify-start text-left`}>
                        {workoutType === workoutsConstants.workoutType.CIRCUIT ?
                            <ExerciseInfo exercise={exercise} workoutType={workoutType} isActive={isActive}/> : null}
                        {workoutType === workoutsConstants.workoutType.REPS_SETS ?
                            exercise.sets.map((set, index) => {
                                return (<ExerciseInfo
                                    key={index}
                                    exercise={exercise}
                                    workoutType={workoutType}
                                    isActive={isActive}
                                    set={set}/>)
                            }) : null}
                    </div>
                </div>
                {isActive ?
                    <p className="text-lg font-bold mr-4 text-white">{displayDurationSummary(workoutType, exercise, currentSet, duration, timeLeft)}</p> : null}
            </div>
            <div className="flex flex-row items-center justify-end cursor-pointer h-10">
                <InfoIcon/>
            </div>
        </button>
    );
};

export default Exercise;
