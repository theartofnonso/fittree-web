/* eslint-disable */
import React, {useEffect, useState} from "react";

const BodyParts = ({oldValues, onSelect}) => {

    const bodyParts = [
        "Abs",
        "Back",
        "Biceps",
        "Calves",
        "Chest",
        "Core",
        "Glutes",
        "Hamstrings",
        "Quadriceps",
        "Shoulders",
        "Triceps",
        "Full Body"
    ];

    /**
     * Body Parts
     */
    const [selectedBodyParts, setSelectedBodyParts] = useState(new Set());

    useEffect(() => {
        setSelectedBodyParts(_ => new Set(oldValues));
    }, [])

    useEffect(() => {
        onSelect(Array.from(selectedBodyParts))
    }, [selectedBodyParts])

    /**
     * Handle select body part
     * @param value
     */
    const selectBodyPartsHandler = value => {

        setSelectedBodyParts(prevValues => {
            if (prevValues.has(value)) {
                prevValues.delete(value);
            } else {
                prevValues.add(value);
            }
            return new Set(prevValues);
        });
    };

    return (
        <div>
            {bodyParts.map((bodyPart, index) => {
                return (
                    <button
                        type="button"
                        key={index}
                        className={`py-2 px-4 text-xs sm:text-md border border-gray m-1 sm:m-2 rounded font-medium ${selectedBodyParts.has(bodyPart) ? "bg-primary text-white border border-primary" : "bg-white text-black border border-gray"}`}
                        onClick={() => selectBodyPartsHandler(bodyPart)}>{bodyPart}</button>
                );
            })}
        </div>
    );
};

export default BodyParts;
