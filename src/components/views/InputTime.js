/* eslint-disable */
import React from "react";
import SelectDuration from "./SelectDuration";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {constructDuration} from "../../schemas/Duration";

const InputTime = (props) => {

    if (!props.open) {
        return
    }

    /**
     *
     * @param duration
     */
    const onChange = (duration) => {
        props.onSelectTime(duration)
    }

    return (
        <div className="my-2 flex flex-row place-content-between items-center rounded-md ">
            <p className="p-2">{props.title}</p>
            <SelectDuration prevDuration={constructDuration(props.value, workoutsConstants.duration.SECONDS)} onChange={onChange} showReps={false}/>
        </div>
    );
};

export default InputTime;
