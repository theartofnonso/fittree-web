import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {createWorkout, updateWorkout} from "../../../features/auth/authUserWorkoutsSlice";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {sortWorkouts} from "../../../utils/workout/workoutsHelperFunctions";
import utilsConstants from "../../../utils/utilsConstants";
import {capitaliseWords} from "../../../utils/general/utils";
import awsConstants from "../../../utils/aws-utils/awsConstants";
import CloseIcon from "../../svg/close-line.svg";
import CloseIconWhite from "../../svg/close-line-white.svg";
import EditIcon from "../../svg/edit-2-line-white.svg";
import PageDescription from "../../views/PageDescription";
import BodyParts from "../../views/BodyParts";
import Equipments from "../../views/Equipments";
import ExerciseGallery from "../../views/ExerciseGallery";
import InputNumber from "../../views/InputValue";
import InputTime from "../../views/InputTime";
import AddIcon from "../../svg/add-line-white.svg";
import Compressor from "compressorjs";
import {constructWorkoutMetadata} from "../../../schemas/workoutMetadata";
import SelectDuration from "../../views/SelectDuration";
import Error from "../../views/snackbars/Error";
import Loading from "../../utils/Loading";
import {uploadAndDeleteS3} from "../../../utils/aws-utils/awsHelperFunctions";


export default function CreateWorkout({params, user, exercises, workoutToEdit, open, close}) {

    if (!open) {
        return null;
    }

    const inputFileRef = useRef()

    const dispatch = useDispatch();

    const workout = null //useSelector(state => selectWorkoutById(state, params.id));

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
    const [workoutExercisesCount, setWorkoutExercisesCount] = useState(0); // Needed to track changes
    const [selectedExercises, setSelectedExercises] = useState(() => {
        const workoutExercises = workout ? sortWorkouts(workout, exercises) : [];
        setWorkoutExercisesCount(workoutExercises.length);
        return workoutExercises;
    });
    const [deletedExerciseIds, setDeletedExerciseIds] = useState([]);

    /**
     * Number of rounds
     */
    const [rounds, setRounds] = useState(workout ? workout.rounds : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ONE);

    /**
     * Rest interval after sets
     */
    const [roundsInterval, setRoundsInterval] = useState(workout ? workout.roundsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_MILLISECONDS);

    /**
     * Rest interval after sets
     */
    const [setsInterval, setSetsInterval] = useState(workout ? workout.setsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_MILLISECONDS);

    /**
     * Exercise interval
     */
    const [exerciseInterval, setExerciseInterval] = useState(workout ? workout.exerciseInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_MILLISECONDS);

    /**
     * Thumbnail URI
     */
    const [uri, setUri] = useState(workout ? workout.thumbnailUrl : null);
    const [selectedFile, setSelectedFile] = useState();

    /**
     * Thumbnail display
     */
    const [removeThumbnail, setRemoveThumbnail] = useState(false);

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Handle opening and closing Exercise gallery
     */
    const [openExerciseGallery, setOpenExerciseGallery] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handle selected file
     */
    useEffect(() => {
        if (selectedFile) {
            new Compressor(selectedFile, {
                quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
                success: (compressedFile) => {
                    // compressedResult has the compressed file.
                    // Use the compressed file to upload the images to your server.
                    const objectURL = URL.createObjectURL(compressedFile);
                    setUri(objectURL);
                },
            });
            // return () => URL.revokeObjectURL(objectURL);
        }
    }, [selectedFile]);

    /**
     * Get the workout type
     * @returns {*}
     */
    const getWorkoutType = () => {
        return params.workoutType;
    };

    /**
     * Check if workoutExercises have changes
     */
    const didWorkoutExerciseValuesChange = () => {

        /**
         *  Check if user removed any WorkoutExercises
         */
        if (deletedExerciseIds.length > 0) {
            return true;
        }

        /**
         *  Check if user added any WorkoutExercises
         */
        if (workoutExercisesCount !== selectedExercises.length) {
            return true;
        }
    };

    /**
     * Close this screen
     */
    const checkForAccidentalClose = () => {

    };

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
                return constructWorkoutMetadata(id)
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
     *
     * @param duration
     * @param currentExercise
     */
    const onChangeDuration = (duration, currentExercise) => {
        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return constructWorkoutMetadata(currentExercise.exerciseId, duration)
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
     * Open image picker
     * @returns {Promise<void>}
     */
    const pickImage = async () => {

    };

    /**
     * Handle file upload
     */
    const selectFile = () => {
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
     * Remove selected thumbnail
     */
    const removeThumbnailDisplay = () => {
        if (uri) {
            setUri(null);
        }
        setRemoveThumbnail(true);
    };

    /**
     * Handle thumbnail display
     */
    const handleThumbnailDisplay = () => {
        if (workout || uri) {
            setThumbnailOptionsModalVisible(true)
        } else {
            pickImage()
        }
    }

    /**
     * Perform sanity checks on required details and call createWorkoutHandler
     */
    const doCreateWorkout = async () => {
        setIsLoading(true)
        if (title.trim().length === 0) {
            setShowSnackBar(true)
            setSnackbarMessage("Please provide a title")
        } else {
            try {
                await createWorkoutHelper();
                setIsLoading(false)
                close()
            } catch (err) {
                console.log(err)
                setIsLoading(false)
                setShowSnackBar(true)
                setSnackbarMessage("Oops! unable to create workout at this time")
            }
        }
    };

    /**
     * Upload default thumbnail
     * @returns {Promise<string>}
     */
    const getDefaultThumbnail = () => {

    };

    /**
     * Create a workout and upload it to DynamoDB
     */
    const createWorkoutHelper = async () => {

        let thumbnail;

        if (workout) {
            thumbnail = workout.thumbnailUrl;
        } else {
            thumbnail = await uploadAndDeleteS3(uri, awsConstants.awsStorage.folders.THUMBNAILS, null, "jpg")
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
            duration: getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? calCircuitDuration() : calRepsSetsDuration(),
            workoutExercises: selectedExercises.map(item => JSON.stringify(item)),
            thumbnailUrl: thumbnail,
            preferred_username: user.preferred_username,
            type: getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? workoutsConstants.workoutType.CIRCUIT : workoutsConstants.workoutType.REPS_SETS,
        };

        console.log(payload)

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
     * Display thumbnail
     * @returns {JSX.Element|null}
     */
    const displayThumbnail = () => {
        if (removeThumbnail) {
            return null;
        }
        if (uri) {
            return <img src={uri} alt="Workout Thumbnail" className="object-cover h-full w-full"/>;
        } else if (workout) {
            return <img src={"https://" + workout.thumbnailUrl} alt="Workout Thumbnail"
                        className="object-cover h-full w-full"/>
        }
        return null;
    };

    return (
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-white overflow-y-scroll ">
            <div className="my-4 cursor-pointer" onClick={close}>
                <CloseIcon/>
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
                                <td className="flex flex-row justify-end">
                                    <div className="bg-primary rounded hover:bg-darkPrimary p-0.5 m-1" hidden>
                                        <EditIcon/>
                                    </div>
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
                           onSelectTime={(value) => setExerciseInterval(value)}/>
                <InputNumber title="Sets Interval"
                             value={setsInterval}
                             open={(selectedExercises.length > 0) && getWorkoutType() === workoutsConstants.workoutType.REPS_SETS}
                             onSelectValue={(value) => setSetsInterval(value)}/>
                <div className={`${rounds > 1 ? "outline outline-gray2 outline-1 p-2 rounded-md mt-2" : ""}`}>
                    <InputNumber title="Rounds"
                                 value={rounds}
                                 open={(selectedExercises.length > 1) && getWorkoutType() === workoutsConstants.workoutType.CIRCUIT}
                                 onSelectValue={(value) => setRounds(value)}/>
                    <InputTime title="Rounds Interval"
                               value={roundsInterval}
                               open={rounds > 1}
                               onSelectTime={(value) => setRoundsInterval(value)}/>
                </div>
                <div className="my-4 relative h-60 w-60 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer">
                    {displayThumbnail()}
                    <div
                        className="flex flex-row items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparentBlack1 to-transparentBlack hover:bg-transparentBlack1">
                        {uri ?
                            <button
                                type="button"
                                onClick={selectFile}
                                className="flex flex-row items-center justify-center">
                                <EditIcon/>
                            </button> :
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
                className="mt-2 mb-2 bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">Create
            </button>
            {isLoading ? <Loading message={"Creating workout"}/> : null}
            <Error
                open={showSnackBar}
                close={() => setShowSnackBar(false)}
                message={snackbarMessage}/>
        </div>
    )
}
