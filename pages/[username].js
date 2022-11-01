import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {
    fetchCreatorProfile,
    selectCreator,
    selectCreatorStatus,
    selectExercises,
    selectWorkouts
} from "../src/features/unauth/CreatorProfileSlice";
import {useDispatch, useSelector} from "react-redux";
import {searchExerciseOrWorkout} from "../src/utils/workoutAndExerciseUtils";
import workoutsConstants from "../src/utils/workout/workoutsConstants";
import CreatorProfile404 from "../src/components/views/CreatorProfile404";
import CreatorProfile500 from "../src/components/views/CreatorProfile500";
import CreatorProfileLoading from "../src/components/views/CreatorProfileLoading";
import PreviewWorkout from "../src/components/modals/workout/PreviewWorkout";
import Profile from "../src/components/views/Profile";
import WorkoutList from "../src/components/views/WorkoutList";
import Footer from "../src/components/views/Footer";
import NavBar from "../src/components/views/NavBar";

const CreatorProfile = () => {

    /**
     * Retrieve unauth's username
     */
    const router = useRouter()
    const {username} = router.query

    const dispatch = useDispatch();

    const profile = useSelector(selectCreator)

    const status = useSelector(selectCreatorStatus)

    const workouts = useSelector(selectWorkouts)

    const exercises = useSelector(selectExercises)

    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    const [currentWorkout, setCurrentWorkout] = useState(null)

    const [searchQuery, setSearchQuery] = React.useState('');

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
        const searchResult = searchExerciseOrWorkout(workouts, query)
        setFilteredWorkouts(searchResult);
    };

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentWorkout(null)
    }

    /**
     * Retrieve unauth's profile
     * @type {Dispatch<AnyAction>}
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchCreatorProfile({username: username}));
        }
    }, [username])

    if (status === workoutsConstants.profileStatus.LOADING) {
        /**
         * Creator page is still loading
         */
        return <CreatorProfileLoading/>
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

            <>
                <div className="container mx-auto p-4 min-h-screen">
                    <NavBar/>
                    <Profile user={profile}/>
                    <form className="my-4 flex flex-col items-center">
                        <input
                            className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="search"
                            type="text"
                            placeholder="Search workouts"
                            value={searchQuery}
                            onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                    </form>
                    <WorkoutList username={username}
                                 workouts={filteredWorkouts}
                                 exercises={exercises}
                                 onSelectWorkout={(workout) => setCurrentWorkout(workout)}
                                 emptyListMessage="You don't have any workouts yet"/>
                    <PreviewWorkout
                        workout={currentWorkout}
                        close={closePreview}/>
                    <Footer/>
                </div>
            </>

        )
    }
}

export default CreatorProfile;
