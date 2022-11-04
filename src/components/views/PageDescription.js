/* eslint-disable */
import React from "react";

const PageDescription = ({title, description}) => {

    return (
        <div>
            <p className="text-lg sm:text-2xl md:text-3xl font-medium">{title}</p>
            <p className="text-sm sm:text-md md:text-lg font-light">{description}</p>
        </div>
    );
};

export default PageDescription;
