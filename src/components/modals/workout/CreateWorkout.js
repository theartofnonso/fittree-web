import React, {useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectAllExercises} from "../../../features/auth/authUserExercisesSlice";
import {selectAuthUser, userSliceEnums} from "../../../features/auth/authUserSlice";
import {createWorkout, selectWorkoutById, updateWorkout} from "../../../features/auth/authUserWorkoutsSlice";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {sortWorkouts, timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";
import utilsConstants from "../../../utils/utilsConstants";
import {capitaliseWords, generateCDNUrl, generateFileName} from "../../../utils/general/utils";
import awsConstants from "../../../utils/aws-utils/awsConstants";
import {displayEmptyBodyPartsInfo, displayEmptyEquipmentsInfo} from "../../../utils/workoutAndExerciseUtils";
import CloseIcon from "../../svg/close-line.svg";
import CloseIconWhite from "../../svg/close-line-white.svg";
import EditIcon from "../../svg/edit-2-line-white.svg";
import PageDescription from "../../views/PageDescription";
import BodyParts from "../../views/BodyParts";
import Equipments from "../../views/Equipments";
import ExerciseGallery from "../../views/ExerciseGallery";


export default function CreateWorkout({params, user, exercises, workoutToEdit, open, close}) {

    if (!open) {
        return null;
    }

    const router = useRouter()

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
    const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);

    /**
     * Workout exercises
     */
    const [currentExercise, setCurrentExercise] = useState(null);
    const [workoutExercisesCount, setWorkoutExercisesCount] = useState(0); // Needed to track changes
    const [selectedExercises, setSelectedExercises] = useState(() => {
        const workoutExercises = workout ? sortWorkouts(workout, exercises) : [];
        setWorkoutExercisesCount(workoutExercises.length);
        return workoutExercises;
    });
    const [deletedExerciseIds, setDeletedExerciseIds] = useState([]);
    const [isExerciseGalleryVisible, setIsExerciseGalleryVisible] = useState(false);

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
    const [uri, setUri] = useState(null);

    /**
     * Thumbnail display
     */
    const [removeThumbnail, setRemoveThumbnail] = useState(false);

    /**
     * Loading state
     */
    const [loadingStatus, setLoadingStatus] = useState(userSliceEnums.STATUS_IDLE);

    /**
     * Timers for a exercises in a workout
     */
    const [timeModalVisible, setTimeModalVisible] = useState(false);

    /**
     * Timers for a exercises in a workout
     */
    const [repsModalVisible, setRepsModalVisible] = useState(false);

    /**
     * Count modal
     */
    const [roundsModalVisible, setRoundsModalVisible] = useState(false);

    /**
     * Exercise Interval input modal
     */
    const [exerciseIntervalModalVisible, setExerciseIntervalModalVisible] =
        useState(false);

    /**
     * Sets Interval input modal
     */
    const [setsIntervalModalVisible, setSetsIntervalModalVisible] =
        useState(false);

    /**
     * Rounds Interval input modal
     */
    const [roundsIntervalModalVisible, setRoundsIntervalModalVisible] =
        useState(false);

    /**
     * Sets count input modal
     */
    const [setsModalVisible, setSetsModalVisible] =
        useState(false);

    /**
     * Show snackbar for err message
     */
    const [errSnackbarVisible, setErrSnackbarVisible] = useState(false);
    const [errSnackbarMessage, setErrSnackbarMessage] = useState("");

    /**
     * Options modal for setting either reps or time
     */
    const [tableOptionsModalVisible, setTableOptionsModalVisible] = useState(false);

    /**
     * Options modal
     */
    const [thumbnailOptionsModalVisible, setThumbnailOptionsModalVisible] = useState(false);

    /**
     * Handle opening and closing Exercise gallery
     */
    const [openExerciseGallery, setOpenExerciseGallery] = useState(false)

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
        setEquipmentModalVisible(false);
    };

    /**
     * Close the modal
     */
    const closeExercisesGallery = selectedExerciseIds => {
        setOpenExerciseGallery(false);
        if (selectedExerciseIds.length > 0) {
            const selectedExerciseObjects = selectedExerciseIds.map(id => {
                return {
                    exerciseId: id,
                    ...generateInitialValues(),
                };
            });
            setSelectedExercises(prevValues => [...prevValues, ...selectedExerciseObjects]);
        }
    };

    /**
     * Generate initial values for an exercise
     */
    const generateInitialValues = () => {
        if (getWorkoutType() === workoutsConstants.workoutType.CIRCUIT) {
            return {
                repsOrTime: workoutsConstants.exerciseInfo.TIME,
                repsOrTimeValue: utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_MILLISECONDS,
            };
        } else {
            return {
                repsOrTime: workoutsConstants.exerciseInfo.TIME,
                repsOrTimeValue: utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_MILLISECONDS,
                sets: utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ONE,
            };
        }
    };

    /**
     * Remove Exercise from table
     */
    const removeWorkoutExercise = () => {
        storeRemovedWorkoutExercises(currentExercise);
        const others = selectedExercises.filter(value => value.exerciseId !== currentExercise.exerciseId);
        setSelectedExercises(others);
        setTableOptionsModalVisible(false);
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
     * Open the modal
     */
    const openWorkoutTableOptionsModal = exercise => {
        setCurrentExercise(exercise);
        setTableOptionsModalVisible(true);
    };

    /**
     * Close the modal
     */
    const closeRepsOrTimeOptionsModal = () => {
        setTableOptionsModalVisible(false);
    };

    /**
     * Close the modal
     */
    const closeOptionsModal = () => {
        setThumbnailOptionsModalVisible(false);
    };

    /**
     * Open the modal
     */
    const openTimeModal = () => {
        setTableOptionsModalVisible(false);
        setTimeModalVisible(true);
    };

    /**
     * Open the modal
     */
    const openRepsModal = () => {
        setTableOptionsModalVisible(false);
        setRepsModalVisible(true);
    };

    /**
     * Update the exercises and close the modal
     */
    const selectTimeHandler = value => {
        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return {
                    ...exercise,
                    repsOrTime: workoutsConstants.exerciseInfo.TIME,
                    repsOrTimeValue: value,
                };
            }
            return exercise;
        });
        setSelectedExercises(selectedExerciseObjects);
        setCurrentExercise(null);
        setTimeModalVisible(false);
    };

    /**
     * Update the exercises and close the modal
     */
    const selectRepsHandler = value => {
        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return {
                    ...exercise,
                    repsOrTime: workoutsConstants.exerciseInfo.COUNT,
                    repsOrTimeValue: value,
                };
            }
            return exercise;
        });
        setSelectedExercises(selectedExerciseObjects);
        setCurrentExercise(null);
        setRepsModalVisible(false);
    };

    /**
     * Set the rounds count
     */
    const selectRoundsHandler = value => {
        if (value <= 1) {
            setRoundsInterval(0);
        }
        setRounds(value);
        setRoundsModalVisible(false);
    };

    /**
     * Close the exercise seconds modal
     * @param value
     */
    const selectExerciseIntervalModal = value => {
        setExerciseIntervalModalVisible(false);
        setExerciseInterval(value);
    };

    /**
     * Close the rounds seconds modal
     * @param data
     */
    const selectSetsIntervalModal = data => {
        setSetsIntervalModalVisible(false);
        setSetsInterval(data);
    };

    /**
     * Close the rounds seconds modal
     * @param data
     */
    const selectRoundsIntervalModal = data => {
        setRoundsIntervalModalVisible(false);
        setRoundsInterval(data);
    };

    /**
     * Open the modal
     */
    const openSetsModal = () => {
        if (currentExercise.repsOrTimeValue) {
            setTableOptionsModalVisible(false);
            setSetsModalVisible(true);
        } else {
            setTableOptionsModalVisible(false);
            setErrSnackbarMessage("Please set Reps or duration first");
            setErrSnackbarVisible(true);
        }
    };

    /**
     * Close the sets counts seconds modal
     * @param value
     */
    const selectSetsHandler = value => {

        const selectedExerciseObjects = selectedExercises.map(exercise => {
            if (exercise.exerciseId === currentExercise.exerciseId) {
                return {
                    ...exercise,
                    sets: value,
                };
            }
            return exercise;
        });
        setSelectedExercises(selectedExerciseObjects);
        setCurrentExercise(null);
        setSetsModalVisible(false);
    };

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
     * Remove selected thumbnail
     */
    const removeThumbnailDisplay = () => {
        if (uri) {
            setUri(null);
        }
        setRemoveThumbnail(true);
        setThumbnailOptionsModalVisible(false);
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
        if (title.trim().length === 0) {
            showAlert("Please provide a title");
        } else {
            try {
                await createWorkoutHelper();
            } catch (err) {
                setLoadingStatus(userSliceEnums.STATUS_IDLE);
                setErrSnackbarMessage("Oops! unable to create workout at this time");
                setErrSnackbarVisible(true);
            }
        }
    };

    /**
     * Upload selected thumbnail
     * @returns {Promise<string>}
     */
    const getThumbnailFromUri = async () => {
        const blobResponse = await fetch(uri);
        const blob = await blobResponse.blob();

        const thumbnailFileName = generateFileName("jpg");

        const s3Response = await Storage.put(
            awsConstants.awsStorage.folders.THUMBNAILS + "/" + thumbnailFileName,
            blob,
        );

        return generateCDNUrl(s3Response.key);
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
        if (loadingStatus === userSliceEnums.STATUS_IDLE) {

            setLoadingStatus(userSliceEnums.STATUS_PENDING);

            let thumbnail;

            if (workout && uri) {
                thumbnail = await getThumbnailFromUri();
            } else if (workout && !uri) {
                /**
                 * Check if user removed thumbnail
                 */
                thumbnail = removeThumbnail ? getDefaultThumbnail() : workout.thumbnailUrl;
            } else if (!workout && uri) {
                thumbnail = await getThumbnailFromUri();
            } else {
                thumbnail = getDefaultThumbnail();
            }

            const payload = {
                creatorId: user.id,
                title: capitaliseWords(title.trim()),
                description: description.length > 0 ? description.trim() : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_DESCRIPTION,
                intensityLevel: intensityLevel ? intensityLevel : workoutsConstants.intensityLevels.Beginner,
                bodyParts: selectedBodyParts.length > 0 ? displayEmptyBodyPartsInfo(selectedBodyParts) : [utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_BODYPART],
                equipments: selectedEquipments.length > 0 ? displayEmptyEquipmentsInfo(selectedEquipments) : [utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_EQUIPMENT],
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

            if (workout) {
                return dispatch(updateWorkout({...workout, ...payload})).unwrap();
            }

            return dispatch(createWorkout(payload)).unwrap();

        }
    };

    /**
     * Display alert for empty workout information
     */
    const showAlert = errorMessage => {

    };

    /**
     * Display alert for accidental close
     */
    const showCloseScreenAlert = () => {

    };

    /**
     * Display exercise information for Circuits
     * @param exercise
     * @returns {string}
     */
    const displayCircuitExerciseInfo = (exercise) => {
        let displayText = "Tap to set!";

        if (exercise) {
            if (exercise.repsOrTimeValue) {
                if (exercise.repsOrTime === workoutsConstants.exerciseInfo.COUNT) {
                    displayText = exercise.repsOrTimeValue + " " + timeOrReps(exercise.repsOrTime);
                } else {
                    if (exercise.repsOrTimeValue > 60000) {
                        displayText = Math.floor(exercise.repsOrTimeValue / 60000) + " " + workoutsConstants.exerciseInfo.duration.MINS;
                    } else {
                        displayText = exercise.repsOrTimeValue / 1000 + " " + workoutsConstants.exerciseInfo.duration.SECS;
                    }
                }
            }
        }
        return displayText;
    };

    /**
     * Display exercise information for RepsSets
     * @param exercise
     */
    const displayRepsSetsExerciseInfo = (exercise) => {
        let displayText = "Tap to set!";

        if (exercise) {
            if (exercise.repsOrTimeValue) {
                const setsInfo = exercise.sets ? exercise.sets + " set(s)" : " 1 set(s)";
                displayText = displayCircuitExerciseInfo(exercise) + " x " + setsInfo;
            }
        }

        return displayText;
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
     * Get previous value for Reps
     * @returns {*|null}
     */
    const getPrevRepsValue = () => {
        if (currentExercise) {
            if (currentExercise.repsOrTime === workoutsConstants.exerciseInfo.COUNT && currentExercise.repsOrTimeValue) {
                return currentExercise.repsOrTimeValue;
            }
        }
        return 0;
    };

    /**
     * Get previous value for time
     * @returns {*|null}
     */
    const getPrevTimeValue = () => {
        if (currentExercise) {
            if (currentExercise.repsOrTime === workoutsConstants.exerciseInfo.TIME && currentExercise.repsOrTimeValue) {
                return currentExercise.repsOrTimeValue;
            }
        }
        return 0;
    };

    /**
     * Get previous value for sets
     * @returns {*|null}
     */
    const getPrevSetValue = () => {
        if (currentExercise) {
            if (currentExercise.sets) {
                return currentExercise.sets;
            }
        }
        return 0;
    };

    /**
     * Helper function to display appropriate interval
     */
    const displayInterval = (interval) => {

        let value;

        if (interval) {
            if (interval > 60000) {
                value = Math.floor(interval / 60000) + " " + "minutes";
            } else {
                value = interval / 1000 + " " + "seconds";
            }
        } else {
            value = "Tap to set";
        }
        return value;
    };

    /**
     * Calculate the duration of an exercise
     * @param totalDuration
     * @param exercise
     * @returns {*}
     */
    const calcExerciseDuration = (totalDuration, exercise) => {
        let exerciseDuration = exercise.repsOrTime === workoutsConstants.exerciseInfo.TIME ? exercise.repsOrTimeValue : exercise.repsOrTimeValue * 3000;
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
            return <Image source={{ uri: uri }} style={styles.thumbnail} resizeMode="cover" />;
        } else if (workout) {
            return <Image source={{
                uri: "https://" + workout.thumbnailUrl,
                cache: "force-cache",
            }} style={styles.thumbnail} resizeMode="cover" />;
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
                    onChange={event => setTitle(event.target.value.trim().toLowerCase())}/>
                <textarea
                    className="appearance-none border-none w-full h-56 bg-gray2 rounded py-4 px-3 my-2 font-light "
                    placeholder="Tell your followers what you do"
                    value="Tell us more about this workout"
                    maxLength={250}
                    onChange={event => setDescription(event.target.value.toLowerCase())}
                />
                <div className="relative border-none my-2">
                    <select
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
                        <th>Information</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedExercises.map((exercise, index) => {
                        return (
                            <tr key={index}>
                                <td>{displayExerciseTitle(exercise)}</td>
                                <td>{getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ?
                                    displayCircuitExerciseInfo(exercise) : displayRepsSetsExerciseInfo(exercise)}
                                </td>
                                <td className="flex flex-row">
                                    <div className="bg-primary rounded hover:bg-darkPrimary p-0.5 m-1">
                                        <EditIcon/>
                                    </div>
                                    <div className="bg-primary rounded hover:bg-darkPrimary p-0.5 m-1">
                                        <CloseIconWhite/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <ExerciseGallery open={openExerciseGallery}
                                 close={closeExercisesGallery}
                                 items={selectedExercises}/>
                <button
                    type="button"
                    onClick={() => setOpenExerciseGallery(true)}
                    className="flex flex-row items-center justify-center bg-primary rounded hover:bg-darkPrimary text-white py-1 w-40 mt-4 font-semibold">
                    Select Exercise
                </button>
            </div>
            {/*{selectedExercises.length > 0 ?*/}
            {/*    <SelectCard title="Exercise Interval"*/}
            {/*                value={displayInterval(exerciseInterval)}*/}
            {/*                label="Exercise Interval"*/}
            {/*                onPress={() => setExerciseIntervalModalVisible(true)} /> : null}*/}

            {/*{(selectedExercises.length > 0) && getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ?*/}
            {/*    <SelectCard title="Rounds"*/}
            {/*                value={rounds}*/}
            {/*                label="Rounds"*/}
            {/*                onPress={() => setRoundsModalVisible(true)} /> : null}*/}

            {/*{rounds > 1 ?*/}
            {/*    <SelectCard title="Rounds Interval"*/}
            {/*                value={displayInterval(roundsInterval)}*/}
            {/*                label="Rounds Interval"*/}
            {/*                onPress={() => setRoundsIntervalModalVisible(true)} /> : null}*/}

            {/*{(selectedExercises.length > 0) && getWorkoutType() === workoutsConstants.workoutType.REPS_SETS ?*/}
            {/*    <SelectCard title="Sets Interval"*/}
            {/*                value={displayInterval(setsInterval)}*/}
            {/*                label="Sets Interval"*/}
            {/*                onPress={() => setSetsIntervalModalVisible(true)} /> : null}*/}

            <button
                type="button"
                className="mt-4 bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">Create
            </button>
        </div>
    )
}
