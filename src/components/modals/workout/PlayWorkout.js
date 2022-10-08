/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";
import CloseIcon from "../../svg/close-line.svg";
import InfoOutlinedIcon from "../../svg/information-line.svg";
import OrderPlayIcon from "../../svg/order-play-line.svg";
import PauseIcon from "../../svg/pause-mini-line.svg";
import WorkoutList from "../../views/WorkoutList";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import PauseModal from "./PauseModal";
import IntervalModal from "./IntervalModal";

const PlayWorkout = props => {

    const [showExercise, setShowExercise] = useState(false)

    const [startTime, setStartTime] = useState(0)

    const [isError, setIsError] = useState(false);

    const [showWorkoutList, setShowWorkoutList] = useState(false)

    useEffect(() => {
        const currentTime = Date.now();
        setStartTime(currentTime)
    }, [])

    /**
     * Display Reps or Time value
     * @returns {string}
     */
    const getRepsOrTimeValue = () => {
        let repsOrTimeValue = props.workoutExercise.repsOrTimeValue;
        if (props.workoutExercise.repsOrTime === workoutsConstants.exerciseInfo.TIME) {
            repsOrTimeValue = props.extraData.exerciseDuration / 1000;
        }
        return repsOrTimeValue + " " + timeOrReps(props.workoutExercise.repsOrTime);
    };

    /**
     * Preview exercise information
     */
    const previewExercise = () => {
        props.previewExercise()
        setShowExercise(true)
    }

    /**
     * Display Workout list
     */
    const toggleWorkoutList = () => {
        props.pause()
        setShowWorkoutList(true)
    }

    return (
        <div
            className="container mx-auto px-2 sm:px-10 absolute top-0 right-0 bottom-0 left-0 h-screen w-screen bg-white">
            <div className="my-4 flex flex-row place-content-between">
                <div>
                    <button onClick={props.close}>
                        <CloseIcon/>
                    </button>
                </div>
                <div>
                    <button className="mx-2" onClick={previewExercise}>
                        <InfoOutlinedIcon/>
                    </button>
                    <button className="mx-2" onClick={toggleWorkoutList}>
                        <OrderPlayIcon/>
                    </button>
                </div>
            </div>
            <video className="rounded-md w-full h-96 sm:w-full sm:h-96 object-contain mr-2 bg-dustBlack" autoPlay
                   playsInline loop>
                <source src={`https://${props.workoutExercise.exercise.videoUrls[0]}`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div>
                <div className="my-4 flex flex-row justify-center">
                    <button className="mx-2" onClick={props.seekBackward}>
                        <p>Prev</p>
                    </button>
                    <button className="mx-2" onClick={props.pause}>
                        <PauseIcon/>
                    </button>
                    <button className="mx-2" onClick={props.seekForward}>
                        <p>Next</p>
                    </button>
                </div>
                <div>
                    <p className="font-bold my-0.5">{props.workoutExercise.exercise.title}</p>
                    <p>{getRepsOrTimeValue()}</p>
                    <p>{props.extraData.exerciseExtras}</p>
                </div>
            </div>
            {props.nextWorkoutExercise ?
                <div className="flex flex-row justify-start sm:justify-end mt-4">
                    <div>
                        <p className="py-0.5">Up Next:</p>
                        <WorkoutExerciseCard workoutExercise={props.nextWorkoutExercise} type={props.type}/>
                    </div>
                </div> : null}
            {showWorkoutList ?
                <WorkoutList
                    type={props.type}
                    close={() => setShowWorkoutList(false)}
                    list={props.data} progress={props.progress}/> : null}
            {props.isPaused ?
                <PauseModal
                    previewExercise={previewExercise}
                    toggleWorkoutList={toggleWorkoutList}
                    isVisible={props.isPaused}
                    navigateToWorkoutPreview={props.close}
                    play={props.play}
                /> : null}
            {props.shouldPlayInterval ?
                <IntervalModal
                    previewExercise={previewExercise}
                    toggleWorkoutList={toggleWorkoutList}
                    description={props.interval.description}
                    intervalTime={props.interval.duration}
                    navigateToWorkoutPreview={props.close}
                    onFinish={props.onFinishInterval}/> : null}
        </div>
    );
};

export default PlayWorkout;
