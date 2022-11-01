/* eslint-disable */
import React from "react";
import CloseIcon from "../svg/close-line-white.svg";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const WorkoutSeeker = ({close, type, list, progress}) => {

    /**
     * Display workout list for Circuit
     * @returns {*}
     */
    const displayCircuitList = () => {
        return list.map((round, roundIndex) => {
            return (
                <div key={roundIndex} className="my-8 sm:my-10 text-xl text-primary font-bold">
                    {roundIndex === progress.roundsIndex ?
                        <p className="text-xl text-primary font-bold">Round {roundIndex + 1}</p> :
                        <p className="text-xl text-white font-bold">Round {roundIndex + 1}</p>}

                    {round.map((workoutExercise, index) => {

                        if ((index === progress.exerciseIndex) && (roundIndex === progress.roundsIndex)) {
                            return <p key={index}
                                      className="my-2 sm:my-4 text-xl text-primary font-bold">{workoutExercise.exercise.title}</p>
                        } else {
                            return <p key={index}
                                      className="my-2 sm:my-4 text-white font-normal">{workoutExercise.exercise.title}</p>
                        }
                    })}
                </div>
            )
        })
    }

    /**
     * Display workout list for Reps and Sets
     * @returns {*}
     */
    const displayRepsAndSetsList = () => {
        return list.map((exercise, index) => {

            if (index === progress.exerciseIndex) {
                return <p key={index}
                          className="my-4 sm:my-8 text-xl text-primary font-bold">{exercise[0].exercise.title}</p>
            } else {
                return <p key={index}
                          className="my-4 sm:my-8 text-white font-normal">{exercise[0].exercise.title}</p>
            }
        })
    }

    return (
        <div
            className="px-5 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-screen w-screen bg-transparentBlack z-50">
            <div className="my-4">
                <div onClick={close}>
                    <CloseIcon/>
                </div>
            </div>
            <div>
                {type === workoutsConstants.workoutType.CIRCUIT ? displayCircuitList() : displayRepsAndSetsList()}
            </div>
        </div>
    );
};

export default WorkoutSeeker;
