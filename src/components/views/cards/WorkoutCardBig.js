import React from 'react';
import {workoutTagDisplay} from "../../../utils/workout/workoutsHelperFunctions";
import AnimateHeight from "react-animate-height";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCardBig = ({workout, showExtras}) => {

    return (
        <AnimateHeight
            duration={500}
            className="rounded-lg overflow-hidden relative rounded-lg text-white mb-3"
            height={showExtras ? "auto" : "20%"}>
            <img src="/wallpaper.jpg" alt="Display profile" className={`${showExtras ? "object-cover object-top" : "object-cover"} rounded-lg sm:h-52 md:h-72 sm:w-full`}/>
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-xs font-bold">
                <p>{workoutTagDisplay(false, workout)}</p>
            </div>
            <div className={`absolute right-0 bottom-0 left-0 pl-3 pb-3 space-y-1`}>
                <p className="text-left  text-darkPrimary text-xl font-extrabold">{workout.title}</p>
                <p className="text-sm font-bold text-dustBlack">{workout.intensityLevel}</p>

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
        </AnimateHeight>
    );
};

export default WorkoutCardBig;
