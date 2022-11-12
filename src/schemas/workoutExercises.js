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

export const updateExerciseId = (exerciseId, workoutExercises) => {
    return {
        ...workoutExercises,
        exerciseId
    }
}

export const updateDuration = (duration, workoutExercises) => {
    return {
        ...workoutExercises,
        duration: duration
    }
}

export const updateSets = (sets, workoutExercises) => {
    return {
        ...workoutExercises,
        sets
    }
}
