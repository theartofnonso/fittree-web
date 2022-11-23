/* eslint-disable */
import React, {useState} from "react";
import AddIcon from "../../assets/svg/add-line.svg";
import SubtractIcon from "../../assets/svg/subtract-line.svg";

const Counter = ({onChange}) => {

    const [value, setValue] = useState(1)

    /**
     * Increase value
     */
    const increase = () => {
        const newValue = value + 1
        setValue(newValue)
        onChange(newValue)
    }

    /**
     * Decrease value
     */
    const decrease = () => {
        const newValue = value >= 2 ? value - 1 : value
        setValue(newValue)
        onChange(newValue)
    }


    return (
        <div className="flex flex-row place-content-around bg-secondary rounded-md py-2 text-primary font-semibold px-2">
            <div onClick={decrease} className="cursor-pointer">
                <SubtractIcon/>
            </div>
            <div className="w-12 text-center">{value}</div>
            <div onClick={increase} className="cursor-pointer">
                <AddIcon/>
            </div>
        </div>
    );
};

export default Counter;
