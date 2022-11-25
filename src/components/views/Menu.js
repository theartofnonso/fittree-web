/* eslint-disable */
import React from "react";

const Menu = ({open, onMouseOver, onMouseLeave, icon, children}) => {

    return (
        <div className="relative cursor-pointer"
             onMouseOver={onMouseOver}
             onMouseLeave={onMouseLeave}>
            {icon}
            {open ?
                <div className="absolute text-left right-0 w-52 z-10">
                    <div className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {children}
                    </div>
                </div> : null}
        </div>
    );
};

export default Menu;
