/* eslint-disable */
import React, {useEffect, useState} from "react";
import WorkoutCardBig from "../../views/cards/WorkoutCardBig";
import WorkoutExerciseCard from "../../views/cards/WorkoutExerciseCard";
import CloseIcon from "../../../assets/svg/close-line.svg";
import PlayIcon from "../../../assets/svg/play-mini-fill.svg";
import PlayWorkout from "./PlayWorkout";
import OverflowIcon from "../../../assets/svg/overflow.svg";
import CreateWorkout from "./CreateWorkout";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkout, selectWorkoutById, updateWorkout} from "../../../features/auth/authWorkoutsSlice";
import {selectWorkoutById as unauthSelectWorkoutById} from "../../../features/unauth/unAuthWorkoutsSlice"
import {isValidWorkout} from "../../../utils/workout/workoutsHelperFunctions";
import Loading from "../../utils/Loading";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {selectAuthUser} from "../../../features/auth/authUserSlice";

const PreviewWorkout = ({workoutId, close}) => {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    /**
     * Monitors the workout from store
     * @type {unknown}
     */
    const workoutFromStore = user ? useSelector(state => selectWorkoutById(state, workoutId)) : useSelector(state => unauthSelectWorkoutById(state, workoutId));

    const [workout, setWorkout] = useState(() => {
        return {
            ...workoutFromStore,
            workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise))//sortWorkouts(workoutFromStore, exercises),
        }
    })

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("")

    /**
     * Show snackbar
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");


    /**
     * Only set the workout when one from store changes
     * Such scenarios include: Lite updates i.e. going live or not
     */
    useEffect(() => {
        if (workoutFromStore) {
            const enrichedWorkout = {
                ...workoutFromStore,
                workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise)) //sortWorkouts(workoutFromStore, exercises),
            };
            setWorkout(enrichedWorkout);
        }
    }, [workoutFromStore]);

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        const isValid = isValidWorkout(workout)
        if (isValid) {
            setShouldPlayWorkout(true)
        } else {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.ERROR)
            setSnackbarMessage("This workout has no exercises to play")
        }
    };

    /**
     * Stop the appropriate workout
     */
    const stopWorkout = () => {
        setShouldPlayWorkout(false)
    };

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
        if (!workout.isLive) {
            setIsLoading(true)
            setLoadingMessage("Deleting workout")
            try {
                await deleteWorkoutHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                setIsLoading(false)
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.ERROR)
                setSnackbarMessage("Oops! unable to delete workout at this moment")
            }
        } else {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Remove workout from live before deleting it")
        }

    };

    /**
     * Handle going live with a workout or removing it
     * @returns {Promise<boolean>}
     */
    const goLiveOrRemoveHelper = async () => {
        if (!workout.isLive) {
            const isValid = isValidWorkout(workout)
            if (!isValid) {
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.WARN)
                setSnackbarMessage("Please add exercises before going live")
                return false;
            }
        }
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
            if (isLive) {
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.SUCCESS)
                setSnackbarMessage("Workout is live")
            }
        } catch (err) {
            setIsLoading(false)
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.ERROR)
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
                    {user ?
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
                <WorkoutCardBig workout={workout}/>
                <div className="overscroll-contain">
                    <p className="my-4 font-light break-words whitespace-pre-line">{workout.description}</p>
                </div>
                <div className="pb-2">
                    <div className="flex flex-row items-center mb-4">
                        <div
                            className={`flex flex-row items-center px-2 outline outline-2 bg-secondary text-primary ${workout.type === workoutsConstants.workoutType.CIRCUIT ? "rounded-l" : "rounded"} text-xs font-semibold`}>{workout.workoutExercises.length} exercises
                        </div>
                        {workout.type === workoutsConstants.workoutType.CIRCUIT ?
                            <div
                                className="flex flex-row items-center ml-1.5 px-2 outline outline-2 bg-secondary text-primary rounded-r text-xs font-semibold">
                                {workout.rounds} Rounds
                            </div> : null}
                    </div>
                    <div>
                        {workout.workoutExercises.map((workoutExercise, index) =>
                            <WorkoutExerciseCard
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

                {isLoading ? <Loading message={loadingMessage}/> : null}

                <SnackBar
                    open={showSnackBar}
                    close={() => setShowSnackBar(false)}
                    message={snackbarMessage}
                    type={snackbarType}/>
            </div>

            {openCreateWorkout ?
                <CreateWorkout
                    close={() => setOpenCreateWorkout(false)}
                    params={{workoutId: workout.id, workoutType: workout.type}}/> : null}

            <PlayWorkout workout={workout}
                         shouldPlay={shouldPlayWorkout}
                         onEnd={stopWorkout}/>
        </>
    );
};

export default PreviewWorkout;
