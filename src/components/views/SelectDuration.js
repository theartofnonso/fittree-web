/* eslint-disable */
import React, {useState} from "react";
import workoutsConstants from "../../utils/workout/workoutsConstants";
import {
    convertMilliToSecondsOrMinutes,
    convertSecondsOrMinutesToMilli
} from "../../utils/workout/workoutsHelperFunctions";
import {constructDuration, updateDurationType, updateDurationValue} from "../../schemas/Duration";

const SelectDuration = ({prevDuration, showReps, onChange}) => {

    const [duration, setDuration] = useState(() => {

        switch (prevDuration.type) {
            case workoutsConstants.duration.SECONDS:
            case workoutsConstants.duration.MINUTES:
                const secondsOrMinutes = convertMilliToSecondsOrMinutes(prevDuration.value)
                return constructDuration(secondsOrMinutes, prevDuration.type)
            default:
                return constructDuration(prevDuration.value, prevDuration.type)
        }
    })

    return (
        <div className="flex flex-row">
            <div className="relative border-none">
                <select
                    value={duration.value}
                    onChange={(event) => {
                        setDuration((prevValue) => {
                            return updateDurationValue(event.target.value, prevValue)
                        })
                        switch (duration.type) {
                            case workoutsConstants.duration.SECONDS:
                            case workoutsConstants.duration.MINUTES:
                                const milli = convertSecondsOrMinutesToMilli(event.target.value, duration.type)
                                onChange(constructDuration(milli, duration.type))
                                return
                            default:
                                onChange(constructDuration(event.target.value, duration.type))
                        }
                    }}
                    className="appearance-none bg-gray2 text-gray-700 py-4 px-2 pr-6 rounded-l"
                    id="grid-state">
                    {Array(59).fill(0).map((item, index) => {
                        const durationNumber = index
                        return <option value={durationNumber} key={durationNumber}>{durationNumber}</option>
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
                    value={duration.type}
                    onChange={(event) => {
                        setDuration((prevValue) => {
                            return updateDurationType(event.target.value, prevValue)
                        })
                        switch (duration.type) {
                            case workoutsConstants.duration.SECONDS:
                            case workoutsConstants.duration.MINUTES:
                                const milli = convertSecondsOrMinutesToMilli(duration.value, event.target.value)
                                onChange(constructDuration(milli, event.target.value))
                                return
                            default:
                                onChange(constructDuration(duration.value, event.target.value))
                        }
                    }}
                    className="block appearance-none w-full bg-gray2 text-gray-700 h-full px-2 pr-6 rounded-r "
                    id="grid-state">
                    <option value={workoutsConstants.duration.SECONDS}>{workoutsConstants.duration.SECONDS}</option>
                    <option value={workoutsConstants.duration.MINUTES}>{workoutsConstants.duration.MINUTES}</option>
                    {showReps ? <option
                        value={workoutsConstants.duration.REPS}>{workoutsConstants.duration.REPS}</option> : null}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SelectDuration;
