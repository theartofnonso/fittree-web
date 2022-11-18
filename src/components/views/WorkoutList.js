/* eslint-disable */
import React, {useState} from "react";
import WorkoutCard from "../cards/WorkoutCard";
import EmptyState from "../../assets/svg/empty_state.svg";
import PreviewWorkout from "../screens/workout/PreviewWorkout";
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

    return (
        <>
            <p className="text-sm sm:text-md md:text-lg font-light">{`${workouts.length} workouts`} </p>
            {workouts.length > 0 ?
                <div className="mt-1 grid gap-1 grid-cols-2 sm:grid-cols-3">
                    {workouts.map((item, index) => {
                        return (
                            <div key={index} onClick={() => previewWorkout(item)}>
                                <WorkoutCard workout={item}/>
                            </div>
                        );
                    })}
                </div> :
                <div className="flex flex-col justify-center items-center h-screen">
                    <EmptyState/>
                    <p className="font-normal mt-4">{emptyListMessage}</p>
                </div>}
            {workout ? <PreviewWorkout
                workoutId={workout.id}
                close={closePreview}/> : null}
        </>
    );
};

export default WorkoutList;
