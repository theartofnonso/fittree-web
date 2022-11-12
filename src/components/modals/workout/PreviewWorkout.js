/* eslint-disable */
import React, {useEffect, useState} from "react";
import WorkoutCardBig from "../../cards/WorkoutCardBig";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import CloseIcon from "../../svg/close-line.svg";
import PlayIcon from "../../svg/play-mini-fill.svg";
import PreviewExercise from "../exercise/PreviewExercise";
import WorkoutPlayer from "../../views/WorkoutPlayer";
import OverflowIcon from "../../svg/overflow.svg";
import CreateWorkout from "./CreateWorkout";
import {useDispatch, useSelector} from "react-redux";
import {selectAllExercises} from "../../../features/auth/authUserExercisesSlice";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import {deleteWorkout, selectWorkoutById, updateWorkout} from "../../../features/auth/authUserWorkoutsSlice";
import {sortWorkouts} from "../../../utils/workout/workoutsHelperFunctions";
import Loading from "../../utils/Loading";
import Error from "../../views/snackbars/Error";
import Success from "../../views/snackbars/Success";

const PreviewWorkout = ({workoutId, close, isAuthUser}) => {

    const dispatch = useDispatch();

    const exercises = useSelector(selectAllExercises)

    /**
     * Monitors the workout from store
     * @type {unknown}
     */
    const workoutFromStore = useSelector(state => selectWorkoutById(state, workoutId));

    const [workout, setWorkout] = useState(() => {
        return {
            ...workoutFromStore,
            workoutExercises: sortWorkouts(workoutFromStore, exercises),
        }
    })

    const user = useSelector(selectAuthUser);

    const [currentExercise, setCurrentExercise] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("")

    /**
     * Show snackbar for err message
     */
    const [showSuccessSnackBar, setSuccessShowSnackBar] = useState(false)
    const [showErrorSnackBar, setShowErrorSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("");


    /**
     * Only set the workout when one from store changes
     * Such scenarios include: Lite updates i.e. going live or not
     */
    useEffect(() => {
        if (workoutFromStore) {
            const enrichedWorkout = {
                ...workoutFromStore,
                workoutExercises: sortWorkouts(workoutFromStore, exercises),
            };
            setWorkout(enrichedWorkout);
        }
    }, [workoutFromStore]);

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

    /**
     * Delete workout
     * @returns {Promise<void>}
     */
    const deleteWorkoutHelper = async () => {
        return dispatch(deleteWorkout(workout)).unwrap();
    };

    /**
     * Delete the workout
     */
    const doDeleteWorkout = async () => {
        if(!workout.isLive) {
            setIsLoading(true)
            setLoadingMessage("Deleting workout")
            try {
                await deleteWorkoutHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                setIsLoading(false)
                setShowErrorSnackBar(true)
                setSnackbarMessage("Oops! unable to delete workout at this moment")
            }
        } else {
            setShowErrorSnackBar(true)
            setSnackbarMessage("Remove workout from live before deleting it")
        }

    };

    /**
     * Handle going live with a workout or removing it
     * @returns {Promise<boolean>}
     */
    const goLiveOrRemoveHelper = async () => {
        const isLive = !workout.isLive
        const updatedWorkout = {...workout, isLive};
        delete updatedWorkout.workoutExercises;
        await dispatch(updateWorkout({
            id: workout.id,
            ...updatedWorkout,
            publishedAt: isLive ? new Date().toISOString() : null,
        })).unwrap();
        return isLive
    }

    /**
     * Go live with workout or remove it
     */
    const doGoLiveOrRemoveWorkout = async () => {
        setIsLoading(true)
        setLoadingMessage("Going live with workout")
        try {
            const isLive = await goLiveOrRemoveHelper();
            setIsLoading(false)
            if(isLive) {
                setSuccessShowSnackBar(true)
                setSnackbarMessage("Workout is live")
            }
        } catch (err) {
            setIsLoading(false)
            setShowErrorSnackBar(true)
            setSnackbarMessage("Oops! unable to go live with workout")
        }
    };


    return (
        <>
            <div
                className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
                <div className="flex flex-row items-center place-content-between">
                    <div className="my-4 cursor-pointer" onClick={close}>
                        <CloseIcon/>
                    </div>
                    {isAuthUser ?
                        <div className="relative cursor-pointer" onMouseOver={() => setShowMenuOptions(true)}
                             onMouseLeave={() => setShowMenuOptions(false)}>
                            <OverflowIcon/>
                            {showMenuOptions ? <div className="absolute text-left right-0 w-52 z-10">
                                <div
                                    className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div
                                        onClick={doGoLiveOrRemoveWorkout}
                                        className="py-2 hover:bg-secondary w-full rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">{workout.isLive ? "Remove" : "Go live"}
                                    </div>
                                    <div
                                        onClick={() => setOpenCreateWorkout(true)}
                                        className="py-2 hover:bg-secondary w-full rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Edit
                                    </div>
                                    <div
                                        onClick={doDeleteWorkout}
                                        className="py-2 hover:bg-darkPrimary bg-primary w-full text-white rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Delete
                                    </div>
                                </div>
                            </div> : null}
                        </div> : null}
                </div>
                <WorkoutCardBig workout={workout} isAuthUser={isAuthUser}/>
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

                {isLoading ? <Loading message={loadingMessage}/> : null}

                <Success
                    open={showSuccessSnackBar}
                    close={() => setSuccessShowSnackBar(false)}
                    message={snackbarMessage}/>

                <Error
                    open={showErrorSnackBar}
                    close={() => setShowErrorSnackBar(false)}
                    message={snackbarMessage}/>
            </div>

            <CreateWorkout
                open={openCreateWorkout}
                close={() => setOpenCreateWorkout(false)}
                user={user}
                exercises={exercises}
                params={{workoutId: workout.id, workoutType: workout.type}}/>

            <WorkoutPlayer workout={workout}
                           shouldPlay={shouldPlayWorkout}
                           onEnd={stopWorkout}/>
        </>
    );
};

export default PreviewWorkout;
