import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectWorkoutById} from "../../../features/auth/authWorkoutsSlice";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import utilsConstants from "../../../utils/utilsConstants";
import {capitaliseWords} from "../../../utils/general/utils";
import CloseIcon from "../../../assets/svg/close-line.svg";
import CloseIconWhite from "../../../assets/svg/close-line-white.svg";
import PageDescription from "../../views/PageDescription";
import BodyParts from "../../views/BodyParts";
import Equipments from "../../views/Equipments";
import InputValue from "../../views/InputValue";
import InputTime from "../../views/InputTime";
import AddIcon from "../../../assets/svg/add-line.svg";
import SelectDuration from "../../views/SelectDuration";
import Loading from "../../utils/Loading";
import {selectAuthUser} from "../../../features/auth/authUserSlice";
import {SnackBar, SnackBarType} from "../../views/SnackBar";
import SelectValue from "../../views/SelectValue";
import {useLeavePageConfirm} from "../../../utils/general/hooks";
import Modal from "../../views/modal";
import Counter, {INC} from "../../views/Counter";
import {
    addSet,
    constructWorkoutExercise,
    removeSet,
    updateDuration,
    updateSet,
    updateTitle
} from "../../../schemas/WorkoutExercise";
import {createWorkout, updateWorkout} from "/src/features/auth/authWorkoutsSlice";

export default function CreateWorkout({params, close}) {

    const user = useSelector(selectAuthUser);

    const dispatch = useDispatch();

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
    const [workoutExercises, setWorkoutExercises] = useState(() => workout ? workout.workoutExercises.map(exercise => JSON.parse(exercise)) : []);

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
     * Show snackbar message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarType, setSnackbarType] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const [openExitScreenModal, setOpenExitScreenModal] = useState(false)

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
            workoutExercises: workoutExercises.map(item => JSON.stringify(item)),
            exerciseInterval: exerciseInterval,
            setsInterval: setsInterval,
            rounds: rounds,
            roundsInterval: roundsInterval,
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
            hasWorkoutExercises: workoutExercises.length > 0,
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
     * Add new workout exercise
     */
    const addWorkoutExercise = () => {
        const exercise = constructWorkoutExercise()
        setWorkoutExercises(prevValues => [...prevValues, exercise]);
    };

    /**
     * Update the workout exercise
     * @param newExercise
     */
    const updateWorkoutExercise = (newExercise) => {
        const exercises = workoutExercises.map(exercise => {
            if (exercise.id === newExercise.id) {
                return {
                    ...exercise,
                    ...newExercise
                }
            }
            return exercise;
        });
        setWorkoutExercises(exercises);
    }

    /**
     * Remove workout Exercise
     */
    const removeWorkoutExercise = (currentExercise) => {
        const remainingExercises = workoutExercises.filter(exercise => exercise.id !== currentExercise.id);
        setWorkoutExercises(remainingExercises);
        if (remainingExercises.length <= 1) {
            setExerciseInterval(0);
        }
    };

    /**
     * Handle select body part
     * @param values
     */
    const selectBodyPartsHandler = values => {
        setSelectedBodyParts(values);
    };

    /**
     * Perform sanity checks on required details and call createWorkoutHelper
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
                console.log(err)
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
        if (workoutExercises.length > 0) {
            return getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? calCircuitDuration() : calRepsSetsDuration()
        }
        return 0
    }

    /**
     * Create a workout and upload it to DynamoDB
     */
    const createWorkoutHelper = async () => {

        const payload = {
            creatorId: user.id,
            title: capitaliseWords(title.trim()),
            description: description.length > 0 ? description.trim() : "",
            intensityLevel: intensityLevel ? intensityLevel : workoutsConstants.intensityLevels.Beginner,
            bodyParts: selectedBodyParts,
            equipments: selectedEquipments,
            rounds: rounds > 0 ? rounds : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ONE,
            roundsInterval: roundsInterval > 0 ? roundsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            exerciseInterval: exerciseInterval > 0 ? exerciseInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            setsInterval: setsInterval > 0 ? setsInterval : utilsConstants.workoutsExerciseDefaults.DEFAULT_VALUE_OF_ZERO,
            duration: calWorkoutDuration(),
            workoutExercises: workoutExercises.map(item => JSON.stringify(item)),
            thumbnailUrl: "",
            preferred_username: user.preferred_username,
            type: getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? workoutsConstants.workoutType.CIRCUIT : workoutsConstants.workoutType.REPS_SETS,
        };

        if (workout) {
            return dispatch(updateWorkout({...workout, ...payload})).unwrap();
        }

        return dispatch(createWorkout(payload)).unwrap();

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
            const totalExerciseDuration = workoutExercises.reduce(calcExerciseDuration, 0);
            const totalExerciseInterval = (workoutExercises.length - 1) * exerciseInterval;
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
        const totalExerciseDuration = workoutExercises.reduce(calcExerciseDuration, 0);
        const totalExerciseInterval = (workoutExercises.length - 1) * exerciseInterval;
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
        <div className="px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 w-full bg-white overflow-y-scroll ">
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
                    className="table-auto outline outline-gray2 outline-1 pt-2 rounded-md mt-4 border-separate border-spacing-1">
                    <thead>
                    <tr className="text-left">
                        <th>Title</th>
                        <th>{getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? "Sets" : "Sets"}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {workoutExercises.map((exercise, index) => {
                        return (
                            <tr key={index} className="align-top">
                                <td className="">
                                    <SelectValue
                                        onChange={(title) => {
                                            const newWorkoutExercise = updateTitle(exercise, title);
                                            updateWorkoutExercise(newWorkoutExercise)
                                        }}
                                        prevValue={exercise.title}
                                        isNumber={false}/>
                                </td>
                                <td>
                                    {getWorkoutType() === workoutsConstants.workoutType.REPS_SETS ?

                                        <Counter onChange={(value) => {
                                            if (value === INC) {
                                                const newWorkoutExercise = addSet(exercise);
                                                updateWorkoutExercise(newWorkoutExercise)
                                            } else {
                                                const newWorkoutExercise = removeSet(exercise)
                                                if(newWorkoutExercise != null) {
                                                    updateWorkoutExercise(newWorkoutExercise)
                                                }

                                            }
                                        }}/> : null}

                                    {getWorkoutType() === workoutsConstants.workoutType.CIRCUIT ? <SelectDuration
                                            onChange={(duration) => {
                                                const newWorkoutExercise = updateDuration(exercise, duration);
                                                updateWorkoutExercise(newWorkoutExercise)
                                            }}
                                            prevDuration={exercise.duration}
                                            showReps={true}/> :
                                        <div className="overflow-y-scroll h-36">
                                            {exercise.sets.map((set, index) => {
                                                return (
                                                    <SelectDuration
                                                        style={"mb-2"}
                                                        key={index}
                                                        onChange={(duration) => {
                                                            const newWorkoutExercise = updateSet(exercise, index, duration);
                                                            updateWorkoutExercise(newWorkoutExercise)
                                                        }}
                                                        prevDuration={set}
                                                        showReps={true}/>
                                                )
                                            })}
                                        </div>}
                                </td>

                                <td className="flex flex-row justify-center">
                                    <div onClick={() => removeWorkoutExercise(exercise)}
                                         className="flex flex-row justify-center bg-primary w-8 rounded-md hover:bg-darkPrimary p-0.5 cursor-pointer">
                                        <CloseIconWhite/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addWorkoutExercise}
                    className="flex flex-row items-center justify-center w-36 bg-secondary rounded-md hover:bg-darkSecondary text-primary pl-1 pr-3 py-1 my-2 font-semibold text-sm">
                    <AddIcon/> Add Exercise
                </button>
                <InputTime title="Exercise Interval"
                           value={exerciseInterval}
                           open={workoutExercises.length > 1}
                           onSelectTime={(duration) => setExerciseInterval(duration.value)}/>
                <InputTime title="Sets Interval"
                           value={setsInterval}
                           open={(workoutExercises.length > 0) && getWorkoutType() === workoutsConstants.workoutType.REPS_SETS}
                           onSelectTime={(duration) => setSetsInterval(duration.value)}/>
                <div className={`${rounds > 1 ? "outline outline-gray2 outline-1 p-2 rounded-md mt-2" : ""}`}>
                    <InputValue title="Rounds"
                                value={rounds}
                                open={(workoutExercises.length > 1) && getWorkoutType() === workoutsConstants.workoutType.CIRCUIT}
                                onSelectValue={(value) => setRounds(value)}/>
                    <InputTime title="Rounds Interval"
                               value={roundsInterval}
                               open={rounds > 1}
                               onSelectTime={(duration) => setRoundsInterval(duration.value)}/>
                </div>
            </div>
            <button
                type="button"
                onClick={doCreateWorkout}
                className="my-4 w-full bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary">{workout ? "Update workout" : "Create workout"}
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
