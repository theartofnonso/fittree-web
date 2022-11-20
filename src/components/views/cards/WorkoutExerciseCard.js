/* eslint-disable */
import React from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {intervalDurationSummary, timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";

const WorkoutExerciseCard = ({workoutExercise, type, onClick}) => {

    /**
     * Helper function to display appropriate RepsOrTimeValue
     * @returns {number|*}
     */
    const displayDuration = () => {

        let exerciseInfo;
        switch (workoutExercise.duration.type) {
            case workoutsConstants.duration.REPS:
                exerciseInfo = workoutExercise.duration.value + " " + workoutsConstants.exerciseInfo.REPS
                break
            default:
                exerciseInfo = intervalDurationSummary(workoutExercise.duration.value)
        }

        return type === workoutsConstants.workoutType.CIRCUIT ? exerciseInfo : exerciseInfo + " x " + workoutExercise.sets + " set(s)";
    };

    return (
        <button onClick={onClick} className="flex flex-row items-center mb-4 hover:bg-secondary w-full rounded-md">
            <div className="flex flex-col items-start text-left">
                <p className="font-medium text-sm">{workoutExercise.title}</p>
                <p className="text-xs font-normal">{displayDuration()}</p>
            </div>
        </button>
    );
};

export default WorkoutExerciseCard;
