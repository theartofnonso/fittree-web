/* eslint-disable */
import React from "react";
import Avatar from "./Avatar";

const Profile = ({user}) => {

    return (
        <div className="flex flex-col items-center">
            <Avatar user={user}/>
            <p className="font-semibold text-base md:text-lg">{user.preferred_username}</p>
        </div>
    );
};

export default Profile;
