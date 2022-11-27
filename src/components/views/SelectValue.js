/* eslint-disable */
import React, {useState} from "react";

const SelectValue = ({prevValue, onChange, isNumber}) => {

    const [value, setValue] = useState(prevValue || "")

    if (isNumber) {
        return (
            <div className="flex flex-row">
                <input
                    min="1"
                    className="border-none bg-gray2 rounded py-4 px-2 font-light text-dustBlack w-12"
                    type="number"
                    pattern="\d*"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value)
                        onChange(parseInt(event.target.value))
                    }}
                />

            </div>
        );

    } else {
        return (
            <div className="flex flex-row">
                <input
                    className="border-none bg-gray2 rounded py-4 px-2 font-light text-dustBlack w-full"
                    type="text"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                />

            </div>
        );
    }
};

export default SelectValue;
