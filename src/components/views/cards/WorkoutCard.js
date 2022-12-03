import React from 'react';
import {workoutDurationSummary} from "../../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const WorkoutCard = ({workout}) => {

    return (
            <div className="relative h-52 rounded-md flex flex-col justify-end cursor-pointer bg-black shadow-darkSecondary shadow-md text-white hover:bg-dustBlack1">
                    <div className="absolute top-0 right-0 mt-2 mr-2 text-white text-xs font-bold">
                        <p>{workoutDurationSummary(workout.duration)}</p>
                    </div>

                <div className={`space-y-1 p-3 rounded-lg`}>
                    <p className="text-left text-white text-xl font-extrabold my-2">{workout.title}</p>
                    <p className="text-sm font-semibold">{workout.intensityLevel}</p>
                    <div className="flex flex-row font-medium space-x-1">
                        <p className="text-white text-sm">{workout.workoutExercises.length} exercises</p>
                        {workout.type === workoutsConstants.workoutType.CIRCUIT && <p className="bg-white rounded-full px-2 text-dustBlack rounded-md text-sm">{workout.rounds} rnds</p>}
                    </div>
                </div>
            </div>
    );
};

export default WorkoutCard;
