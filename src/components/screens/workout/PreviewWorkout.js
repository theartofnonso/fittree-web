/* eslint-disable */
import React, {useEffect, useState} from "react";
import CloseIcon from "../../../assets/svg/close-line.svg";
import PlayIcon from "../../../assets/svg/play-mini-fill.svg";
import CreateWorkout from "./CreateWorkout";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkout, selectWorkoutById} from "../../../features/auth/authWorkoutsSlice";
import {selectWorkoutById as unauthSelectWorkoutById} from "../../../features/unauth/unAuthWorkoutsSlice"
import {
    generateWorkoutLink,
    isValidWorkout,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout
} from "../../../utils/workout/workoutsHelperFunctions";
import Loading from "../../utils/Loading";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import WorkoutPlaylist from "../../views/WorkoutPlaylist";
import utilsConstants, {FITTREE_BASE_URL} from "../../../utils/utilsConstants";
import WorkoutCompletedModal from "./WorkoutCompletedModal";
import {Transition} from '@headlessui/react'
import Tags from "../../views/Tags";
import MenuItem from "../../views/MenuItem";
import Menu from "../../views/Menu";
import OverflowIcon from "../../../assets/svg/overflow.svg";
import WorkoutCard from "../../views/cards/WorkoutCard";
import Link from "next/link";
import WorkoutCardLarge from "../../views/cards/WorkoutCardLarge";

const PreviewWorkout = ({workoutId, previewOnly, close}) => {

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
            workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise))
        }
    })

    const [isWorkoutPlaying, setIsWorkoutPlaying] = useState(false)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("")

    const [minimiseScreen, setMinimiseScreen] = useState(false)

    /**
     * Show snackbar
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const loadWorkouts = () => {
        let items;
        if (workout.type === workoutsConstants.workoutType.CIRCUIT) {
            items = loadCircuitWorkout(workout);
        } else {
            items = loadRepsAndSetsWorkout(workout);
        }
        return items
    }

    const [roundsOrExercises, setRoundsOrExercises] = useState(() => loadWorkouts())

    const [showWorkoutCompletedModal, setShowWorkoutCompletedModal] = useState(false)

    /**
     * Only set the workout when one from store changes
     * Such scenarios include: Lite updates i.e. going live or not
     */
    useEffect(() => {
        if (workoutFromStore) {
            const enrichedWorkout = {
                ...workoutFromStore,
                workoutExercises: workoutFromStore.workoutExercises.map(exercise => JSON.parse(exercise))
            };
            setWorkout(enrichedWorkout);
        }
    }, [workoutFromStore]);

    /**
     * Only set the roundsOrExercises when workout has been updated with the workout from store
     */
    useEffect(() => {
        if (workout) {
            let newItems;
            if (workout.type === workoutsConstants.workoutType.CIRCUIT) {
                newItems = loadCircuitWorkout(workout);
            } else {
                newItems = loadRepsAndSetsWorkout(workout);
            }
            setRoundsOrExercises(newItems);
        }
    }, [workout]);

    /**
     * Play the appropriate workout
     */
    const playWorkout = () => {
        const isValid = isValidWorkout(workout)
        if (isValid) {
            setShouldPlayWorkout(true)
            setIsWorkoutPlaying(true)
            setMinimiseScreen(true)
        } else {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.ERROR)
            setSnackbarMessage("This workout has no exercises to play")
        }
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
    };

    /**
     * copy shareable link
     */
    const copyWorkoutLink = () => {
        navigator.clipboard.writeText(generateWorkoutLink(workoutId)).then(() => {
            setSnackbarType(SnackBarType.SUCCESS)
            setSnackbarMessage("Link copied")
            setShowSnackBar(true)
        });
    }

    /**
     * Reset the state of the workout preview state
     */
    const resetWorkoutPlayState = () => {
        setShouldPlayWorkout(false)
        setIsWorkoutPlaying(false)
        setMinimiseScreen(false)
    }

    if (openCreateWorkout) {
        return (
            <CreateWorkout
                close={() => setOpenCreateWorkout(false)}
                params={{workoutId: workout.id, workoutType: workout.type}}/>
        )
    } else {

        if (showWorkoutCompletedModal) {
            return (<WorkoutCompletedModal close={() => {
                setShowWorkoutCompletedModal(false)
                resetWorkoutPlayState()
            }}/>)
        } else {
            return (
                <div
                    className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
                    <div className="flex flex-row items-center place-content-between my-4">
                        {isWorkoutPlaying ?
                            <button
                                type="button"
                                onClick={resetWorkoutPlayState}
                                className="cursor-pointer bg-secondary py-2 px-6 rounded-full text-primary text-sm font-semibold hover:bg-darkSecondary">End
                                workout
                            </button> :
                            (previewOnly) ?
                                <Link href={FITTREE_BASE_URL + workout.preferred_username}>
                                    <a className="text-sm font-medium bg-secondary text-primary rounded-full px-3 py-2">
                                        Shared by {workout.preferred_username}
                                    </a>
                                </Link>
                                : <div className="cursor-pointer" onClick={close}>
                                    <CloseIcon/>
                                </div>}
                        <Menu open={showMenuOptions}
                              icon={<OverflowIcon/>}
                              onMouseOver={() => setShowMenuOptions(true)}
                              onMouseLeave={() => setShowMenuOptions(false)}>
                            <MenuItem label={minimiseScreen ? "Fullscreen" : "Workout mode"}
                                      onClick={() => {
                                          setMinimiseScreen(!minimiseScreen)
                                          setShowMenuOptions(false)
                                      }}
                                      isActive={true}
                            />
                            <MenuItem label="Share"
                                      onClick={() => {
                                          copyWorkoutLink()
                                          setShowMenuOptions(false)
                                      }}
                                      isActive={true}
                            />
                            <MenuItem label="Edit"
                                      onClick={() => {
                                          setOpenCreateWorkout(true)
                                          setShowMenuOptions(false)
                                      }}
                                      isActive={user && !shouldPlayWorkout}/>
                            <MenuItem label="Delete"
                                      onClick={() => {
                                          doDeleteWorkout()
                                          setShowMenuOptions(false)
                                      }}
                                      isHighlighted={true}
                                      isActive={user && !shouldPlayWorkout}/>
                        </Menu>
                    </div>

                    <div className="mb-2">
                        <WorkoutCardLarge workout={workout}/>
                    </div>

                    <Transition
                        show={!minimiseScreen}
                        className="font-light break-words whitespace-pre-line text-sm overflow-auto my-3 space-y-3"
                        enter="transition-height duration-500"
                        enterFrom="h-0 opacity-0"
                        enterTo="h-24 opacity-100"
                        leave="transition-height duration-500"
                        leaveFrom="h-24 opacity-100"
                        leaveTo="h-0 opacity-0">
                        <p>{workout.description || utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_DESCRIPTION}</p>
                        {!minimiseScreen ? <Tags items={workout.bodyParts} emptyState={"No body parts trained"}
                                                 containerStyle="flex flex-row text-sm overflow-x-scroll"/> : null}
                        {!minimiseScreen ? <Tags items={workout.equipments} emptyState={"No equipment"}
                                                 containerStyle="flex flex-row text-sm overflow-x-scroll"/> : null}
                    </Transition>

                    <WorkoutPlaylist shouldPlayWorkout={shouldPlayWorkout}
                                     shouldResetWorkout={!shouldPlayWorkout}
                                     onPauseWorkout={(shouldPlay) => {
                                         setShouldPlayWorkout(shouldPlay)
                                     }}
                                     onEndWorkout={() => {
                                         // Navigate to a workout completed screen
                                         setShowWorkoutCompletedModal(true)
                                     }}
                                     workout={workout}
                                     playlist={roundsOrExercises}/>

                    {!shouldPlayWorkout ?
                        <div onClick={playWorkout}
                             className="flex flex-row items-center justify-center bg-primary rounded-md w-14 h-14 sm:w-20 sm:h-20 fixed bottom-0 right-0 mr-8 mb-8 hover:bg-darkPrimary sm:hidden">
                            <PlayIcon/>
                        </div> : null}

                    {!shouldPlayWorkout ?
                        <button
                            type="button"
                            onClick={playWorkout}
                            className="mb-4 w-full bg-primary rounded-3xl py-2 px-10 text-white font-medium hover:bg-darkPrimary hidden sm:block">
                            {isWorkoutPlaying ? "Continue workout" : "Start workout"}
                        </button> : null}

                    {isLoading ? <Loading message={loadingMessage}/> : null}

                    <SnackBar
                        open={showSnackBar}
                        close={() => setShowSnackBar(false)}
                        message={snackbarMessage}
                        type={snackbarType}/>
                </div>
            );
        }

    }
};

export default PreviewWorkout;
