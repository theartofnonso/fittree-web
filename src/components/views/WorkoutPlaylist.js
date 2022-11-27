/* eslint-disable */
import React, {useEffect, useState} from "react";
import Exercise from "./cards/Exercise";
import IntervalModal from "../screens/workout/IntervalModal";
import Controls from "./Controls";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const WorkoutPlaylist = ({shouldPlayWorkout, shouldResetWorkout, onPauseWorkout, onEndWorkout, workout, playlist}) => {

    const type = workout.type

    const list = type === workoutsConstants.workoutType.CIRCUIT ? playlist[0] : playlist;

    const [exerciseDuration, setExerciseDuration] = useState(0);

    const [exerciseIndex, setExerciseIndex] = useState(0);

    const [roundsIndex, setRoundsIndex] = useState(0);

    const [setIndex, setSetIndex] = useState(0);

    const [showIntervalModal, setShowIntervalModal] = useState(false);

    const [intervalModalDescription, setIntervalModalDescription] = useState("");

    const [intervalModalTime, setIntervalModalTime] = useState(0);

    const sectionHeader = `Round ${roundsIndex + 1} of ${playlist.length}`;

    const [isWorkoutStarting, setIsWorkoutStarting] = useState(true)

    /**
     * Automate the workout
     */
    useEffect(() => {

        let intervalId = null;

        if (shouldPlayWorkout) {

            showWorkoutStarting()

            if (!showIntervalModal) {
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    if (getDuration().type !== workoutsConstants.duration.REPS) {
                        if (exerciseDuration === 0) {
                            clearInterval(intervalId);
                            seekForward();
                        } else {
                            setExerciseDuration(prevValue => prevValue - 1000);
                        }
                    }
                }, 1000);
            }

        }

        return () => clearInterval(intervalId);
    }, [shouldPlayWorkout, showIntervalModal, exerciseDuration]);

    /**
     * Reset the workoutPlaylist
     */
    useEffect(() => {
        if(shouldResetWorkout) {
            setExerciseDuration(0)
            setExerciseIndex(0)
            setRoundsIndex(0)
            setSetIndex(0)
            setShowIntervalModal(false)
            setIntervalModalDescription("")
            setIntervalModalTime(0)
            setIsWorkoutStarting(true)
        }
    }, [shouldResetWorkout])

    /**
     * Show initial workout starting message
     */
    const showWorkoutStarting = () => {
        if (type === workoutsConstants.workoutType.CIRCUIT && isWorkoutStarting) {
            setIntervalModalDescription(workoutsConstants.playMessages.WORKOUT_STARTING)
            setIntervalModalTime(5000)
            setShowIntervalModal(true)
            setExerciseDuration(getExercise().duration.value)
            setIsWorkoutStarting(false)
        } else {
            if (type === workoutsConstants.workoutType.REPS_SETS && isWorkoutStarting) {
                setExerciseDuration(getExercise().sets[0].duration.value)
                setIsWorkoutStarting(false)
            }
        }
    }

    /**
     * Seek forward
     */
    const seekForward = () => {
        if (type === workoutsConstants.workoutType.CIRCUIT) {
            seekForwardCircuit()
        } else {
            seekForwardRepsAndSets()
        }
    }

    /**
     * Seek backward
     */
    const seekBackward = () => {
        if (type === workoutsConstants.workoutType.CIRCUIT) {
            seekBackwardCircuit()
        } else {
            seekBackwardRepsAndSets()
        }
    }

    /**
     * Seek through exercises and sets
     */
    const seekForwardRepsAndSets = () => {

        const nextSetIndex = setIndex + 1;
        const nextExerciseIndex = exerciseIndex + 1;

        /**
         * If next set is more than sets in current exercise attempt to move to next exercise
         */
        if (nextSetIndex >= playlist[exerciseIndex].sets.length) {
            /**
             * If next exercise is more than total playlist
             */
            if (nextExerciseIndex >= playlist.length) {
                onEndWorkout()
            } else {
                /**
                 * If next exercise is not more than total playlist, move to next exercise
                 */
                setExerciseIndex(nextExerciseIndex);
                setSetIndex(0);
                setExerciseDuration(getExercise(-1, nextExerciseIndex).sets[0].duration.value);
                setIntervalModalDescription(workoutsConstants.playMessages.NEXT_EXERCISE);
                setIntervalModalTime(workout.exerciseInterval);
                setShowIntervalModal(true);
            }
        } else {
            /**
             * If next set is not more than sets in current exercise attempt to move to next set
             */
            setSetIndex(nextSetIndex);
            setExerciseDuration(getExercise(-1, exerciseIndex).sets[nextSetIndex].duration.value);
            setIntervalModalTime(workout.setsInterval);
            setShowIntervalModal(true);
        }
    };

    /**
     * Seek through exercises and sets
     */
    const seekBackwardRepsAndSets = () => {
        const prevSetIndex = setIndex - 1;
        if (prevSetIndex >= 0) {
            setSetIndex(prevSetIndex);
        } else {
            setSetIndex(0);
        }
    };

    /**
     * Seek through exercises
     */
    const seekForwardCircuit = () => {

        const nextRoundsIndex = roundsIndex + 1;
        const nextExerciseIndex = exerciseIndex + 1;

        /**
         * If next exercise is more than exercises in current round attempt to move to next round
         */
        if (nextExerciseIndex >= playlist[roundsIndex].length) {
            /**
             * If next round is more than total playlist
             */
            if (nextRoundsIndex >= playlist.length) {
                onEndWorkout()
            } else {
                /**
                 * If next round is not more than total playlist, move to next round and restart exercises
                 */
                setRoundsIndex(nextRoundsIndex);
                setExerciseIndex(0);
                setExerciseDuration(getExercise(nextRoundsIndex, 0).duration.value);
                setIntervalModalDescription(workoutsConstants.playMessages.NEXT_ROUND);
                setIntervalModalTime(workout.roundsInterval);
                setShowIntervalModal(true);
            }
        } else {
            /**
             * If next exercise is more not than exercises in current round, move to next exercise
             */
            setExerciseIndex(nextExerciseIndex);
            setExerciseDuration(getExercise(roundsIndex, nextExerciseIndex).duration.value);
            setIntervalModalTime(workout.exerciseInterval);
            setShowIntervalModal(true);
        }

    };

    /**
     * Seek through fits
     */
    const seekBackwardCircuit = () => {

        const prevExerciseIndex = exerciseIndex - 1;

        if (prevExerciseIndex >= 0) {
            setExerciseIndex(prevExerciseIndex);
            setExerciseDuration(getExercise(roundsIndex, prevExerciseIndex).duration.value);
        } else {
            setExerciseIndex(0);
        }
    };

    /**
     * Get exercise
     * @returns {*}
     */
    const getExercise = (roundsIndexValue = roundsIndex, exerciseIndexValue = exerciseIndex) => {

        let exercise;

        if (type === workoutsConstants.workoutType.CIRCUIT) {
            exercise = getExerciseCircuit(roundsIndexValue, exerciseIndexValue)
        } else {
            exercise = getExerciseRepsAndSets(exerciseIndexValue)
        }

        return exercise;
    }

    /**
     * Get duration for either an exercise in CIRCUIT or in a SET
     * @returns {*}
     */
    const getDuration = (roundsIndexValue = roundsIndex, exerciseIndexValue = exerciseIndex) => {

        let duration;

        if (type === workoutsConstants.workoutType.CIRCUIT) {
            duration = getExerciseCircuit(roundsIndexValue, exerciseIndexValue).duration
        } else {
            duration = getExerciseRepsAndSets(exerciseIndexValue).sets[setIndex].duration
        }

        return duration;
    }

    /**
     * Get the exercise for Circuit
     */
    const getExerciseCircuit = (roundsIndexValue = roundsIndex, exerciseIndexValue = exerciseIndex) => {
        return playlist[roundsIndexValue][exerciseIndexValue];
    }

    /**
     * Get the exercise for Reps and Sets
     */
    const getExerciseRepsAndSets = (exerciseIndexValue = exerciseIndex) => {
        return playlist[exerciseIndexValue];
    }

    return (
        <div className="relative rounded-md">
            {shouldPlayWorkout && type === workoutsConstants.workoutType.CIRCUIT ? <p className="font-semibold text-center mb-2">{sectionHeader}</p> : null}
            {list.map((exercise, index) =>
                <Exercise
                    isActive={getExercise().id === exercise.id && shouldPlayWorkout}
                    key={index}
                    exercise={exercise}
                    setIndex={setIndex}
                    duration={getDuration()}
                    timeLeft={exerciseDuration}
                    workoutType={type}/>
            )}

            {shouldPlayWorkout && !showIntervalModal ?
                <div className="mb-8 fixed left-0 right-0 bottom-0 m-auto flex flex-row justify-center">
                    <Controls prev={seekBackward}
                              pause={() => onPauseWorkout(false)}
                              next={seekForward}
                              isPlaying={shouldPlayWorkout}/>
                </div> : null}

            {shouldPlayWorkout && showIntervalModal ?
                <IntervalModal
                    description={intervalModalDescription}
                    intervalTime={intervalModalTime}
                    onFinish={() => {
                        setShowIntervalModal(false)
                        setIntervalModalDescription("")
                    }}/> : null}
        </div>
    );
};

export default WorkoutPlaylist;
