/* eslint-disable */

import workoutsConstants from './workoutsConstants';

/**
 * Workout duration summary
 * @param duration
 * @returns {string}
 */
export const workoutDurationSummary = duration => {
    const exactDurationInSeconds = Math.round(duration / 1000)
    const exactDurationInMinutes = Math.round(duration / 60000)

    if(exactDurationInSeconds > 60) {
        if(exactDurationInMinutes > 60) {
            return " 60 mins+"
        }

        if(exactDurationInMinutes > 30) {
            return " 30 mins+"
        }

        if(exactDurationInMinutes < 1) {
            return "less than a min"
        }
    }

    return exactDurationInMinutes + " mins"
}

/**
 * Convert milliseconds to seconds or minutes
 * @param duration
 * @returns {number}
 */
export const convertMilliToSecondsOrMinutes = duration => {
    const seconds = Math.round(duration / 1000)
    const minutes = Math.round(duration / 60000)

    if (seconds >= 60) {
        return minutes
    }
    return seconds
}

/**
 * Convert seconds or minutes to milliseconds
 * @returns {number}
 * @param value
 * @param type
 */
export const convertSecondsOrMinutesToMilli = (value, type) => {

    const secondsToMilli = Math.round(value * 1000)
    const minutesToMilli = Math.round(value * 60000)

    if(type === workoutsConstants.duration.SECONDS) {
        return secondsToMilli
    }

    if (type === workoutsConstants.duration.MINUTES) {
        return minutesToMilli
    }


}

/**
 * Interval duration summary
 * @param duration
 * @returns {string}
 */
export const intervalDurationSummary = duration => {
    const exactDurationInSeconds = Math.round(duration / 1000)
    const exactDurationInMinutes = Math.round(duration / 60000)

    if(exactDurationInSeconds > 60) {
        return exactDurationInMinutes + " mins"
    }

    return exactDurationInSeconds + " secs"
}

/**
 * Display either Secs for Time values or Reps for count values
 * @param timeOrCount
 */
export const timeOrReps = timeOrCount =>
  timeOrCount === workoutsConstants.duration.REPS
    ? workoutsConstants.exerciseInfo.REPS
    : workoutsConstants.exerciseInfo.duration.SECS;

/**
 * Load the exercises into the rounds array to play
 * @param workout
 */
export const loadCircuitWorkout = workout => {
    let rounds = new Array(workout.rounds);
    for (let i = 0; i < rounds.length; i++) {
        rounds[i] = workout.workoutExercises;
    }
    return rounds;
};

/**
 * Load the exercises into the exercises array to play
 * @param workout
 */
export const loadRepsAndSetsWorkout = workout => {
    let exercises = new Array(workout.workoutExercises.length);
    for (let i = 0; i < exercises.length; i++) {
        const exercise = workout.workoutExercises[i];
        const sets = new Array(exercise.sets);
        for (let j = 0; j < sets.length; j++) {
            sets[j] = exercise;
        }
        exercises[i] = sets;
    }
    return exercises;
};

/**
 * Sort out exercises
 * @param workout
 * @param exercises
 * @returns {any[]}
 */
export const sortWorkouts = (workout, exercises) =>
    Array.from(workout.workoutExercises)
        .map(workoutExerciseJSON => {
            const workoutExercise = JSON.parse(workoutExerciseJSON);
            const exercise = exercises.find(item => item.id === workoutExercise.exerciseId);
            if(exercise) {
                return { ...workoutExercise, exercise };
            } else {
                return null
            }
        })
        .filter(workoutExercise => workoutExercise !== null)
        .sort((a, b) => a.index - b.index);

/**
 * Display either a workout duration or live status
 */
export const workoutTagDisplay = (isAuthUser, workout) => {
    if(isAuthUser) {
        if(workout.isLive) {
            return 'Live'
        } else {
            return 'Draft'
        }
    } else {
        return workoutDurationSummary(workout.duration)
    }
}

/**
 * Check if workout is valid i.e contains exercises at minimum
 */
export const isValidWorkout = (workout) => workout.workoutExercises.length > 0

export const generateShareableLink = username => 'https://www.fittree.io/' + username;
