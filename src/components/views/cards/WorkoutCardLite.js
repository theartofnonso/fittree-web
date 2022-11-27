import React from 'react';
import {workoutDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCardLite = ({workout}) => {

    return (
            <div className="relative rounded-lg flex flex-col bg-[url('/wallpaper.jpg')] cursor-pointer">
                <div className="flex flex-row justify-end">
                    <div className="m-3 py-0.5 px-2 rounded-full bg-primary text-white text-xs font-bold">
                        <p>{workoutDurationSummary(workout.duration)}</p>
                    </div>
                </div>

                <div className={`space-y-1 pl-3 py-3 rounded-lg`}>
                    <p className="text-left text-primary text-xl font-extrabold my-2">{workout.title}</p>
                    <p className="text-sm font-semibold">{workout.intensityLevel}</p>
                    <div className="flex flex-row font-bold">
                        <div
                            className={`flex flex-row items-center px-2 py-0.5 w-fit bg-primary text-white ${workout.type === workoutsConstants.workoutType.CIRCUIT ? "rounded-l" : "rounded"} text-xs`}>{workout.workoutExercises.length} exercises
                        </div>
                        {workout.type === workoutsConstants.workoutType.CIRCUIT ?
                            <div className="flex flex-row items-center ml-0.5 px-2 py-0.5 w-fit bg-primary text-white rounded-r text-xs">
                                {workout.rounds} Rounds
                            </div> : null}
                    </div>
                </div>
            </div>
    );
};

export default WorkoutCardLite;
