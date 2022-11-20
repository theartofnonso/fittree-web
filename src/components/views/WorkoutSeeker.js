/* eslint-disable */
import React, {useState} from "react";
import CloseIcon from "../../assets/svg/close-line-white.svg";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import DiscoveryHub from "./DiscoveryHub";

const WorkoutSeeker = ({close, type, list, progress, recommendations}) => {

    const [selectedExercise, setSelectedExercise] = useState(null)

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
                            return <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedExercise(workoutExercise)}
                                className="my-2 sm:my-4 text-xl text-primary font-bold block">{workoutExercise.title}</button>
                        } else {
                            return <button key={index}
                                           type="button"
                                           onClick={() => setSelectedExercise(workoutExercise)}
                                           className="my-2 sm:my-4 text-white font-normal block">{workoutExercise.title}</button>
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
                return <button key={index}
                               type="button"
                               onClick={() => setSelectedExercise(exercise[0])}
                               className="my-4 sm:my-8 text-xl text-primary font-bold block">{exercise[0].title}</button>
            } else {
                return <button key={index}
                               type="button"
                               onClick={() => setSelectedExercise(exercise[0])}
                               className="my-4 sm:my-8 text-white font-normal block">{exercise[0].title}</button>
            }
        })
    }

    return (
        <div
            className="px-5 sm:px-10 fixed top-0 right-0 bottom-0 left-0 h-screen w-screen bg-transparentBlack z-50">
            <div className="my-4">
                <div onClick={close} className="cursor-pointer">
                    <CloseIcon/>
                </div>
            </div>
            <div>
                {type === workoutsConstants.workoutType.CIRCUIT ? displayCircuitList() : displayRepsAndSetsList()}
            </div>
            {selectedExercise ?
                <div className="my-4">
                    <DiscoveryHub recommendation={recommendations.get(selectedExercise.id)}
                                  tag={{title: selectedExercise.title}}/>
                </div> : null}
        </div>
    );
};

export default WorkoutSeeker;
