/* eslint-disable */
import React, {useState} from "react";
import EmptyState from "../../assets/svg/empty_state.svg";
import ExerciseCard from "../cards/ExerciseCard";
import PreviewExercise from "../modals/exercise/PreviewExercise";

const ExerciseGalleryList = ({emptyListMessage, exercises, onClick}) => {

    const [currentExercise, setCurrentExercise] = useState(null)

    /**
     * Handle tag click
     */
    const onClickHandler = (item) => {
        onClick(item.id);
    };

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentExercise(null)
    }

    return (
        <>
            <p className="text-sm sm:text-md md:text-lg font-light">{`${exercises.length} exercises`}</p>
            {exercises.length > 0 ?
                <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                    {exercises.map((item, index) => {
                        return (
                            <div className="relative" key={index} onClick={() => onClickHandler(item)}>
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

export default ExerciseGalleryList;
