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
 * @returns {{type: string, value: number}}
 */
export const convertMilliToSecondsOrMinutes = duration => {
    const exactDurationInSeconds = Math.round(duration / 1000)
    const exactDurationInMinutes = Math.round(duration / 60000)

    if (exactDurationInSeconds >= 60) {
        return {
            value: exactDurationInMinutes,
            type: workoutsConstants.duration.MINUTES
        };
    }
    return {
        value: exactDurationInSeconds,
        type: workoutsConstants.duration.SECONDS
    };
}

/**
 * Convert seconds or minutes to milliseconds
 * @param duration
 * @returns {number}
 */
export const convertSecondsOrMinutesToMilli = duration => {
    const exactDurationInSeconds = Math.round(duration * 1000)
    const exactDurationInMinutes = Math.round(duration * 60000)

    if (exactDurationInSeconds >= 60) {
        return exactDurationInMinutes;
    }

    return exactDurationInSeconds
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
  timeOrCount === workoutsConstants.exerciseInfo.TIME
    ? workoutsConstants.exerciseInfo.duration.SECS
    : workoutsConstants.exerciseInfo.REPS;

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

export const generateShareableLink = username => 'https://www.fittree.io/' + username;
