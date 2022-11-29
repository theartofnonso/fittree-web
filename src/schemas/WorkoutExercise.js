import {constructDuration} from "./Duration";
import workoutsConstants from "../utils/workout/workoutsConstants";
import {generateRandomString} from "../utils/general/utils";

/**
 * This class represents an exercise information in a workout
 */
const defaultDuration = constructDuration(5000, workoutsConstants.duration.SECONDS)

const defaultSets = {
    duration: defaultDuration
}

const constructWorkoutExercise = (title = "", duration = defaultDuration, sets = [defaultSets]) => {
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
    sets[index] = {
        duration
    }
    return {
        ...workoutExercise,
        sets
    }
}

const addSet = (workoutExercise) => {
    const sets = workoutExercise.sets
    const prevSet = sets[sets.length - 1] // Get the previous set duration
    sets.push(prevSet)
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
