import React from 'react';
import {workoutDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCard = ({workout}) => {

    return (
        <div className="h-auto relative rounded-lg flex flex-col">
            <div className="absolute top-0 right-0 m-2 py-0.5 px-2 rounded-full bg-primary text-white text-xs font-bold">
                <p>{workoutDurationSummary(workout.duration)}</p>
            </div>
            <img src="/wallpaper.jpg" alt="Display profile" className=" rounded-t-lg"/>
            <div className={`space-y-1 bg-primary rounded-b-lg pl-3 py-3`}>
                <p className="text-left text-white text-xl font-extrabold">{workout.title}</p>
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
