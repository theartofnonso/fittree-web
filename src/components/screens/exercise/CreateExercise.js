import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createExercise, selectExerciseById, updateExercise} from "../../../features/auth/authUserExercisesSlice";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {formatThumbnailUri, sortWorkouts} from "../../../utils/workout/workoutsHelperFunctions";
import utilsConstants from "../../../utils/utilsConstants";
import {capitaliseWords} from "../../../utils/general/utils";
import awsConstants from "../../../utils/aws-utils/awsConstants";
import CloseIcon from "../../../assets/svg/close-line.svg";
import CloseIconWhite from "../../../assets/svg/close-line-white.svg";
import EditIcon from "../../../assets/svg/edit-2-line-white.svg";
import DeleteIcon from "../../../assets/svg/delete-bin-white-line.svg";
import PageDescription from "../../views/PageDescription";
import BodyParts from "../../views/BodyParts";
import Equipments from "../../views/Equipments";
import ExerciseGallery from "../../views/ExerciseGallery";
import InputValue from "../../views/InputValue";
import InputTime from "../../views/InputTime";
import AddIcon from "../../../assets/svg/add-line-white.svg";
import Compressor from "compressorjs";
import {constructWorkoutExercises, updateDuration, updateSets} from "../../../schemas/workoutExercises";
import SelectDuration from "../../views/SelectDuration";
import Loading from "../../utils/Loading";
import {uploadAndDeleteS3} from "../../../utils/aws-utils/awsHelperFunctions";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import {selectAllExercises} from "../../../features/auth/authUserExercisesSlice";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import SelectValue from "../../views/SelectValue";
import {useLeavePageConfirm} from "../../../utils/general/hooks";
import Modal from "../../views/modal";

export default function CreateExercise({params, close}) {

    const user = useSelector(selectAuthUser);

    const inputFileRef = useRef()

    const dispatch = useDispatch();

    const exercise = useSelector(state => selectExerciseById(state, params.exerciseId));

    /**
     * Title
     */
    const [title, setTitle] = useState(exercise ? exercise.title : "");

    /**
     * Description
     */
    const [description, setDescription] = useState(exercise ? exercise.description : "");

    /**
     * Body Parts
     */
    const [selectedBodyParts, setSelectedBodyParts] = useState(exercise ? exercise.bodyParts : []);

    /**
     * Equipment
     */
    const [selectedEquipments, setSelectedEquipments] = useState(exercise ? exercise.equipments : []);
    const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);

    /**
     * Video URIs
     */
    const [uris, setUris] = useState([null, null, null]);
    const [currentUriIndex, setCurrentUriIndex] = useState(-1)
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Show snackbar message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarType, setSnackbarType] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const [openExitScreenModal, setOpenExitScreenModal] = useState(false)

    /**
     * Handle selected file
     */
    useEffect(() => {
        if (selectedFile) {
            // Trim video and strip off audio
            setUris[currentUriIndex](selectedFile);
        }
    }, [selectedFile]);

    // /**
    //  * Determine new changes differ from old workout
    //  * @returns {boolean}
    //  */
    // const hasWorkoutChanged = () => {
    //
    //     /**
    //      * Extract necessary fields from workout
    //      */
    //     const {
    //         title: _title,
    //         description: _description,
    //         intensityLevel: _intensityLevel,
    //         bodyParts: _bodyParts,
    //         equipments: _equipments,
    //         workoutExercises: _workoutExercises,
    //         exerciseInterval: _exerciseInterval,
    //         setsInterval: _setsInterval,
    //         rounds: _rounds,
    //         roundsInterval: _roundsInterval,
    //         thumbnailUrl: _thumbnailUrl}  = workout
    //
    //     const prevState = {
    //         title: _title,
    //         description: _description,
    //         intensityLevel: _intensityLevel,
    //         bodyParts: _bodyParts,
    //         equipments: _equipments,
    //         workoutExercises: _workoutExercises,
    //         exerciseInterval: _exerciseInterval,
    //         setsInterval: _setsInterval,
    //         rounds: _rounds,
    //         roundsInterval: _roundsInterval,
    //         thumbnailUrl: _thumbnailUrl
    //     }
    //
    //     /**
    //      * Capture recent changes
    //      * @type {{intensityLevel: (string|*|string), equipments: (*|*[]), setsInterval: (number|*|number), workoutExercises: string[], description: (*|string), exerciseInterval: (number|*|number), roundsInterval: (number|*|number), title: (*|string), bodyParts: (*|*[]), rounds: (*|number)}}
    //      */
    //     const changes = {
    //         title: title,
    //         description: description,
    //         intensityLevel: intensityLevel,
    //         bodyParts: selectedBodyParts,
    //         equipments: selectedEquipments,
    //         workoutExercises: selectedExercises.map(item => JSON.stringify(item)),
    //         exerciseInterval: exerciseInterval,
    //         setsInterval: setsInterval,
    //         rounds: rounds,
    //         roundsInterval: roundsInterval,
    //         thumbnailUrl: uri
    //     }
    //
    //     /**
    //      * Convert both objects to JSON for easy comparison and compare
    //      * @type {string}
    //      */
    //     const prevStateJSON = JSON.stringify(prevState)
    //     const changesJSON = JSON.stringify(changes)
    //
    //     return prevStateJSON !== changesJSON
    // }
    //
    // /**
    //  * Check changes to page when creating a new workout
    //  * @returns {boolean}
    //  */
    // const hasPageBeenPopulated = () => {
    //     const changes = {
    //         hasTitle: title !== "",
    //         hasDescription: description !== "",
    //         hasIntensityLevel: intensityLevel !== workoutsConstants.intensityLevels.Beginner,
    //         hasExerciseInterval: exerciseInterval > 0 ,
    //         hasSetsInterval: setsInterval > 0,
    //         hasRounds: rounds > 1,
    //         hasRoundsInterval: roundsInterval > 0,
    //         hasBodyParts: selectedBodyParts.length > 0,
    //         hasEquipments: selectedEquipments.length > 0,
    //         hasWorkoutExercises: selectedExercises.length > 0,
    //         hasUri: uri !== ""
    //     }
    //
    //     for (const property in changes) {
    //         if(changes[property]) {
    //             return true
    //         }
    //     }
    //     return false;
    // }
    //
    // /**
    //  * Close this screen
    //  */
    // const shouldConfirmLeavePage = () => exercise ? hasWorkoutChanged() : hasPageBeenPopulated()
    //
    // /**
    //  * Not certain if this function is necessary
    //  */
    // useLeavePageConfirm(shouldConfirmLeavePage(), "Are you sure you want to leave?")

    /**
     * Store the selected equipment
     * @param values
     */
    const selectEquipmentHandler = values => {
        setSelectedEquipments(values);
    };

    /**
     * Handle select body part
     * @param values
     */
    const selectBodyPartsHandler = values => {
        setSelectedBodyParts(values);
    };

    /**
     * Open file explorer
     */
    const selectFile = (index) => {
        setCurrentUriIndex(index)
        inputFileRef.current.click();
    };

    /**
     * Handle selected file
     * @param event
     */
    const handleSelectedFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    /**
     * Close the Create workout screen
     */
    const closeScreen = () => {
        setOpenExitScreenModal(false)
        close()
    }

    return (
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-white overflow-y-scroll">
            <div className="my-4 cursor-pointer" onClick={() => {
                // const shouldConfirm = shouldConfirmLeavePage();
                // shouldConfirm ? setOpenExitScreenModal(shouldConfirm) : close()
                close()
            }}>
                <CloseIcon/>
            </div>
            <PageDescription
                title="Create Exercise"
                description="Create an 8 seconds exercise to demonstrate the movement"/>
            <div className="flex flex-row justify-start rounded-md h-96 bg-dustBlack overflow-x-scroll pr-8 lg:pr-0 my-4">
                {uris.map((item, index) => {
                    return (
                        <div key={index} className="inline-block grow w-64 h-64 mr-2 relative h-60 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer">
                            <img src={uris[0]} alt="Exercise video"
                                 className="object-cover h-full w-full"/>
                            <div
                                className="flex flex-row items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1">
                                {uris[0] ?
                                    <div className="flex flex-row">
                                        <button
                                            type="button"
                                            onClick={() => selectFile(index)}
                                            className="flex flex-row items-center justify-center mx-4">
                                            <EditIcon/>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex flex-row items-center justify-center mx-4">
                                            <DeleteIcon/>
                                        </button>
                                    </div>
                                    :
                                    <button
                                        type="button"
                                        onClick={() => selectFile(index)}
                                        className="flex flex-row items-center justify-center">
                                        <AddIcon/>
                                    </button>}
                            </div>
                            <input type='file' id='file' accept="video/*" ref={inputFileRef}
                                   style={{display: 'none'}}
                                   onChange={handleSelectedFile}/>
                        </div>
                    )
                })}
            </div>
            <div className="mt-2 flex flex-col">
                <input
                    className="appearance-none border-none w-5/6 bg-gray2 h-14 sm:h-18 rounded w-full py-2 px-3 my-2"
                    id="search"
                    type="text"
                    placeholder="What's the title "
                    value={title}
                    maxLength={35}
                    onChange={event => setTitle(event.target.value)}/>
                <textarea
                    className="appearance-none border-none w-full h-56 bg-gray2 rounded py-4 px-3 my-2 font-light "
                    placeholder="Tell us more about this exercise"
                    value={description}
                    maxLength={250}
                    onChange={event => setDescription(event.target.value)}
                />
                <BodyParts prevValues={selectedBodyParts} onSelect={selectBodyPartsHandler}/>
                <Equipments
                    prevEquipments={selectedEquipments}
                    onSelect={selectEquipmentHandler}/>
            </div>
            <button
                type="button"
                className="mt-4 mb-2 bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">{exercise ? "Update exercise" : "Create exercise"}
            </button>
            <Modal
                   open={openExitScreenModal}
                   title={"Unsaved changes"}
                   message={"You have unsaved changes. Are you sure you want to leave?"}
                   actionPositive={{title: "No", action: () => setOpenExitScreenModal(false)}}
                   actionNegative={{title: "Yes", action: closeScreen}}/>
            {isLoading ? <Loading message={exercise ? "Updating exercise" : "Creating exercise"}/> : null}
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={snackbarMessage}
                type={snackbarType}/>
        </div>
    )
}
