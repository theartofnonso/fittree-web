import React from 'react';
import {workoutTagDisplay} from "../../../utils/workout/workoutsHelperFunctions";

const WorkoutCard = ({workout}) => {

    return (
        <div
            className="relative h-32 rounded-lg flex flex-col justify-end text-white overflow-hidden hover:bg-secondary cursor-pointer">
            <img src="/wallpaper.jpg" alt="Display profile" className="object-cover h-full w-full"/>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-medium">
                <p>{workoutTagDisplay(false, workout)}</p>
            </div>
            <div className="absolute right-0 bottom-0 left-0 pl-3 pb-3 space-y-1.0">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm font-medium">{workout.intensityLevel}</p>
            </div>
        </div>
    );
};

export default WorkoutCard;
