/* eslint-disable */
import React from "react";
import SelectTimeOrReps from "./SelectTimeOrReps";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {constructDuration} from "../../schemas/Duration";
import {convertMilliToSecondsOrMinutes, isMinutesOrSeconds} from "../../utils/workout/workoutsHelperFunctions";

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
            <SelectTimeOrReps prevDuration={constructDuration(props.value, isMinutesOrSeconds(props.value))} onChange={onChange} showReps={false}/>
        </div>
    );
};

export default InputTime;
