/* eslint-disable */
import React, {useState} from "react";
import AddIcon from "../../assets/svg/add-line.svg";
import SubtractIcon from "../../assets/svg/subtract-line.svg";

const INC = "INCREASE"
const DEC = "DECREASE"

const Counter = ({onChange}) => {

    const [value, setValue] = useState(1)

    /**
     * Increase value
     */
    const increase = () => {
        const newValue = value + 1
        setValue(newValue)
        onChange(INC)
    }

    /**
     * Decrease value
     */
    const decrease = () => {
        const newValue = value === 1 ? value : value - 1
        setValue(newValue)
        onChange(DEC)
    }


    return (
        <div className="flex flex-row place-content-around bg-secondary rounded-md mb-2 py-2 text-primary font-semibold px-2">
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

export {INC, DEC}

export default Counter;
