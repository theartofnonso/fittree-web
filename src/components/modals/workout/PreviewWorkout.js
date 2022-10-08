/* eslint-disable */
import React, {useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import CloseIcon from "../../svg/close-line.svg";
import PlayIcon from "../../svg/play-mini-fill.svg";
import previewExercise from "../exercise/PreviewExercise";
import PreviewExercise from "../exercise/PreviewExercise";

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
            className="container mx-auto px-2 sm:px-10 absolute top-0 right-0 bottom-0 left-0 h-screen w-screen bg-white">
            <button className="my-4" onClick={close}>
                <CloseIcon/>
            </button>
            <WorkoutCardBig workout={workout}/>
            <div>
                <pre className="my-4 font-light">{workout.description}</pre>
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
            <button onClick={playWorkout}
                    className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8">
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
