/* eslint-disable */
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectAllExercises} from "../../features/auth/authUserExercisesSlice";
import {searchExerciseOrWorkout} from "../../utils/workoutAndExerciseUtils";
import ExerciseGalleryList from "./ExerciseGalleryList";
import CloseIcon from "../svg/close-line.svg";

const ExerciseGallery = ({items, open, close}) => {

    if(!open) {
        return;
    }

    const exercises = useSelector(selectAllExercises);

    const [filteredExercises, setFilteredExercises] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Load fetched exercises
     */
    useEffect(() => {
        if (exercises) {
            const remainingExercises = exercises.filter(exercise => !items.some(selectedExercise => selectedExercise.exerciseId === exercise.id));
            setFilteredExercises(remainingExercises)
        }
    }, [exercises]);

    /**
     * Handle click for Select group
     * @param selectedItemId
     */
    const onClickHandler = selectedItemId => {
        close([selectedItemId])
    };

    /**
     * Close this screen
     */
    const onCloseFitsGalleryHandler = () => close([]);

    /**
     * Filter exercises
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(filteredExercises, query);
        setFilteredExercises(searchResult);
    };

    return (
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-white overflow-y-scroll ">
            <div className="my-4 cursor-pointer" onClick={onCloseFitsGalleryHandler}>
                <CloseIcon/>
            </div>
            <div className="my-4 flex flex-col items-center">
                <input
                    className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="search"
                    placeholder="Search exercises"
                    value={searchQuery}
                    onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
            </div>
            <ExerciseGalleryList
                onClick={onClickHandler}
                exercises={filteredExercises}
                          emptyListMessage="You don't have any exercises yet"/>
        </div>
    );
};

export default ExerciseGallery;
