/* eslint-disable */
import React from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../utils/workout/workoutsHelperFunctions";

const WorkoutExerciseCard = ({workoutExercise, type}) => {

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
        return type === workoutsConstants.workoutType.CIRCUIT ? exerciseInfo : exerciseInfo + " x set(s)";
    };

    return (
        <div className="flex flex-row items-center mb-4 ">
            <video className="rounded-md w-16 h-16 sm:w-20 sm:h-20 object-cover mr-2" autoPlay playsInline>
                <source src={`https://${workoutExercise.exercise.videoUrls[0]}`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div>
                <p className="font-medium text-sm">{workoutExercise.exercise.title}</p>
                <p className="text-sm">{displayRepsOrTime()}</p>
            </div>
        </div>
    );
};

export default WorkoutExerciseCard;
