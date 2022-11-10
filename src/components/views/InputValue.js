/* eslint-disable */
import React, {useState} from "react";

const InputNumber = (props) => {

    if(!props.open) {
        return
    }

    const [value, setValue] = useState(props.value)

    return (
        <div
            className="my-2 flex flex-row place-content-between items-center rounded-md ">
            <div className="my-2 flex flex-row place-content-around items-center">
                <p className="p-2">{props.title}</p>
            </div>
            <input
                min="1"
                className="border-none bg-gray2 rounded-r py-4 px-3 font-light text-dustBlack w-16"
                type="number"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                    props.onSelectValue(event.target.value)
                }}
            />
        </div>
    );
};

export default InputNumber;
