import React from 'react';
import {workoutTagDisplay} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCard = ({workout}) => {

    return (
        <div
            className="relative h-32 rounded-lg flex flex-col justify-end text-white overflow-hidden hover:bg-secondary cursor-pointer">
            <img src={workout.thumbnailUrl ? "https://" + workout.thumbnailUrl : "/wallpaper.jpg"} alt="Display profile" className="object-cover h-full w-full"/>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-medium">
                <p>{workoutTagDisplay(false, workout)}</p>
            </div>
            <div className="absolute right-0 bottom-0 left-0 pl-3 pb-3 space-y-1.0">
                <p className="font-bold text-left">{workout.title}</p>
                <p className="text-sm">{workout.intensityLevel}</p>
                <div className="flex flex-row mt-1.5">
                    <div
                        className={`flex flex-row items-center px-2 py-0.5 w-fit bg-white text-primary ${workout.type === workoutsConstants.workoutType.CIRCUIT ? "rounded-l" : "rounded"} text-xs font-semibold`}>{workout.workoutExercises.length} Ex
                    </div>
                    {workout.type === workoutsConstants.workoutType.CIRCUIT ?
                        <div className="flex flex-row items-center ml-0.5 px-1.5 py-0.5 w-fit bg-white text-primary rounded-r text-xs font-semibold">
                            {workout.rounds} Rnds
                        </div> : null}
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
