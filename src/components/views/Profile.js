/* eslint-disable */
import React from "react";
import Socials from "./Socials";

const Profile = ({user}) => {

    /**
     * Display Avatar
     * @returns {JSX.Element}
     */
    const displayAvatar = () => {
        if (user.displayProfile) {
            return (
                <img src={"https://" + user.displayProfile} alt="Display profile" className="object-cover"/>)
        } else {
            const initials = user.preferred_username.substring(0, 1).toUpperCase()
            return (<p className="text-3xl text-white font-semibold">{initials}</p>)
        }
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <div
                    className="rounded-full w-24 h-24 overflow-hidden mb-2 bg-primary flex flex-row items-center justify-center">
                    {displayAvatar()}
                </div>
                <p className="font-semibold text-base md:text-lg">{user.preferred_username}</p>
                <p className="font-light py-1 text-sm md:text-base text-center break-words whitespace-pre-line">{user.displayBrief}</p>
            </div>
            <div className="flex flex-row justify-center items-center px-4">
                <Socials profile={user}/>
            </div>
        </>
    );
};

export default Profile;
