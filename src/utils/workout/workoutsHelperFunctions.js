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
 * Determine if duration is second or time
 * @param duration
 * @returns {number}
 */
export const isMinutesOrSeconds = duration => {
    const seconds = Math.round(duration / 1000)
    const minutes = Math.round(duration / 60000)

    if (seconds >= 60) {
        return workoutsConstants.duration.MINUTES
    }
    return workoutsConstants.duration.SECONDS
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

    return parseInt(value)

}

/**
 * Interval duration summary
 * @param duration
 * @returns {string}
 */
export const timeSummary = duration => {
    const exactDurationInSeconds = Math.round(duration / 1000)
    const exactDurationInMinutes = Math.round(duration / 60000)

    if(exactDurationInSeconds > 60) {
        return exactDurationInMinutes + " Mins"
    }

    return exactDurationInSeconds + " Secs"
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
    rounds.fill(workout.workoutExercises)
    return rounds;
};

/**
 * Load the exercises into the exercises array to play
 * @param workout
 */
export const loadRepsAndSetsWorkout = workout => {
    return workout.workoutExercises
};

/**
 * Display either a workout duration or live status
 */
export const workoutTagDisplay = (isCreator, workout) => {
    if(isCreator) {
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
 * Format URI to correct form for displaying
 */
export const formatThumbnailUri = (uri) => {
    let formattedUri = uri;
    if(!uri.startsWith("blob")) {
        formattedUri =  "https://" + uri
    }
    return formattedUri
}

/**
 * Check if workout is valid i.e contains exercises at minimum
 */
export const isValidWorkout = (workout) => workout.workoutExercises.length > 0

export const generateShareableLink = username => 'https://www.fittree.io/' + username;

export const generateWorkoutLink = workoutId => 'https://www.fittree.io/workouts/' + workoutId;
