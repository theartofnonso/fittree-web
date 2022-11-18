/* eslint-disable */
import React, {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {timeOrReps} from "../../../utils/workout/workoutsHelperFunctions";
import CloseIcon from "../../../assets/svg/close-line.svg";
import InfoOutlinedIcon from "../../../assets/svg/information-line.svg";
import OrderPlayIcon from "../../../assets/svg/order-play-line.svg";
import PauseIcon from "../../../assets/svg/pause-mini-line.svg";
import WorkoutSeeker from "../../views/WorkoutSeeker";
import WorkoutExerciseCard from "../../cards/WorkoutExerciseCard";
import PauseModal from "./PauseModal";
import IntervalModal from "./IntervalModal";
import PreviewExercise from "../exercise/PreviewExercise";
import WorkoutCompletedModal from "./WorkoutCompletedModal";
import VideoCarousel from "../../views/VideoCarousel";

const WorkoutPlayer = props => {

    const [showExercise, setShowExercise] = useState(false)

    const [startTime, setStartTime] = useState(0)

    const [showWorkoutList, setShowWorkoutList] = useState(false)

    useEffect(() => {
        const currentTime = Date.now();
        setStartTime(currentTime)
    }, [])

    /**
     * Display duration
     * @returns {string}
     */

    const getRepsOrTimeValue = () => {
        let repsOrTimeValue = props.workoutExercise.duration.value;
        if (props.workoutExercise.duration.type !== workoutsConstants.duration.REPS) {
            repsOrTimeValue = props.extraData.exerciseDuration / 1000;
        }
        return repsOrTimeValue + " " + timeOrReps(props.workoutExercise.duration.type);
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
            className="container mx-auto px-2 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-full w-screen bg-white overflow-y-scroll">

            <div className="my-4 flex flex-row place-content-between">
                {!props.isPaused ? <div>
                    <div onClick={props.close} className="cursor-pointer">
                        <CloseIcon/>
                    </div>
                </div> : null}

                {!props.isPaused ?
                    <div className="flex flex-row">
                        <div className="mx-2 cursor-pointer" onClick={previewExercise}>
                            <InfoOutlinedIcon/>
                        </div>
                        <div className="mx-2 cursor-pointer" onClick={toggleWorkoutList}>
                            <OrderPlayIcon/>
                        </div>
                    </div> : null}
            </div>

            <VideoCarousel videos={[props.workoutExercise.exercise.videoUrls[0]]}/>

            <div>
                {!props.isPaused ?
                    <div className="mt-4 flex flex-row justify-center">
                        <button type="button" className="mx-2" onClick={props.seekBackward}>
                            Prev
                        </button>
                        <button type="button" className="mx-2" onClick={props.pause}>
                            <PauseIcon/>
                        </button>
                        <button type="button" className="mx-2" onClick={props.seekForward}>
                            Next
                        </button>
                    </div> : null}
                <div>
                    <p className="font-bold mt-4 mb-0.5">{props.workoutExercise.exercise.title}</p>
                    <p>{getRepsOrTimeValue()}</p>
                    <p>{props.extraData.exerciseExtras}</p>
                </div>
            </div>
            {props.nextWorkoutExercise ?
                <div className="flex flex-row justify-start sm:justify-end mt-4" onClick={previewExercise}>
                    <div>
                        <p className="py-0.5">Up Next:</p>
                        <WorkoutExerciseCard workoutExercise={props.nextWorkoutExercise} type={props.type}/>
                    </div>
                </div> : null}
            {showWorkoutList ?
                <WorkoutSeeker
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
            {showExercise ?
                <PreviewExercise
                    exerciseId={props.workoutExercise.exercise.id}
                    close={() => setShowExercise(false)}/> : null}
            {props.onEnd ?
                <WorkoutCompletedModal
                    isVisible={props.onEnd}
                    startTime={startTime}
                    navigateToWorkoutPreview={props.close}/> : null}
        </div>
    );
};

export default WorkoutPlayer;
