/* eslint-disable */
import React, {useState} from "react";
import {workoutDurationSummary} from "../../utils/workout/workoutsHelperFunctions";
import workoutsConstants from "../../utils/workout/workoutsConstants";

const InputValue = (props) => {

    if(!props.open) {
        return
    }

    const [value, setValue] = useState(0)

    const [mode, setMode] = useState()

    return (
        <div
            className="my-2 flex flex-row place-content-between items-center rounded-md ">
            <div className="my-2 flex flex-row place-content-around items-center">
                <p className="p-2">{props.title}</p>
                {props.isTime ? <p className="p-2 text-sm">{value} of rest</p> : null}
            </div>
            <input
                min="1"
                className="border-none bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack w-16"
                type="number"
                value={props.value}
                onChange={(event) => {
                    setValue(event.target.value)
                    props.onChange(event.target.value)
                }}
            />
        </div>
    );
};

export default InputValue;
