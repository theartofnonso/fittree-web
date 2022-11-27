import React from 'react';
import {workoutTagDisplay} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCard = ({workout}) => {

    return (
        <div
            className="relative h-40 sm:h-52 rounded-lg flex flex-col justify-end text-white overflow-hidden hover:bg-darkSecondary cursor-pointer ">
            <img src="/wallpaper.jpg" alt="Display profile" className="object-cover h-full w-full"/>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack1 hover:bg-transparentBlack1"/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-bold">
                <p>{workoutTagDisplay(false, workout)}</p>
            </div>
            <div className={`absolute right-0 bottom-0 left-0 pl-3 pb-3 space-y-1 text-white font-bold`}>
                <p className="text-left">{workout.title}</p>
                <p className="text-sm">{workout.intensityLevel}</p>

                <div className="flex flex-row font-bold">
                    <div
                        className={`flex flex-row items-center px-2 py-0.5 w-fit bg-white text-primary ${workout.type === workoutsConstants.workoutType.CIRCUIT ? "rounded-l" : "rounded"} text-xs`}>{workout.workoutExercises.length} exercises
                    </div>
                    {workout.type === workoutsConstants.workoutType.CIRCUIT ?
                        <div className="flex flex-row items-center ml-0.5 px-2 py-0.5 w-fit bg-white text-primary rounded-r text-xs">
                            {workout.rounds} Rounds
                        </div> : null}
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
