/* eslint-disable */
import React from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {loadCircuitWorkout, loadRepsAndSetsWorkout} from "../../utils/workout/workoutsHelperFunctions";
import PlayCircuitWorkout from "../screens/workout/PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "../screens/workout/PlayRepsAndSetsWorkout";

const WorkoutPlayer = ({workout, shouldPlay, onEnd}) => {

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
                rounds={rounds}
                end={onEnd}/>

        } else {
            const exercises = loadRepsAndSetsWorkout(workout);
            return <PlayRepsAndSetsWorkout
                workout={workout}
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

export default WorkoutPlayer;
