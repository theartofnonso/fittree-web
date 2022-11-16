import {constructDuration} from "./Duration";
import workoutsConstants from "../utils/workout/workoutsConstants";

/**
 * This class represents an exercise information in a workout
 */
const defaultDuration = constructDuration(5000, workoutsConstants.duration.SECONDS)
export const constructWorkoutExercises = (exerciseId, duration = defaultDuration, sets = 1) => {
    return {
        exerciseId,
        duration: duration,
        sets
    }
}

export const updateExerciseId = (exerciseId, workoutExercise) => {
    return {
        ...workoutExercise,
        exerciseId
    }
}

export const updateDuration = (duration, workoutExercise) => {
    return {
        ...workoutExercise,
        duration
    }
}

export const updateSets = (sets, workoutExercise) => {
    return {
        ...workoutExercise,
        sets
    }
}
