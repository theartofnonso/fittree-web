/* eslint-disable */
import React, {useState} from "react";
import EmptyState from "../../assets/svg/empty_state.svg";
import PreviewWorkout from "../screens/workout/PreviewWorkout";
import WorkoutCard from "./cards/WorkoutCard";

const WorkoutList = ({workouts, emptyListMessage, showEmptyListMessage = true, showCount=true}) => {

    const [workout, setWorkout] = useState(null)

    /**
     * Preview a workout from the list
     */
    const previewWorkout = (selectedWorkout) => {
        setWorkout(selectedWorkout);
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setWorkout(null)
    }

    if (workout) {
        return (
            <PreviewWorkout
                workoutId={workout.id}
                close={closePreview}/>
        )
    } else {
        return (
            <div className="">
                {showCount ? <p className="text-sm sm:text-md md:text-lg font-semibold">{`${workouts.length} workouts`} </p> : null }
                {workouts.length > 0 ?
                    <div className="mt-1 grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-4">
                        {workouts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => previewWorkout(item)}>
                                    <WorkoutCard workout={item}/>
                                </div>
                            );
                        })}
                    </div> :
                    <div className={`flex flex-col justify-center items-center h-full ${showEmptyListMessage ? "block" : "hidden"}`}>
                        <EmptyState/>
                        <p className="font-normal mt-4">{emptyListMessage}</p>
                    </div>}
            </div>
        );
    }
};

export default WorkoutList;
