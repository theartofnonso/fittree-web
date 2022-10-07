import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {
    fetchCreatorProfile,
    selectCreator,
    selectCreatorStatus,
    selectExercises,
    selectWorkouts
} from "../src/features/CreatorProfileSlice";
import {useDispatch, useSelector} from "react-redux";
import {searchExerciseOrWorkout} from "../src/utils/workoutAndExerciseUtils";
import {Avatar} from "@mui/material";
import workoutsConstants from "../src/utils/workout/workoutsConstants";
import {
    generateShareableLink,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout,
    sortWorkouts
} from "../src/utils/workout/workoutsHelperFunctions";
import CreatorProfile404 from "../src/components/views/CreatorProfile404";
import CreatorProfile500 from "../src/components/views/CreatorProfile500";
import CreatorProfileLoading from "../src/components/views/CreatorProfileLoading";
import PlayRepsAndSetsWorkout from "../src/components/modals/workout/PlayRepsAndSetsWorkout";
import PlayCircuitWorkout from "../src/components/modals/workout/PlayCircuitWorkout";
import ShareIcon from "../src/components/svg/share-box-line.svg";
import WorkoutCard from "../src/components/cards/WorkoutCard";
import PreviewWorkout from "../src/components/modals/workout/PreviewWorkout";

const CreatorProfile = () => {

    /**
     * Retrieve creator's username
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

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    const [searchQuery, setSearchQuery] = React.useState('');

    const [open, setOpen] = React.useState(true);

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
     * Play workout
     */
    const togglePlayWorkout = (shouldPlay) => {
        setShouldPlayWorkout(shouldPlay)
    }

    /**
     * Preview a workout from the list
     */
    const previewWorkout = (selectedWorkout) => {
        const enrichedWorkout = {
            ...selectedWorkout,
            workoutExercises: sortWorkouts(selectedWorkout, exercises),
        };
        setCurrentWorkout(enrichedWorkout);
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentWorkout(null)
    }

    /**
     * Display appropriate workout play component
     * @returns {JSX.Element}
     */
    const getWorkoutPlayComponent = () => {

        if (currentWorkout.type === workoutsConstants.workoutType.CIRCUIT) {
            const rounds = loadCircuitWorkout(currentWorkout);
            return <PlayCircuitWorkout
                workout={currentWorkout}
                rounds={rounds}
                end={() => togglePlayWorkout(false)}/>

        } else {
            const exercises = loadRepsAndSetsWorkout(currentWorkout);
            return <PlayRepsAndSetsWorkout
                workout={currentWorkout}
                exercises={exercises}
                end={() => togglePlayWorkout(false)}/>
        }
    }

    /**
     * copy shareable link
     */
    const copyShareableLink = () => {
        navigator.clipboard.writeText(generateShareableLink(username)).then(() => {
            setSnackbarMessage("Link copied")
            setShowSnackBar(true)
        });
    }

    /**
     * Display Avatar
     * @returns {JSX.Element}
     */
    const displayAvatar = () => {
        if (profile) {
            return profile.displayProfile ?
                <Avatar sx={{backgroundColor: "#ef7a75", width: 80, height: 80}} alt="Display Profile"
                        src={"https://" + profile.displayProfile}/> :
                <Avatar sx={{backgroundColor: "#ef7a75", width: 80, height: 80}} alt="Display profile"
                        src={"https://" + profile.displayProfile}>
                    {profile.preferred_username.slice(0, 1).toUpperCase()}
                </Avatar>
        }
    };

    const handleClose = () => {
        setShowSnackBar(false);
    };

    /**
     * Retrieve creator's profile
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
            <div className="container mx-auto px-2 sm:px-10">
                <button className="my-4">
                    <ShareIcon/>
                </button>
                <div className="flex flex-col items-center">
                    <div className="rounded-full w-1/4 sm:w-1/6 md:w-24 overflow-hidden mb-2">
                        <img src={"https://" + profile.displayProfile} alt="Display profile" className="object-cover"/>
                    </div>
                    <p className="font-semibold py-1 text-base sm:text-2xl md:text-lg">{profile.preferred_username}</p>
                    <p className="font-light py-1 text-sm sm:text-xl md:text-base">{profile.displayBrief}</p>
                </div>
                <form className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search workouts"/>
                </form>

                <div className="grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                    {workouts.length > 0 ? filteredWorkouts.map((item, index) => {
                        return (
                        //     <button key={index} onClick={() => previewWorkout(item)}>
                                <WorkoutCard key={index} workout={item}/>
                            // </button>
                        );
                    }) : null}
                </div>
                {currentWorkout && !shouldPlayWorkout ?
                    <PreviewWorkout
                        workout={currentWorkout}
                        play={() => togglePlayWorkout(true)}
                        close={closePreview}/> : null}
            </div>
        )
    }
}

export default CreatorProfile;
