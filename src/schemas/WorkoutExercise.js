import {constructDuration} from "./Duration";
import workoutsConstants from "../utils/workout/workoutsConstants";
import {generateRandomString} from "../utils/general/utils";

/**
 * This class represents an exercise information in a workout
 */
const defaultDuration = constructDuration(5000, workoutsConstants.duration.SECONDS)

const constructWorkoutExercise = (title = "", duration = defaultDuration, sets = [defaultDuration]) => {
    return {
        id: generateRandomString(),
        title,
        duration,
        sets
    }
}

const updateTitle = (workoutExercise, title) => {
    return {
        ...workoutExercise,
        title,
    }
}

const updateDuration = (workoutExercise, duration) => {
    return {
        ...workoutExercise,
        duration,
    }
}

const updateSet = (workoutExercise, index, duration) => {
    const sets = workoutExercise.sets
    sets[index] = duration
    return {
        ...workoutExercise,
        sets
    }
}

const addSet = (workoutExercise) => {
    const sets = workoutExercise.sets
    sets.push(defaultDuration)
    return {
        ...workoutExercise,
        sets
    }
}

const removeSet = (workoutExercise) => {
    const sets = workoutExercise.sets
    if(sets.length > 1) {
        sets.pop()
        return {
            ...workoutExercise,
            sets
        }
    }
    return null;
}

export {
    constructWorkoutExercise, updateTitle, updateDuration, updateSet, addSet, removeSet
}
