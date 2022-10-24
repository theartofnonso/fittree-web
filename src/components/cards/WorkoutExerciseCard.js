/* eslint-disable */
import React from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../utils/workout/workoutsHelperFunctions";

const WorkoutExerciseCard = ({workoutExercise, type, onClick}) => {

    /**
     * Helper function to display appropriate RepsOrTimeValue
     * @returns {number|*}
     */
    const displayRepsOrTime = () => {
        let exerciseInfo;
        if (workoutExercise.repsOrTime === workoutsConstants.exerciseInfo.TIME) {
            exerciseInfo = workoutExercise.repsOrTimeValue / 1000 + " " + timeOrReps(workoutExercise.repsOrTime);
        } else {
            exerciseInfo = workoutExercise.repsOrTimeValue + " " + timeOrReps(workoutExercise.repsOrTime);
        }
        return type === workoutsConstants.workoutType.CIRCUIT ? exerciseInfo : exerciseInfo + " x " + workoutExercise.sets + " set(s)";
    };

    return (
        <button onClick={onClick} className="flex flex-row items-center mb-4 hover:bg-secondary w-full rounded-md">
            <video className="rounded-md w-16 h-16 sm:w-20 sm:h-20 object-cover mr-2 bg-dustBlack" playsInline>
                <source src={`https://${workoutExercise.exercise.videoUrls[0]}#t=0.1`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="flex flex-col items-start text-left">
                <p className="font-medium text-sm">{workoutExercise.exercise.title}</p>
                <p className="text-sm">{displayRepsOrTime()}</p>
            </div>
        </button>
    );
};

export default WorkoutExerciseCard;
