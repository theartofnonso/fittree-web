import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createWorkout, selectWorkoutById, updateWorkout} from "../../../features/auth/authWorkoutsSlice";
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
import {selectAllExercises} from "../../../features/auth/authExercisesSlice";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import SelectValue from "../../views/SelectValue";
import {useLeavePageConfirm} from "../../../utils/general/hooks";
import Modal from "../../views/modal";

export default function CreateWorkout({params, close}) {

    const user = useSelector(selectAuthUser);

    const inputFileRef = useRef()

    const dispatch = useDispatch();

    const exercises = useSelector(selectAllExercises)

    const workout = useSelector(state => selectWorkoutById(state, params.workoutId));

    /**
     * Title
     */
    const [title, setTitle] = useState(workout ? workout.title : "");

    /**
     * Description
     */
    const [description, setDescription] = useState(workout ? workout.description : "");

    /**
     * Intensity Level
     */
    const [intensityLevel, setIntensityLevel] = useState(workout ? workout.intensityLevel : workoutsConstants.intensityLevels.Beginner);

    /**
     * Body Parts
     */
    const [selectedBodyParts, setSelectedBodyParts] = useState(workout ? workout.bodyParts : []);

    /**
     * Equipment
     */
    const [selectedEquipments, setSelectedEquipments] = useState(workout ? workout.equipments : []);

    /**
     * Workout exercises
     */
    const [selectedExercises, setSelectedExercises] = useState(() => workout ? sortWorkouts(workout, exercises) : []);
    const [deletedExerciseIds, setDeletedExerciseIds] = useState([]);

    /**
     * Number of rounds
     */
    const [rounds, setRounds] = useState(workout ? workout.rounds : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ONE);

    /**
     * Rest interval after sets
     */
    const [roundsInterval, setRoundsInterval] = useState(workout ? workout.roundsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO);

    /**
     * Rest interval after sets
     */
    const [setsInterval, setSetsInterval] = useState(workout ? workout.setsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO);

    /**
     * Exercise interval
     */
    const [exerciseInterval, setExerciseInterval] = useState(workout ? workout.exerciseInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO);

    /**
     * Thumbnail URI
     */
    const [uri, setUri] = useState(workout ? workout.thumbnailUrl : "");
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Show snackbar message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarType, setSnackbarType] = useState("")

    /**
     * Handle opening and closing Exercise gallery
     */
    const [openExerciseGallery, setOpenExerciseGallery] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [openExitScreenModal, setOpenExitScreenModal] = useState(false)

    /**
     * Handle selected file
     */
    useEffect(() => {
        let objectURL;
        if (selectedFile) {
            new Compressor(selectedFile, {
                quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedFile) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.
                    objectURL = URL.createObjectURL(compressedFile);
                    setUri(objectURL);
                },
            });
        }
        return () => URL.revokeObjectURL(objectURL);
    }, [selectedFile]);

    /**
     * Get the workout type
     * @returns {*}
     */
    const getWorkoutType = () => {
        return params.workoutType;
    };

    /**
     * Determine new changes differ from old workout
     * @returns {boolean}
     */
    const hasWorkoutChanged = () => {

        /**
         * Extract necessary fields from workout
         */
        const {
            title: _title,
            description: _description,
            intensityLevel: _intensityLevel,
            bodyParts: _bodyParts,
            equipments: _equipments,
            workoutExercises: _workoutExercises,
            exerciseInterval: _exerciseInterval,
            setsInterval: _setsInterval,
            rounds: _rounds,
            roundsInterval: _roundsInterval,
            thumbnailUrl: _thumbnailUrl
        } = workout

        const prevState = {
            title: _title,
            description: _description,
            intensityLevel: _intensityLevel,
            bodyParts: _bodyParts,
            equipments: _equipments,
            workoutExercises: _workoutExercises,
            exerciseInterval: _exerciseInterval,
            setsInterval: _setsInterval,
            rounds: _rounds,
            roundsInterval: _roundsInterval,
            thumbnailUrl: _thumbnailUrl
        }

        /**
         * Capture recent changes
         * @type {{intensityLevel: (string|*|string), equipments: (*|*[]), setsInterval: (number|*|number), workoutExercises: string[], description: (*|string), exerciseInterval: (number|*|number), roundsInterval: (number|*|number), title: (*|string), bodyParts: (*|*[]), rounds: (*|number)}}
         */
        const changes = {
            title: title,
            description: description,
            intensityLevel: intensityLevel,
            bodyParts: selectedBodyParts,
            equipments: selectedEquipments,
            workoutExercises: selectedExercises.map(item => JSON.stringify(item)),
            exerciseInterval: exerciseInterval,
            setsInterval: setsInterval,
            rounds: rounds,
            roundsInterval: roundsInterval,
            thumbnailUrl: uri
        }

        /**
         * Convert both objects to JSON for easy comparison and compare
         * @type {string}
         */
        const prevStateJSON = JSON.stringify(prevState)
        const changesJSON = JSON.stringify(changes)

        return prevStateJSON !== changesJSON
    }

    /**
     * Check changes to page when creating a new workout
     * @returns {boolean}
     */
    const hasPageBeenPopulated = () => {
        const changes = {
            hasTitle: title !== "",
            hasDescription: description !== "",
            hasIntensityLevel: intensityLevel !== workoutsConstants.intensityLevels.Beginner,
            hasExerciseInterval: exerciseInterval > 0,
            hasSetsInterval: setsInterval > 0,
            hasRounds: rounds > 1,
            hasRoundsInterval: roundsInterval > 0,
            hasBodyParts: selectedBodyParts.length > 0,
            hasEquipments: selectedEquipments.length > 0,
            hasWorkoutExercises: selectedExercises.length > 0,
            hasUri: uri !== ""
        }

        for (const property in changes) {
            if (changes[property]) {
                return true
            }
        }
        return false;
    }

    /**
     * Close this screen
     */
    const shouldConfirmLeavePage = () => workout ? hasWorkoutChanged() : hasPageBeenPopulated()

    /**
     * Not certain if this function is necessary
     */
    useLeavePageConfirm(shouldConfirmLeavePage(), "Are you sure you want to leave?")

    /**
     * Store the selected equipment
     * @param values
     */
    const selectEquipmentHandler = values => {
        setSelectedEquipments(values);
    };

    /**
     * Close the exercise gallery
     */
    const closeExerciseGallery = selectedExerciseIds => {
        setOpenExerciseGallery(false);
        if (selectedExerciseIds.length > 0) {
            const selectedExercises = selectedExerciseIds.map(id => {
                return constructWorkoutExercises(id)
            });
            setSelectedExercises(prevValues => [...prevValues, ...selectedExercises]);
        }
    };

    /**
     * Remove Exercise from table
     */
    const removeWorkoutExercise = (currentExercise) => {
        storeRemovedWorkoutExercises(currentExercise);
        const others = selectedExercises.filter(value => value.exerciseId !== currentExercise.exerciseId);
        setSelectedExercises(others);
        if (others.length <= 1) {
            setExerciseInterval(0);
        }
    };

    /**
     * Collate all deleted workout exercises
     * @param removedExercise
     */
    const storeRemovedWorkoutExercises = (removedExercise) => {
        const exercises = Array.from(new Set(deletedExerciseIds).add(removedExercise.id));
        setDeletedExerciseIds([...exercises]);
    };

    /**
     * Update the workout exercise duration
     * @param duration
     * @param currentExercise
     */
    const onChangeDuration = (duration, currentExercise) => {
        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return updateDuration(duration, currentExercise)
            }
            return exercise;
        });

        setSelectedExercises(selectedExerciseObjects);
    }

    /**
     * Update the workout exercise set
     * @param sets
     * @param currentExercise
     */
    const onChangeSets = (sets, currentExercise) => {
        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return updateSets(sets, currentExercise)
            }
            return exercise;
        });

        setSelectedExercises(selectedExerciseObjects);
    }

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
    const selectFile = () => {
        inputFileRef.current.click();
    };

    /**
     * Remove thumbnail
     */
    const removeThumbnailFile = () => {
        setUri(null)
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
     * Perform sanity checks on required details and call createWorkoutHandler
     */
    const doCreateWorkout = async () => {
        if (title.trim().length === 0) {
            setShowSnackBar(true)
            setSnackbarType(SnackBarType.WARN)
            setSnackbarMessage("Please provide a title")
        } else {
            setIsLoading(true)
            try {
                await createWorkoutHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                setIsLoading(false)
                setShowSnackBar(true)
                setSnackbarType(SnackBarType.ERROR)
                const message = workout ? "Oops! unable to edit workout at this moment" : "Oops! unable to create workout at this moment"
                setSnackbarMessage(message)
            }
        }
    };

    /**
     * Calculate workout duration
     * @returns {*}
     */
    const calWorkoutDuration = () => {
        if (selectedExercises.length > 0) {
            return getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? calCircuitDuration() : calRepsSetsDuration()
        }
        return 0
    }

    /**
     * Create a workout and upload it to DynamoDB
     */
    const createWorkoutHelper = async () => {

        let thumbnail = "";

        /**
         * User is editing a workout
         */
        if (workout && workout.thumbnailUrl) {
            /**
             * User has selected new thumbnail
             */
            if (uri && uri !== workout.thumbnailUrl) {
                thumbnail = await uploadAndDeleteS3(uri, awsConstants.awsStorage.folders.THUMBNAILS, workout.thumbnailUrl, "jpg")
                /**
                 * reuse old thumbnail
                 */
            } else {
                thumbnail = workout.thumbnailUrl
            }
            /**
             * User is creating new workout
             * @type {string}
             */
        } else {
            /**
             * User has selected a new thumbnail
             */
            if (uri) {
                thumbnail = await uploadAndDeleteS3(uri, awsConstants.awsStorage.folders.THUMBNAILS, null, "jpg")
            }
        }

        const payload = {
            creatorId: user.id,
            title: capitaliseWords(title.trim()),
            description: description.length > 0 ? description.trim() : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_DESCRIPTION,
            intensityLevel: intensityLevel ? intensityLevel : workoutsConstants.intensityLevels.Beginner,
            bodyParts: selectedBodyParts,
            equipments: selectedEquipments,
            rounds: rounds > 0 ? rounds : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ONE,
            roundsInterval: roundsInterval > 0 ? roundsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            exerciseInterval: exerciseInterval > 0 ? exerciseInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            setsInterval: setsInterval > 0 ? setsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            duration: calWorkoutDuration(),
            workoutExercises: selectedExercises.map(item => JSON.stringify(item)),
            thumbnailUrl: thumbnail,
            preferred_username: user.preferred_username,
            type: getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? workoutsConstants.workoutType.CIRCUIT : workoutsConstants.workoutType.REPS_SETS,
        };

        if (workout) {
            return dispatch(updateWorkout({...workout, ...payload})).unwrap();
        }

        return dispatch(createWorkout(payload)).unwrap();

    };

    /**
     * Helper function to display appropriate RepsOrTimeValue
     * @returns {number|*}
     * @param exercise
     */
    const displayExerciseTitle = (exercise) => {
        const foundExercise = exercises.find(item => item.id === exercise.exerciseId);
        return foundExercise.title;
    };

    /**
     * Calculate the duration of an exercise
     * @param totalDuration
     * @param exercise
     * @returns {*}
     */
    const calcExerciseDuration = (totalDuration, exercise) => {
        let exerciseDuration = exercise.duration.type === workoutsConstants.duration.REPS ? exercise.duration.value * 3000 : exercise.duration.value;
        if (getWorkoutType() === workoutsConstants.workoutType.REPS_SETS) {
            const duration = exerciseDuration * exercise.sets;
            const totalSetsInterval = (exercise.sets - 1) * setsInterval;
            exerciseDuration += duration + totalSetsInterval;
        }
        return totalDuration + exerciseDuration;
    };

    /**
     * Calculate how long to do a Circuit workout
     * @returns {*}
     */
    const calCircuitDuration = () => {
        let totalRoundsDuration = 0;
        for (let i = 0; i < rounds; i++) {
            const totalExerciseDuration = selectedExercises.reduce(calcExerciseDuration, 0);
            const totalExerciseInterval = (selectedExercises.length - 1) * exerciseInterval;
            const circuitDuration = totalExerciseDuration + totalExerciseInterval;
            totalRoundsDuration += circuitDuration;
        }
        const totalRoundsInterval = (rounds - 1) * roundsInterval;
        return totalRoundsDuration + totalRoundsInterval;
    };

    /**
     * Calculate how long to do a Reps/Sets workout
     * @returns {*}
     */
    const calRepsSetsDuration = () => {
        const totalExerciseDuration = selectedExercises.reduce(calcExerciseDuration, 0);
        const totalExerciseInterval = (selectedExercises.length - 1) * exerciseInterval;
        return totalExerciseDuration + totalExerciseInterval;
    };

    /**
     * Close the Create workout screen
     */
    const closeScreen = () => {
        setOpenExitScreenModal(false)
        close()
    }

    return (
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-white overflow-y-scroll ">
            <div className="my-4 flex flex-row place-content-between">
                <div className="cursor-pointer" onClick={() => {
                    const shouldConfirm = shouldConfirmLeavePage();
                    shouldConfirm ? setOpenExitScreenModal(shouldConfirm) : close()
                }}>
                    <CloseIcon/>
                </div>
            </div>
            <PageDescription
                title={getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? workoutsConstants.workoutType.circuitInfo.title : workoutsConstants.workoutType.repsSetsInfo.title}
                description="Curate exercises into a workout"/>
            <div className="mt-4 flex flex-col">
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
                    placeholder="Tell us more about this workout"
                    value={description}
                    maxLength={250}
                    onChange={event => setDescription(event.target.value)}
                />
                <div className="relative border-none my-2">
                    <select
                        value={intensityLevel}
                        onChange={(event) => setIntensityLevel(event.target.value)}
                        className="block appearance-none w-full bg-gray2 text-gray-700 py-3 px-4 pr-8 rounded "
                        id="grid-state">
                        <option>{workoutsConstants.intensityLevels.Beginner}</option>
                        <option>{workoutsConstants.intensityLevels.Intermediate}</option>
                        <option>{workoutsConstants.intensityLevels.Advanced}</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                <BodyParts prevValues={selectedBodyParts} onSelect={selectBodyPartsHandler}/>
                <Equipments
                    prevEquipments={selectedEquipments}
                    onSelect={selectEquipmentHandler}/>
                <table
                    className="table-auto outline outline-gray2 outline-1 p-2 rounded-md mt-4 border-separate border-spacing-2">
                    <thead className="">
                    <tr className="text-left">
                        <th>Title</th>
                        <th>Time/Reps</th>
                        {getWorkoutType() === workoutsConstants.workoutType.REPS_SETS ? <th>Sets</th> : null}
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedExercises.map((exercise, index) => {
                        return (
                            <tr key={index}>
                                <td>{displayExerciseTitle(exercise)}</td>
                                <td>
                                    <SelectDuration
                                        onChange={(duration) => onChangeDuration(duration, exercise)}
                                        prevDuration={exercise.duration}
                                        showReps={true}/>
                                </td>
                                {getWorkoutType() === workoutsConstants.workoutType.REPS_SETS ?
                                    <td>
                                        <SelectValue onChange={(sets) => onChangeSets(sets, exercise)}
                                                     prevValue={exercise.sets}/>
                                    </td> : null}
                                <td className="flex flex-row justify-end">
                                    <div onClick={() => removeWorkoutExercise(exercise)}
                                         className="bg-primary rounded hover:bg-darkPrimary p-0.5 m-1">
                                        <CloseIconWhite/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <ExerciseGallery open={openExerciseGallery}
                                 close={closeExerciseGallery}
                                 selectedExercises={selectedExercises}/>
                <button
                    type="button"
                    onClick={() => setOpenExerciseGallery(true)}
                    className="flex flex-row items-center justify-center bg-primary rounded hover:bg-darkPrimary text-white py-1 w-40 mt-2 font-semibold">
                    Select Exercise
                </button>
                <InputTime title="Exercise Interval"
                           value={exerciseInterval}
                           open={selectedExercises.length > 1}
                           onSelectTime={(duration) => setExerciseInterval(duration.value)}/>
                <InputTime title="Sets Interval"
                           value={setsInterval}
                           open={(selectedExercises.length > 0) && getWorkoutType() === workoutsConstants.workoutType.REPS_SETS}
                           onSelectTime={(duration) => setSetsInterval(duration.value)}/>
                <div className={`${rounds > 1 ? "outline outline-gray2 outline-1 p-2 rounded-md mt-2" : ""}`}>
                    <InputValue title="Rounds"
                                value={rounds}
                                open={(selectedExercises.length > 1) && getWorkoutType() === workoutsConstants.workoutType.CIRCUIT}
                                onSelectValue={(value) => setRounds(value)}/>
                    <InputTime title="Rounds Interval"
                               value={roundsInterval}
                               open={rounds > 1}
                               onSelectTime={(duration) => setRoundsInterval(duration.value)}/>
                </div>
                <div className="my-4 relative h-60 w-60 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer">
                    <img src={formatThumbnailUri(uri)} alt="Workout Thumbnail"
                         className="object-cover h-full w-full"/>
                    <div
                        className="flex flex-row items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1">
                        {uri ?
                            <div className="flex flex-row">
                                <button
                                    type="button"
                                    onClick={selectFile}
                                    className="flex flex-row items-center justify-center mx-4">
                                    <EditIcon/>
                                </button>
                                <button
                                    type="button"
                                    onClick={removeThumbnailFile}
                                    className="flex flex-row items-center justify-center mx-4">
                                    <DeleteIcon/>
                                </button>
                            </div>
                            :
                            <button
                                type="button"
                                onClick={selectFile}
                                className="flex flex-row items-center justify-center">
                                <AddIcon/>
                            </button>}
                    </div>
                    <input type='file' id='file' accept="image/png, image/jpeg" ref={inputFileRef}
                           style={{display: 'none'}}
                           onChange={handleSelectedFile}/>
                </div>
            </div>
            <button
                type="button"
                onClick={doCreateWorkout}
                className="mt-2 mb-2 bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">{workout ? "Update workout" : "Create workout"}
            </button>
            <Modal
                open={openExitScreenModal}
                title={"Unsaved changes"}
                message={"You have unsaved changes. Are you sure you want to leave?"}
                actionPositive={{title: "No", action: () => setOpenExitScreenModal(false)}}
                actionNegative={{title: "Yes", action: closeScreen}}/>
            {isLoading ? <Loading message={workout ? "Updating workout" : "Creating workout"}/> : null}
            <SnackBar
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={snackbarMessage}
                type={snackbarType}/>
        </div>
    )
}
