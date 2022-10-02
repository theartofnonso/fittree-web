import React from "react";
import MockRight from "../src/components/views/mocks/MockRight";
import MockLeft from "../src/components/views/mocks/MockLeft";
import {APP_STORE_URL} from "../src/utils/utilsConstants";

export default function App() {

    return (
        <div className="container mx-auto">
            <div></div>
            <div className="flex flex-col items-center my-16">
                <div className="flex flex-col items-center">
                    <p className="font-Montserrat font-bold text-2xl sm:text-4xl">Your workouts</p>
                    <p className="font-Montserrat font-bold text-2xl sm:text-4xl">everywhere you go</p>
                    <p className="font-Montserrat font-normal text-xs my-1.5">Create, share and play workouts on any device</p>
                </div>
                <a rel="noreferrer" href={APP_STORE_URL} target="_blank" className="font-Montserrat bg-primary rounded-3xl py-2 px-10 mt-6 text-white font-medium">Get it on IOS</a>
            </div>

            <div className="flex flex-col items-center">
                <MockRight
                    url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/create_exercise.png"}
                    headerOne="Create 5 secs"
                    headerTwo="exercise videos"
                    bodyOne="Shoot 5 seconds videos"
                    bodyTwo="to demonstrate an exercise"/>
                <MockLeft
                    url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/curate_workouts.png"}
                    headerOne="Curate exercises"
                    headerTwo="into workouts"
                    bodyOne="Curate various exercises into"
                    bodyTwo="workouts of Circuits or Reps and Sets"/>
                <MockRight
                    url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/go_live.png"}
                    headerOne="Go live"
                    headerTwo=""
                    bodyOne="launch your workouts"
                    bodyTwo="with an improved experience"/>
            </div>
        </div>
    );
}
