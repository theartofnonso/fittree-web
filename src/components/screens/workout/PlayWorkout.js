/* eslint-disable */
import React from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {loadCircuitWorkout, loadRepsAndSetsWorkout} from "../../../utils/workout/workoutsHelperFunctions";
import PlayCircuitWorkout from "./PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "./PlayRepsAndSetsWorkout";

const PlayWorkout = ({workout, recommendations, shouldPlay, onEnd}) => {

    if(!shouldPlay) {
        return null;
    }

    /**
     * Display appropriate workout play component
     * @returns {JSX.Element}
     */
    const getWorkoutPlayComponent = () => {

        if (workout.type === workoutsConstants.workoutType.CIRCUIT) {
            const rounds = loadCircuitWorkout(workout);
            return <PlayCircuitWorkout
                workout={workout}
                recommendations={recommendations}
                rounds={rounds}
                end={onEnd}/>

        } else {
            const exercises = loadRepsAndSetsWorkout(workout);
            return <PlayRepsAndSetsWorkout
                workout={workout}
                recommendations={recommendations}
                exercises={exercises}
                end={onEnd}/>
        }
    }

    return (
        <>
            {getWorkoutPlayComponent()}
        </>
    );
};

export default PlayWorkout;
