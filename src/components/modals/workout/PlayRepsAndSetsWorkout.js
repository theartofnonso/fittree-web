/* eslint-disable */
import React, {useEffect, useState} from "react";
import PlayWorkout from "./PlayWorkout";
import workoutsConstants from "../../../utils/workout/workoutsConstants";

const PlayRepsSetsWorkout = ({workout, exercises, end}) => {

    const [exerciseDuration, setExerciseDuration] = useState(exercises[0][0].duration.value);

    const [exerciseIndex, setExerciseIndex] = useState(0);

    const [setIndex, setSetIndex] = useState(0);

    const [showIntervalModal, setShowIntervalModal] = useState(true);

    const [intervalModalDescription, setIntervalModalDescription] = useState(workoutsConstants.playMessages.WORKOUT_STARTING);

    const [intervalModalTime, setIntervalModalTime] = useState(5000);

    const [paused, togglePaused] = useState(false);

    const [showWorkoutCompletedModal, setShowWorkoutCompletedModal] = useState(false)

    useEffect(() => {
        let intervalId = null;

        if (showIntervalModal) return;

        if (!paused) {
            intervalId = setInterval(() => {
                if (getWorkoutExercise().duration.type !== workoutsConstants.duration.REPS) {
                    if (exerciseDuration === 0) {
                        clearInterval(intervalId);
                        seekForward();
                    } else {
                        setExerciseDuration(prevValue => prevValue - 1000);
                    }
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [paused, showIntervalModal, exerciseDuration]);

    /**
     * Seek through fits
     */
    const seekForward = () => {

        const nextExerciseIndex = exerciseIndex + 1;
        const nextSetIndex = setIndex + 1;

        if (nextSetIndex >= exercises[exerciseIndex].length) {
            if (nextExerciseIndex >= exercises.length) {
                setShowWorkoutCompletedModal(true);
            } else {
                setExerciseIndex(nextExerciseIndex);
                setSetIndex(0);
                setExerciseDuration(exercises[nextExerciseIndex][0].duration.value);
                setIntervalModalDescription(workoutsConstants.playMessages.NEXT_EXERCISE);
                setIntervalModalTime(workout.exerciseInterval);
                setShowIntervalModal(true);
            }
        } else {
            setSetIndex(nextSetIndex);
            setExerciseDuration(getWorkoutExercise().duration.value);
            setIntervalModalTime(workout.setsInterval);
            setShowIntervalModal(true);
        }
    };

    /**
     * Seek through fits
     */
    const seekBackward = () => {
        const prevSetIndex = setIndex - 1;
        if (prevSetIndex >= 0) {
            setSetIndex(prevSetIndex);
        } else {
            setSetIndex(0);
        }
    };

    /**
     * Pause workout
     */
    const pauseWorkout = () => {
        togglePaused(true);
    };

    /**
     * Play workout
     */
    const playWorkout = () => {
        togglePaused(false);
    };

    /**
     * Navigate to Fit
     */
    const navigateToExercisePreview = () => {
        pauseWorkout();
    };

    /**
     * Get the workoutFit
     */
    const getWorkoutExercise = () => exercises[exerciseIndex][setIndex];

    /**
     * Get the next workoutExercise
     */
    const getNextWorkoutExercise = () => {
        const nextExerciseIndex = exerciseIndex + 1;

        if (nextExerciseIndex >= exercises.length) {
            return null; // No more sets
        } else {
            return exercises[nextExerciseIndex][0]; // New set
        }
    }

    return (
        <PlayWorkout
            data={exercises}
            progress={{setIndex, exerciseIndex}}
            workoutExercise={getWorkoutExercise()}
            nextWorkoutExercise={getNextWorkoutExercise()}
            previewExercise={navigateToExercisePreview}
            seekForward={seekForward}
            seekBackward={seekBackward}
            play={playWorkout}
            pause={pauseWorkout}
            isPaused={paused}
            close={end}
            type={workoutsConstants.workoutType.REPS_SETS}
            extraData={{exerciseDuration, exerciseExtras: `Set ${setIndex + 1} of ${getWorkoutExercise().sets}`}}
            interval={{duration: intervalModalTime, description: intervalModalDescription}}
            shouldPlayInterval={showIntervalModal}
            onFinishInterval={() => {
                setShowIntervalModal(false)
                setIntervalModalDescription("")
            }}
            onEnd={showWorkoutCompletedModal}/>
    );
};

export default PlayRepsSetsWorkout;
