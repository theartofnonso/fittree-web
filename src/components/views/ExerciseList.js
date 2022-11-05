/* eslint-disable */
import React, {useState} from "react";
import EmptyState from "../svg/empty_state.svg";
import ExerciseCard from "../cards/ExerciseCard";
import PreviewExercise from "../modals/exercise/PreviewExercise";

const ExerciseList = ({emptyListMessage, exercises}) => {

    const [currentExercise, setCurrentExercise] = useState(null)

    /**
     * Preview exercise information
     */
    const previewExercise = (selectedExercise) => {
        setCurrentExercise(selectedExercise)
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentExercise(null)
    }

    return (
        <>
            <p className="text-sm sm:text-md md:text-lg font-light">{`${exercises.length} workouts`}</p>
            {exercises.length > 0 ?
                <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                    {exercises.map((item, index) => {
                        return (
                            <div key={index} onClick={() => previewExercise(item)}>
                                <ExerciseCard exercise={item}/>
                            </div>
                        );
                    })}
                </div> :
                <div className="flex flex-col justify-center items-center h-screen">
                    <EmptyState/>
                    <p className="font-normal mt-4">{emptyListMessage}</p>
                </div>}
            <PreviewExercise
                exercise={currentExercise}
                close={closePreview}/>
        </>
    );
};

export default ExerciseList;
