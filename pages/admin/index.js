import {withSSRContext} from "aws-amplify";
import ShareIcon from "../../src/components/svg/share-box-line.svg";
import FunctionsIcon from "../../src/components/svg/function-fill.svg";
import {
    generateShareableLink,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout,
    sortWorkouts
} from "../../src/utils/workout/workoutsHelperFunctions";
import Socials from "../../src/components/views/Socials";
import {useEffect, useState} from "react";
import CheckIcon from "../../src/components/svg/check-green-24.svg";
import {useDispatch, useSelector} from "react-redux";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import CreatorProfileLoading from "../../src/components/views/CreatorProfileLoading";
import {fetchUser, selectAuthUser, selectAuthUserStatus} from "../../src/features/auth/authUserSlice";
import {exercisesAdded, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import {selectAllWorkouts, workoutsAdded} from "../../src/features/auth/authUserWorkoutsSlice";
import WorkoutCard from "../../src/components/cards/WorkoutCard";
import EmptyState from "../../src/components/svg/empty_state.svg";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import PreviewWorkout from "../../src/components/modals/workout/PreviewWorkout";
import PlayCircuitWorkout from "../../src/components/modals/workout/PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "../../src/components/modals/workout/PlayRepsAndSetsWorkout";
import FittrSmallIcon from "../../src/components/svg/fittr_small.svg";
import FittrBigIcon from "../../src/components/svg/fittr.svg";
import HomeIcon from "../../src/components/svg/home-4-line.svg";

export default function Dashboard({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const status = useSelector(selectAuthUserStatus)

    const workouts = useSelector(selectAllWorkouts);

    const exercises = useSelector(selectAllExercises)

    const [filteredWorkouts, setFilteredWorkouts] = useState([]);

    const [currentWorkout, setCurrentWorkout] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    /**
     * Fetch user
     */
    useEffect(() => {
        if (username) {
            dispatch(fetchUser({username}));
        }
    }, [username])

    /**
     * Load fetched exercises and workouts
     */
    useEffect(() => {
        if (user) {
            dispatch(exercisesAdded(user.exercises.items));
            dispatch(workoutsAdded(user.workouts.items));
        }
    }, [user]);

    /**
     * Filter workouts
     */
    useEffect(() => {
        if (workouts) {
            const isLive = workouts.filter(item => item.isLive)
            setFilteredWorkouts(isLive)
        }
    }, [workouts]);

    /**
     * Hide Snackbar
     */
    useEffect(() => {
        if (showSnackBar) {
            setTimeout(() => {
                setShowSnackBar(false)
            }, 5000)
        }
    }, [showSnackBar])

    /**
     * copy shareable link
     */
    const copyShareableLink = () => {
        navigator.clipboard.writeText(generateShareableLink(username)).then(() => {
            setShowSnackBar(true)
        });
    }

    /**
     * Filter workout
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(workouts, query)
        console.log(searchResult.length)
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
     * Display Avatar
     * @returns {JSX.Element}
     */
    const displayAvatar = () => {
        if (user.displayProfile) {
            return (
                <img src={"https://" + user.displayProfile} alt="Display profile" className="object-cover"/>)
        } else {
            const initials = user.preferred_username.substring(0,1).toUpperCase()
            return (<p className="text-3xl text-white font-semibold">{initials}</p>)
        }
    };

    /**
     * Creator page is still loading
     */
    if (status === workoutsConstants.profileStatus.LOADING) {
        return <CreatorProfileLoading/>
    }

    /**
     * Creator has loaded
     */
    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <div className="mb-10 flex flex-row items-center place-content-between">
                    <div className="flex flex-row items-center">
                        <div className="mr-8" onClick={copyShareableLink}>
                            <ShareIcon/>
                        </div>
                        <div
                            className="flex flex-row rounded-full bg-secondary flex flex-row justify-start items-center px-4 py-2 hidden sm:flex">
                            <a className="mr-2 hover:text-gray" href="/admin">
                                <HomeIcon/>
                            </a>
                            <a rel="noreferrer" href="/admin/exercises">
                                <p className="font-normal mx-2 text-gray1 cursor-pointer hover:text-gray">Exercises</p>
                            </a>
                            <a rel="noreferrer" href="/admin/workouts">
                                <p className="font-normal mx-2 text-gray1 cursor-pointer hover:text-gray">Workouts</p>
                            </a>
                            <a rel="noreferrer" href="/admin/settings">
                                <p className="font-normal mx-2 text-gray1 cursor-pointer hover:text-gray">Settings</p>
                            </a>
                        </div>
                    </div>
                    <div className="ml-8 sm:hidden" onClick={copyShareableLink}>
                        <FunctionsIcon/>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="rounded-full w-24 h-24 overflow-hidden mb-2 bg-primary flex flex-row items-center justify-center">
                        {displayAvatar()}
                    </div>
                    <p className="font-semibold text-base md:text-lg">{user.preferred_username}</p>
                    <p className="font-light py-1 text-sm md:text-base text-center break-words whitespace-pre-line">{user.displayBrief}</p>
                </div>
                <div className="flex flex-row justify-center items-center px-4">
                    <Socials profile={user}/>
                </div>
                <form className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search workouts"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </form>

                <p className="text-sm sm:text-md md:text-lg font-light">{`${filteredWorkouts.length} workouts`}</p>

                {filteredWorkouts.length > 0 ?
                    <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                        {filteredWorkouts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => previewWorkout(item)}>
                                    <WorkoutCard workout={item}/>
                                </div>
                            );
                        })}
                    </div> :
                    <div className="flex flex-col justify-center items-center h-screen">
                        <EmptyState/>
                        <p className="font-normal mt-4">{user.preferred_username} has no workouts</p>
                    </div>}
                {currentWorkout && !shouldPlayWorkout ?
                    <PreviewWorkout
                        workout={currentWorkout}
                        play={() => togglePlayWorkout(true)}
                        close={closePreview}/> : null}
                {shouldPlayWorkout ? getWorkoutPlayComponent() : null}
                {showSnackBar ?
                    <div
                        className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-lightGreen w-1/2 sm:w-2/5">
                        <CheckIcon/>
                        <p className="ml-2 text-midnightGreen font-semibold">Link copied</p>
                    </div> : null}
            </div>
            <div className="flex flex-row justify-center items-center">
                <a rel="noreferrer" href="/" className="lg:hidden">
                    <FittrSmallIcon/>
                </a>
                <a rel="noreferrer" href="/" className="hidden lg:block">
                    <FittrBigIcon/>
                </a>
            </div>
        </>
    )

}


export async function getServerSideProps(context) {

    const {Auth} = withSSRContext(context)

    try {
        const user = await Auth.currentAuthenticatedUser()

        return {
            props: {
                authenticated: true,
                username: user.attributes.email,
            }
        }

    } catch (err) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }
}
