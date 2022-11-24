import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {fetchCreatorProfile, selectCreator, selectCreatorStatus,} from "../src/features/unauth/creatorProfileSlice";
import {useDispatch, useSelector} from "react-redux";
import {searchExerciseOrWorkout} from "../src/utils/workoutAndExerciseUtils";
import workoutsConstants from "../src/utils/workout/workoutsConstants";
import CreatorProfile404 from "../src/components/views/CreatorProfile404";
import CreatorProfile500 from "../src/components/views/CreatorProfile500";
import FittreeLoading from "../src/components/views/FittreeLoading";
import Profile from "../src/components/views/Profile";
import WorkoutList from "../src/components/views/WorkoutList";
import Footer from "../src/components/views/Footer";
import NavBar from "../src/components/views/NavBar";
import {selectAllWorkouts, workoutsAdded} from "../src/features/unauth/unAuthWorkoutsSlice";

const CreatorProfile = () => {

    /**
     * Retrieve unauth's username
     */
    const router = useRouter()
    const {username} = router.query

    const dispatch = useDispatch();

    const profile = useSelector(selectCreator)

    const status = useSelector(selectCreatorStatus)

    const workouts = useSelector(selectAllWorkouts)

    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    const [searchQuery, setSearchQuery] = React.useState('');

    /**
     * Retrieve unauth's profile
     * @type {Dispatch<AnyAction>}
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchCreatorProfile({username}));
        }
    }, [username])

    /**
     * Load fetched exercises and workouts
     */
    useEffect(() => {
        if (profile) {
            dispatch(workoutsAdded(profile.workouts.items));
        }
    }, [profile]);

    /**
     * Load workout into filtered workout
     */
    useEffect(() => {
        if (workouts.length > 0) {
            setFilteredWorkouts(workouts)
        }
    }, [workouts])

    /**
     * Filter workout
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(filteredWorkouts, query)
        setFilteredWorkouts(searchResult);
    };

    if (status === workoutsConstants.profileStatus.LOADING) {
        /**
         * Creator page is still loading
         */
        return <FittreeLoading/>
    } else if (status === workoutsConstants.profileStatus.FAILED) {
        /**
         * Backend error from server
         */
        return <CreatorProfile500 username={username}/>

    } else {
        /**
         * Page is ready but profile may not exists
         */
        if (profile === null) {
            /**
             * Creator doesn't exist
             */
            return <CreatorProfile404 username={username}/>
        }
        /**
         * Loaded Creator page content
         */
        return (
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar user={profile}/>
                <Profile user={profile}/>
                <div className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search workouts"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </div>
                <WorkoutList
                    workouts={filteredWorkouts}
                    emptyListMessage={username + " " + "doesn't have any workouts yet"}/>
                <Footer/>
            </div>
        )
    }
}

export default CreatorProfile;
