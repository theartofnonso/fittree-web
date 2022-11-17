/* eslint-disable */
import React from "react";
import SelectValue from "./SelectValue";

const InputValue = (props) => {

    if (!props.open) {
        return
    }

    /**
     *
     * @param duration
     */
    const onChange = (duration) => {
        props.onSelectValue(duration)
    }

    return (
        <div
            className="my-2 flex flex-row place-content-between items-center rounded-md ">
            <div className="my-2 flex flex-row place-content-around items-center">
                <p className="p-2">{props.title}</p>
            </div>
            <SelectValue prevValue={props.value} onChange={onChange}/>
        </div>
    );
};

export default InputValue;
