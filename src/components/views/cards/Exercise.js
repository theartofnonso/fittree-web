/* eslint-disable */
import React from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeSummary} from "../../../utils/workout/workoutsHelperFunctions";

/**
 * Helper function to display appropriate RepsOrTime summary
 * @returns {number|*}
 */
const displayDurationSummary = (workoutType, exercise, duration, timeLeft) => {
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

const ExerciseInfo = ({exercise, workoutType, set, isActiveSet, isActive}) => {
    return (
        <p className={`text-xs font-semibold px-2 py-0.5 m-0.5 rounded-sm ${isActive ? "bg-secondary text-primary" : "bg-primary text-white"} ${isActive && isActiveSet ? "motion-safe:animate-pulse" : ""}`}>{displayDuration(workoutType, exercise, set)}</p>
    )
}

const Exercise = ({isActive, exercise, setIndex, duration, timeLeft, workoutType}) => {

    return (
        <div className={`flex flex-row items-center place-content-between py-2 px-4 mt-2 mb-4 ${isActive ? "bg-primary hover:bg-darkPrimary" : "shadow-darkSecondary shadow-lg hover:bg-lightSecondary"} w-full rounded-sm`}>
            <div className="flex flex-row items-center place-content-between space-y-2 w-full py-3">
                <div className="flex flex-col space-y-2 items-start text-left">
                    <p className={`font-semibold text-md sm:text-lg ${isActive ? "text-white" : "text-gray1"}`}>{exercise.title}</p>
                    <div
                        className={`flex flex-row flex-wrap`}>
                        {workoutType === workoutsConstants.workoutType.CIRCUIT ? <ExerciseInfo exercise={exercise} workoutType={workoutType} isActive={isActive}/> : null}
                        {workoutType === workoutsConstants.workoutType.REPS_SETS ?
                            exercise.sets.map((set, index) => {
                                return (<ExerciseInfo
                                    key={index}
                                    exercise={exercise}
                                    workoutType={workoutType}
                                    set={set}
                                    isActive={isActive}
                                    isActiveSet={index === setIndex}/>)
                            }) : null}
                    </div>
                </div>
                {isActive ?
                    <p className="text-center text-lg font-bold text-white ml-4">{displayDurationSummary(workoutType, exercise, duration, timeLeft)}</p> : null}
            </div>
        </div>
    );
};

export default Exercise;
