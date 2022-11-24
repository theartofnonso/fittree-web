/* eslint-disable */
import React from "react";

const MenuItem = ({label, onClick, isHighlighted}) => {

    return (
        <div
            onClick={onClick}
            className={`py-2 hover:bg-secondary w-full 
            rounded-b-md text-gray-700 block px-4 py-2
             text-md text-left font-medium ${isHighlighted ? "bg-primary text-white hover:bg-darkPrimary" : "hover:bg-darkPrimary"}`}>{label}
        </div>
    );
};

export default MenuItem;
