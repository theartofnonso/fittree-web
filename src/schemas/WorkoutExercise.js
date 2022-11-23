import {constructDuration} from "./Duration";
import workoutsConstants from "../utils/workout/workoutsConstants";
import {generateRandomString} from "../utils/general/utils";

/**
 * This class represents an exercise information in a workout
 */
const defaultDuration = constructDuration(5000, workoutsConstants.duration.SECONDS)
export const constructWorkoutExercise = (title = "", duration = defaultDuration, sets = [defaultDuration]) => {
    return {
        id: generateRandomString(),
        title,
        duration,
        sets
    }
}

export const updateExerciseTitle = (workoutExercise, title) => {
    return {
        ...workoutExercise,
        title,
    }
}

export const updateDuration = (workoutExercise, duration) => {
    return {
        ...workoutExercise,
        duration,
    }
}

export const updateSets = (workoutExercise, sets) => {
    return {
        ...workoutExercise,
        sets,
    }
}
