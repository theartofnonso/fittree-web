import React from 'react';
import {workoutDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCardLarge = ({workout}) => {

    return (
            <div className="relative h-40 rounded-md flex flex-col justify-end cursor-pointer bg-dustBlack shadow-darkSecondary shadow-md text-white">
                    <div className="absolute top-0 right-0 mt-2 mr-2 text-white text-xs font-bold">
                        <p>{workoutDurationSummary(workout.duration)}</p>
                    </div>

                <div className={`space-y-1 p-3 rounded-lg text-ellipsis overflow-hidden`}>
                    <p className="text-left text-white text-xl font-extrabold my-2">{workout.title}</p>
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

export default WorkoutCardLarge;
