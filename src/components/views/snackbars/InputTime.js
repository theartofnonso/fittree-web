/* eslint-disable */
import React, {useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import {
    convertMilliToSecondsOrMinutes,
    convertSecondsOrMinutesToMilli
} from "../../../utils/workout/workoutsHelperFunctions";

const InputTime = (props) => {

    if (!props.open) {
        return
    }

    const [duration, setDuration] = useState(convertMilliToSecondsOrMinutes(props.value))

    return (
        <div
            className="my-2 flex flex-row place-content-between items-center rounded-md ">
            <p className="p-2">{props.title}</p>

            <div className="flex flex-row">
                <div className="relative border-none">
                    <select
                        onChange={(event) => {
                            setDuration((prevValue) => {
                                return {
                                    ...prevValue,
                                    type: event.target.value
                                }
                            })
                            props.onChange(convertSecondsOrMinutesToMilli(event.target.value))
                        }}
                        className="appearance-none bg-gray2 text-gray-700 py-4 px-4 pr-8"
                        id="grid-state">
                        {Array(59).fill(0).map((item, index) => {
                            return<option>{index + 1}</option>
                        })}
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                <div className="relative border-none">
                    <select
                        onChange={(event) => {
                            setDuration((prevValue) => {
                                return {
                                    ...prevValue,
                                    type: event.target.value
                                }
                            })
                            props.onChange(convertSecondsOrMinutesToMilli(event.target.value))
                        }}
                        className="block appearance-none w-full bg-gray2 text-gray-700 h-full px-4 pr-8 rounded-r "
                        id="grid-state">
                        <option
                            selected={duration.type === workoutsConstants.duration.SECONDS}>{workoutsConstants.duration.SECONDS}</option>
                        <option
                            selected={duration.type === workoutsConstants.duration.MINUTES}>{workoutsConstants.duration.MINUTES}</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputTime;
