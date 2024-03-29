import React, {useState} from "react";
import InstagramIcon from "../src/assets/svg/instagram-primary-line.svg";
import TwitterIcon from "../src/assets/svg/twitter-primary-line.svg";
import FittrBigIcon from "../src/assets/svg/fittr.svg";
import FittrSmallIcon from "../src/assets/svg/fittr_small.svg";
import Link from "next/link";
import useAuth from "../src/utils/aws-utils/useAuth";
import FittreeLoading from "../src/components/views/FittreeLoading";
import {useDispatch, useSelector} from "react-redux";
import {searchCreatorWorkouts, selectAllWorkouts} from "../src/features/unauth/unAuthWorkoutsSlice";
import WorkoutList from "../src/components/views/WorkoutList";

export default function App() {

    const auth = useAuth()

    const workouts = useSelector(selectAllWorkouts)

    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    const [hasResults, setHasResults] = useState(false)

    /**
     * Auth is being checked
     */
    if (auth === null) {
        return <FittreeLoading/>
    }

    /**
     * Fetch workouts
     */
    const fetchTopWorkouts = async () => {
        if (searchQuery) {
            setHasResults(false)
            await dispatch(searchCreatorWorkouts({searchQuery}));
            setHasResults(true)
        }
    }

    return (
        <div className="text-gray1">
            <div className="px-5 flex flex-row items-center place-content-between">
                <div>
                    <Link href="/">
                        <a className="lg:hidden">
                            <FittrSmallIcon/>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="hidden lg:block">
                            <FittrBigIcon/>
                        </a>
                    </Link>
                </div>
                <div className="flex flex-row h-10 bg-primary rounded-3xl place-content-between">
                    {auth.username ?
                        <Link href="/admin">
                            <a
                                className="flex flex-row items-center font-medium text-secondary text-sm rounded-3xl h-full pl-5 pr-5 cursor-pointer hover:bg-darkPrimary">
                                {auth.attributes.preferred_username}
                            </a>
                        </Link> :
                        <>
                            <Link href="/signin">
                                <a className="flex flex-row items-center font-medium text-primary text-sm rounded-3xl h-full bg-secondary hover:bg-darkSecondary px-4 cursor-pointer z-10">
                                    Sign In
                                </a>
                            </Link>
                            <Link href="/signup">
                                <a
                                    className="flex flex-row items-center font-medium text-secondary text-sm rounded-r-3xl h-full pl-5 pr-5 cursor-pointer hover:bg-darkPrimary -ml-4">
                                    Sign Up
                                </a>
                            </Link>
                        </>}
                </div>
            </div>

            <div className="px-5 flex flex-col space-y-1 mt-4 sm:mt-2">
                <p className="font-medium text-4xl sm:text-6xl">Your workout plan</p>
                <p className="font-medium text-4xl sm:text-6xl">everywhere you go</p>
                <p className="font-normal text-md sm:text-lg pt-3">Create, share and play workouts on any device</p>
            </div>

            <div className="bg-[url('/heroimage.jpg')] h-96 sm:h-[32rem] bg-cover bg-center my-3"/>

            <form className="px-3 mt-4 mb-5 flex flex-col items-center">
                <input
                    className="shadow-gray2 shadow-lg w-5/6 h-14 sm:h-18 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="search"
                    placeholder="Search workouts"
                    value={searchQuery}
                    onFocus={() => setHasResults(false)}
                    onChange={event => setSearchQuery(event.target.value.toLowerCase())}/>
                <button
                    type="button"
                    onClick={fetchTopWorkouts}
                    className="my-4 w-full bg-primary rounded-3xl py-2 px-8 text-white font-semibold hover:bg-darkPrimary"> Search
                </button>
            </form>

            <div className="px-3">
                <WorkoutList
                    showCount={false}
                    workouts={workouts}
                    showEmptyListMessage={false}/>
                {hasResults && workouts.length === 0 ?
                    <p className="font-normal text-center">{"We can't find " + searchQuery}</p> : null}
            </div>

            <div className=" flex flex-col items-center rounded-md my-4 p-4">
                <p className="text-center">Fittree is a link to your workouts</p>
                <p className="text-center"><span className="font-semibold">all you need is a fittree.io/username</span>
                </p>
                <p className="text-center">to create awesome workouts and share</p>
            </div>

            <div className="flex flex-col items-center mb-4">
                <div className="flex flex-row mb-1">
                    <Link href="https://instagram.com/fittree.io">
                        <a target="_blank" className="mx-2">
                            <InstagramIcon/>
                        </a>
                    </Link>
                    <Link href="https://twitter.com/fittreeio">
                        <a target="_blank" className="mx-2">
                            <TwitterIcon/>
                        </a>
                    </Link>
                </div>
                <div>
                    <p className="font-medium">hello@fittree.io</p>
                </div>
            </div>
        </div>
    );
}
