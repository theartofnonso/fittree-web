/* eslint-disable */
import React, {useEffect, useState} from "react";
import Exercise from "./cards/Exercise";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const ExerciseList = ({exercises, list, workout, rounds, round, type}) => {

    const [exerciseDuration, setExerciseDuration] = useState(list[0][0].duration.value);

    const [exerciseIndex, setExerciseIndex] = useState(0);

    const [roundsIndex, setRoundsIndex] = useState(0);

    const [setIndex, setSetIndex] = useState(0);

    const [paused, togglePaused] = useState(false);

    const [showIntervalModal, setShowIntervalModal] = useState(true);

    const sectionHeader = type === workoutsConstants.workoutType.CIRCUIT ? `- Round ${roundsIndex + 1} -` : "Exercises";

    /**
     * Automate the workout
     */
    useEffect(() => {

        let intervalId = null;

        // if (showIntervalModal) return;

        if (!paused) {
            intervalId = setInterval(() => {
                if (getExercise().duration.type !== workoutsConstants.duration.REPS) {
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
     * Seek forward
     */
    const seekForward = () => {
        if(type === workoutsConstants.workoutType.CIRCUIT) {
            seekForwardCircuit()
        } else {
            seekForwardRepsAndSets()
        }
    }

    /**
     * Seek backward
     */
    const seekBackward = () => {
        if(type === workoutsConstants.workoutType.CIRCUIT) {
            seekBackwardCircuit()
        } else {
            seekBackwardRepsAndSets()
        }
    }

    /**
     * Seek through exercises and sets
     */
    const seekForwardRepsAndSets = () => {

        const nextExerciseIndex = exerciseIndex + 1;
        const nextSetIndex = setIndex + 1;

        if (nextSetIndex >= exercises[exerciseIndex].length) {
            if (nextExerciseIndex >= exercises.length) {
                //setShowWorkoutCompletedModal(true);
            } else {
                setExerciseIndex(nextExerciseIndex);
                setSetIndex(0);
                setExerciseDuration(exercises[nextExerciseIndex][0].duration.value);
                //setIntervalModalDescription(workoutsConstants.playMessages.NEXT_EXERCISE);
                //setIntervalModalTime(workout.exerciseInterval);
                setShowIntervalModal(true);
            }
        } else {
            setSetIndex(nextSetIndex);
            setExerciseDuration(getExercise().duration.value);
            //setIntervalModalTime(workout.setsInterval);
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

        if (nextExerciseIndex >= rounds[roundsIndex].length) {
            if (nextRoundsIndex >= rounds.length) {
                //setShowWorkoutCompletedModal(true)
            } else {
                setRoundsIndex(nextRoundsIndex);
                setExerciseIndex(0);
                setExerciseDuration(rounds[nextRoundsIndex][0].duration.value);
                //setIntervalModalDescription(workoutsConstants.playMessages.NEXT_ROUND);
                //setIntervalModalTime(workout.roundsInterval);
                setShowIntervalModal(true);
            }
        } else {
            setExerciseIndex(nextExerciseIndex);
            setExerciseDuration(getExercise().duration.value);
            //setIntervalModalTime(workout.exerciseInterval);
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
        } else {
            setExerciseIndex(0);
        }
    };

    /**
     * Get exercise
     * @returns {*}
     */
    const getExercise = () => type === workoutsConstants.workoutType.CIRCUIT ? getExerciseCircuit() : getExerciseRepsAndSets()

    /**
     * Get the exercise for Circuit
     */
    const getExerciseCircuit = () => list[roundsIndex][exerciseIndex];

    /**
     * Get the exercise for Reps and Sets
     */
    const getExerciseRepsAndSets = () => exercises[exerciseIndex][setIndex];

    return (
        <div className="my-2 rounded-md text-center">
            <p className="font-semibold">{sectionHeader}</p>
            {list[0].map((exercise, index) =>
                <Exercise
                    isActive={getExercise().id === exercise.id}
                    key={index}
                    data={exercise}
                    type={type}/>
            )}
        </div>
    );
};

export default ExerciseList;
