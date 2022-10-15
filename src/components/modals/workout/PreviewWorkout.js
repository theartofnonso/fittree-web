/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import CloseIcon from "../../svg/close-line.svg";
import PlayIcon from "../../svg/play-mini-fill.svg";
import PreviewExercise from "../exercise/PreviewExercise";
import WorkoutCard from "../../cards/WorkoutCard";

const PreviewWorkout = ({workout, play, close}) => {

    const [currentExercise, setCurrentExercise] = useState(null)

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        play()
    };

    /**
     * Preview exercise information
     */
    const playExercise = (exercise) => {
        setCurrentExercise(exercise)
    }

    return (
        <div
            className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white">
            <button className="my-4" onClick={close}>
                <CloseIcon/>
            </button>
            <div className="grid sm:gap-3 grid-cols-1 sm:grid-cols-2 sm:h-1/2">
                <div>
                    <WorkoutCardBig workout={workout}/>
                    <p className="my-4 font-light break-words whitespace-pre-line">{workout.description}</p>
                    <button
                        onClick={playWorkout}
                        className="mb-8 w-full bg-primary rounded-sm py-2 px-10 text-white font-medium hover:bg-darkPrimary hidden sm:block">Play
                        workout
                    </button>
                </div>

                <div className="p-2 sm:bg-secondary/25 overflow-y-scroll rounded-xs">
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
            </div>
            <button onClick={playWorkout}
                    className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                <PlayIcon/>
            </button>
            {currentExercise ?
                <PreviewExercise
                    exercise={currentExercise}
                    close={() => setCurrentExercise(null)}/> : null}
        </div>
    );
};

export default PreviewWorkout;
