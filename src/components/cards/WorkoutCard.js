import React from 'react';
import {workoutDurationSummary} from "../../utils/workout/workoutsHelperFunctions";

const WorkoutCard = ({workout}) => {

    return (
        <div className="relative h-60 rounded-lg flex flex-col justify-end text-white overflow-hidden hover:bg-secondary">
            <img src={"https://" + workout.thumbnailUrl} alt="Display profile" className="object-cover h-full w-full"/>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-medium">
                <p>{workoutDurationSummary(workout.duration)}</p>
            </div>
            <div className="absolute flex flex-col items-start pl-2 pb-2">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm">{workout.intensityLevel}</p>
            </div>
        </div>
    );
};

export default WorkoutCard;
