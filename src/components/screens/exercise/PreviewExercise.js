/* eslint-disable */
import React, {useEffect, useState} from "react";
import CloseIcon from "../../../assets/svg/close-line.svg";
import VideoCarousel from "../../views/VideoCarousel";
import OverflowIcon from "../../../assets/svg/overflow.svg";
import {useDispatch, useSelector} from "react-redux";
import {deleteExercise, selectExerciseById} from "../../../features/auth/authExercisesSlice";
import {selectExerciseById as unAuthSelectExerciseById} from "../../../features/unauth/unAuthExercisesSlice";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import Loading from "../../utils/Loading";
import CreateExercise from "./CreateExercise";
import {selectAuthUser} from "../../../features/auth/authUserSlice";

const PreviewExercise = ({exerciseId, close}) => {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    /**
     * Monitors the workout from store
     * @type {unknown}
     */
    const exerciseFromStore = user ? useSelector(state => selectExerciseById(state, exerciseId)) : useSelector(state => unAuthSelectExerciseById(state, exerciseId));

    const [exercise, setExercise] = useState(exerciseFromStore)

    /**
     * Show menu options
     */
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    const [openCreateExercise, setOpenCreateExercise] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("")

    /**
     * Show snackbar
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState("");


    /**
     * Only set the exercise when one from store changes
     * Such scenarios include: editing exercise
     */
    useEffect(() => {
        if (exerciseFromStore) {
            setExercise(exerciseFromStore);
        }
    }, [exerciseFromStore]);

    /**
     * Delete exercise
     * @returns {Promise<void>}
     */
    const deleteExerciseHelper = async () => {
        return dispatch(deleteExercise(exercise)).unwrap();
    };

    /**
     * Delete the exercise
     */
    const doDeleteExercise = async () => {
        setIsLoading(true)
        setLoadingMessage("Deleting exercise")
        try {
            await deleteExerciseHelper();
            setIsLoading(false)
            close()
        } catch (err) {
            setIsLoading(false)
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.ERROR)
            setSnackbarMessage("Oops! unable to delete exercise at this moment")
        }
    }


    return (
        <>
            <div
                className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-white overflow-y-scroll">
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
                                        onClick={() => setOpenCreateExercise(true)}
                                        className="py-2 hover:bg-secondary w-full rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Edit
                                    </div>
                                    <div
                                        onClick={doDeleteExercise}
                                        className="py-2 hover:bg-darkPrimary bg-primary w-full text-white rounded-b-md text-gray-700 block px-4 py-2 text-md text-left font-medium"
                                        role="menuitem" tabIndex="-1"
                                        id="menu-item-6">Delete
                                    </div>
                                </div>
                            </div> : null}
                        </div> : null}
                </div>
                <VideoCarousel videos={exercise ? exercise.videoUrls : []}/>
                <div className="my-4">
                    <p className="font-semibold text-xl text-left">{exercise.title}</p>
                    <p className="mt-4 font-light break-words whitespace-pre-line text-sm">{exercise.description}</p>
                </div>
                <div>
                    <div className="mb-4">
                        <p className="font-semibold">Body Parts</p>
                        <div className="flex flex-row flex-wrap text-sm">
                            {exercise.bodyParts.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Equipment</p>
                        <div className="flex flex-row flex-wrap text-sm">
                            {exercise.equipments.map((item, index) => <p key={index} className="mr-2">{item}</p>)}
                        </div>
                    </div>
                </div>

                {isLoading ? <Loading message={loadingMessage}/> : null}

                <SnackBar
                    open={showSnackBar}
                    close={() => setShowSnackBar(false)}
                    message={snackbarMessage}
                    type={snackbarType}/>

            </div>

            {openCreateExercise ?
                <CreateExercise
                    close={() => setOpenCreateExercise(false)}
                    params={{exerciseId: exercise.id}}/> : null}

        </>
    );
};

export default PreviewExercise;
