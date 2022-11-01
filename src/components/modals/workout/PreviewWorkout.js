/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import CloseIcon from "../../svg/close-line.svg";
import PlayIcon from "../../svg/play-mini-fill.svg";
import PreviewExercise from "../exercise/PreviewExercise";
import WorkoutPlayer from "../../views/WorkoutPlayer";

const PreviewWorkout = ({workout, close}) => {

    if (!workout) {
        return null;
    }

    const [currentExercise, setCurrentExercise] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        setShouldPlayWorkout(true)
    };

    /**
     * Stop the appropriate workout
     */
    const stopWorkout = () => {
        setShouldPlayWorkout(false)
    };

    /**
     * Preview exercise information
     */
    const playExercise = (exercise) => {
        setCurrentExercise(exercise)
    }

    return (
        <>
            <div
                className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
                <div className="my-4" onClick={close}>
                    <CloseIcon/>
                </div>
                <WorkoutCardBig workout={workout}/>
                <div className="overscroll-contain">
                    <p className="my-4 font-light break-words whitespace-pre-line">{workout.description}</p>
                </div>
                <div className="pb-2">
                    <p className="mb-2 font-semibold">{workout.workoutExercises.length} exercises</p>
                    <div>
                        {workout.workoutExercises.map((workoutExercise, index) =>
                            <WorkoutExerciseCard
                                onClick={() => playExercise(workoutExercise.exercise)}
                                key={index}
                                workoutExercise={workoutExercise}
                                type={workout.type}/>
                        )}
                    </div>
                </div>
                <div onClick={playWorkout}
                     className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                    <PlayIcon/>
                </div>
                <button
                    type="button"
                    onClick={playWorkout}
                    className="mb-8 w-full bg-primary rounded-3xl py-2 px-10 text-white font-medium hover:bg-darkPrimary hidden sm:block">Play
                    workout
                </button>

                <PreviewExercise
                    exercise={currentExercise}
                    close={() => setCurrentExercise(null)}/>
            </div>

            <WorkoutPlayer workout={workout} shouldPlay={shouldPlayWorkout} onEnd={stopWorkout}/>
        </>
    );
};

export default PreviewWorkout;
