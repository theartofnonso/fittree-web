/* eslint-disable */
import React, {useState} from "react";
import EmptyState from "../../assets/svg/empty_state.svg";
import ExerciseCard from "../cards/ExerciseCard";
import PreviewExercise from "../screens/exercise/PreviewExercise";

const ExerciseList = ({exercises, emptyListMessage}) => {

    console.log(exercises)

    const [exercise, setExercise] = useState(null)

    /**
     * Preview exercise information
     */
    const previewExercise = (selectedExercise) => {
        setExercise(selectedExercise)
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setExercise(null)
    }

    return (
        <>
            <p className="text-sm sm:text-md md:text-lg font-light">{`${exercises.length} exercises`}</p>
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
            {exercise ? <PreviewExercise
                exerciseId={exercise.id}
                close={closePreview}/> : null}
        </>
    );
};

export default ExerciseList;
