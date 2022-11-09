/**
 * Timer for in workoutS
 * @type {{duration: {SECS: string, MINS: string}, REPS: string, TIME: string, COUNT: string}}
 */
const exerciseInfo = {
  TIME: 'Time',
  COUNT: 'Count',
  duration: {
    MINS: 'Mins',
    SECS: 'Secs',
  },
  REPS: 'Reps',
};

const duration = {
  MINUTES: "Mins",
  SECONDS: "Secs"
}

/**
 * Intensity Levels
 * @type {{Beginner: string, Advanced: string, Intermediate: string}}
 */
const intensityLevels = {
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
};

/**
 * Workout type
 * @type {{REPS_SETS: string, CIRCUIT: string}}
 */
const workoutType = {
  CIRCUIT: 'CircuitWorkout',
  REPS_SETS: 'RepsAndSetsWorkout',
  circuitInfo: {
    title: 'Circuit Workout',
    description: 'Create a workout with exercises grouped into rounds',
  },
  repsSetsInfo: {
    title: 'Reps and Sets Workout',
    description: ' Create a workout with exercises grouped into sets',
  },
};

/**
 * Messages displayed while playing a workout
 */
const playMessages = {
  WORKOUT_STARTING: 'Workout is Starting',
  NEXT_ROUND: 'Next Round',
  NEXT_SET: 'Next Set',
  NEXT_EXERCISE: 'Next Exercise',
};

const profileStatus = {
  LOADING: 'Loading',
  READY: 'Ready',
  FAILED: 'Failed'
}

export default {
  exerciseInfo,
  profileStatus,
  playMessages,
  intensityLevels,
  workoutType,
  duration
};
