/* eslint-disable */
import React, {useEffect, useState} from "react";
import listOfEquipments from "../../assets/equipments.json";
import CloseIcon from "../../assets/svg/close-line.svg";

const Equipments = props => {

    const [enteredEquipment, setEnteredEquipment] = useState("");

    const [selectedEquipments, setSelectedEquipments] = useState(props.prevEquipments || []);

    const [equipments, setEquipments] = useState(listOfEquipments.equipments.slice(0, 8).sort());

    useEffect(() => {
        const remaining = remainingEquipments().sort();
        setEquipments(remaining);
    }, [selectedEquipments]);

    /**
     * Filter selected equipments
     * @returns {*}
     */
    const remainingEquipments = () => {
        return listOfEquipments.equipments.filter(
            equipment =>
                !selectedEquipments.some(selectedEquipment => selectedEquipment === equipment),
        );
    };

    /**
     * Store the selected equipment
     * @param value
     */
    const selectEquipmentHandler = value => {
        if (!selectedEquipments.includes(value)) {
            const newEquipments = [...selectedEquipments, value]
            setSelectedEquipments(newEquipments);
            props.onSelect(newEquipments)
        }
    };

    /**
     * remove selected equipment
     * @param value
     */
    const removeEquipmentHandler = value => {
        const newEquipments = [...selectedEquipments.filter(item => item !== value)]
        setSelectedEquipments(newEquipments);
        props.onSelect(newEquipments)
    };

    /**
     * Filter equipments to return the entered values
     * @param value
     */
    const filterEquipments = value => {
        setEnteredEquipment(value);
        const remaining = remainingEquipments();
        const filteredEquipment = remaining.filter(equipment => equipment.toLowerCase().includes(value.toLowerCase()));
        setEquipments(filteredEquipment);
    };

    return (
        <div className="my-2">
            {/*<input*/}
            {/*    className="appearance-none border-none w-5/6 bg-gray2 h-14 sm:h-18 rounded w-full py-2 px-3 my-2"*/}
            {/*    id="search"*/}
            {/*    type="text"*/}
            {/*    placeholder="Search equipment "*/}
            {/*    value={enteredEquipment}*/}
            {/*    maxLength={35}*/}
            {/*    onChange={event => filterEquipments(event.target.value.trim())}/>*/}
            <div className="flex flex-row flex-wrap">
                {selectedEquipments.map((item, index) => {
                    return (
                        <div key={index} onClick={() => removeEquipmentHandler(item)}
                             className="flex flex-row items-center py-2 pl-2 pr-4 border border-gray m-1 sm:m-2 rounded">
                            <CloseIcon/>
                            <p className="text-xs sm:text-md font-medium">{item}</p>
                        </div>
                    )
                })}
            </div>
            <div className="relative border-none">
                <select
                    onChange={(event) => selectEquipmentHandler(event.target.value)}
                    className="block appearance-none w-full bg-gray2 text-gray-700 py-3 px-4 pr-8 rounded "
                    id="grid-state">
                    {equipments.map((item, index) => {
                        return <option key={index}>{item}</option>
                    })}
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

export default Equipments;
