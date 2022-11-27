/* eslint-disable */
import React, {useState} from "react";
import WorkoutCard from "./cards/WorkoutCard";
import EmptyState from "../../assets/svg/empty_state.svg";
import PreviewWorkout from "../screens/workout/PreviewWorkout";
import WorkoutCardLite from "./cards/WorkoutCardLite";

const WorkoutList = ({workouts, emptyListMessage}) => {

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
            <div className="h-screen">
                <p className="text-sm sm:text-md md:text-lg font-semibold">{`${workouts.length} workouts`} </p>
                {workouts.length > 0 ?
                    <div className="mt-1 grid gap-3 sm:gap-2 grid-cols-1 sm:grid-cols-3">
                        {workouts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => previewWorkout(item)}>
                                    <WorkoutCardLite workout={item}/>
                                </div>
                            );
                        })}
                    </div> :
                    <div className="flex flex-col justify-center items-center h-screen">
                        <EmptyState/>
                        <p className="font-normal mt-4">{emptyListMessage}</p>
                    </div>}
            </div>
        );
    }
};

export default WorkoutList;
