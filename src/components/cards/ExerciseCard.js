/* eslint-disable */
import React from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {timeOrReps, workoutDurationSummary} from "../../utils/workout/workoutsHelperFunctions";

const ExerciseCard = ({exercise}) => {

    return (
        <div className="relative h-40 rounded-lg flex flex-col justify-end text-white overflow-hidden hover:bg-secondary">
            <video className="rounded-md w-full h-full object-cover mr-2 bg-dustBlack" playsInline>
                <source src={`https://${exercise.videoUrls[0]}#t=0.1`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
        </div>
    );
};

export default ExerciseCard;
