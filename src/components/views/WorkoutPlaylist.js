/* eslint-disable */
import React from "react";
import ExerciseList from "./ExeciseList";

const WorkoutPlaylist = ({workout, playlist}) => {

    return (
        <div className="h-96 sm:h-full overflow-y-scroll py-4 rounded-md my-4">
            {/*{playlist.map((list, index) => {*/}
                return <ExerciseList
                    list={playlist}
                    workout={workout}
                    exercises={playlist}
                    rounds={playlist}
                    type={workout.type}/>
            {/*})}*/}
        </div>
    );
};

export default WorkoutPlaylist;
