import {constructDuration} from "./Duration";
import workoutsConstants from "../utils/workout/workoutsConstants";

/**
 * This class represents an exercise information in a workout
 */
const defaultDuration = constructDuration(5000, workoutsConstants.duration.SECONDS)
export const constructWorkoutMetadata = (exerciseId, duration = defaultDuration, sets = 1) => {
    return {
        exerciseId,
        duration: duration,
        sets
    }
}

export const updateExerciseId = (exerciseId, WorkoutMetadata) => {
    return {
        ...WorkoutMetadata,
        exerciseId
    }
}

export const updateDuration = (duration, WorkoutMetadata) => {
    return {
        ...WorkoutMetadata,
        duration: duration
    }
}

export const updateSets = (sets, WorkoutMetadata) => {
    return {
        ...WorkoutMetadata,
        sets
    }
}
