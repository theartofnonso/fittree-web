import {withSSRContext} from "aws-amplify";
import ShareIcon from "../../src/components/svg/share-box-line.svg";
import HomeIcon from "../../src/components/svg/home-4-line.svg";
import FunctionsIcon from "../../src/components/svg/function-fill.svg";
import EmptyState from "../../src/components/svg/empty_state.svg";
import CheckIcon from "../../src/components/svg/check-green-24.svg";
import FittrSmallIcon from "../../src/components/svg/fittr_small.svg";
import FittrBigIcon from "../../src/components/svg/fittr.svg";
import {useDispatch, useSelector} from "react-redux";
import {listWorkouts, selectAllWorkouts} from "../../src/features/auth/authUserWorkoutsSlice";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {
    generateShareableLink,
    loadCircuitWorkout,
    loadRepsAndSetsWorkout,
    sortWorkouts
} from "../../src/utils/workout/workoutsHelperFunctions";
import WorkoutCard from "../../src/components/cards/WorkoutCard";
import PreviewWorkout from "../../src/components/modals/workout/PreviewWorkout";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import PlayCircuitWorkout from "../../src/components/modals/workout/PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "../../src/components/modals/workout/PlayRepsAndSetsWorkout";
import {listExercises, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";

export default function Workouts({username}) {

    const dispatch = useDispatch();

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

    const exercises = useSelector(selectAllExercises)

    const workouts = useSelector(selectAllWorkouts)

    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    const [searchQuery, setSearchQuery] = useState("");

    const [currentWorkout, setCurrentWorkout] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    useEffect(() => {
        if (username) {
            dispatch(listExercises({username}));
            dispatch(listWorkouts({username}));
        }
    }, [username])

    useEffect(() => {
        if (workouts) {
            const notLive = workouts.filter(item => !item.isLive)
            setFilteredWorkouts(notLive)
        }
    }, [workouts]);

    /**
     * Filter exercises
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(workouts, query);
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
            setShowSnackBar(true)
        });
    }

    /**
     * Display workouts count
     * @returns {JSX.Element}
     */
    const displayDraftWorkoutsCount = () => {
        let count = 0;
        if (searchQuery) {
            count = filteredWorkouts.filter(workout => !workout.empty && !workout.isLive).length;
        } else {
            count = workouts.filter(workout => !workout.empty && !workout.isLive).length;
        }
        return <p className="text-sm sm:text-md md:text-lg font-light">{`${count} workouts`}</p>;
    };

    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <div className="mb-10 flex flex-row items-center place-content-between">
                    <div className="flex flex-row">
                        <button className="mr-8" onClick={copyShareableLink}>
                            <ShareIcon/>
                        </button>
                        <div

                            className="flex flex-row rounded-full bg-secondary flex flex-row justify-start items-center px-4 py-2 hidden sm:flex">
                            <a className="mr-2" href="/admin">
                                <HomeIcon/>
                            </a>
                            <a rel="noreferrer" href="/admin/exercises">
                                <p className="font-medium mx-2 text-gray1 cursor-pointer hover:text-gray">Exercises</p>
                            </a>
                            <a rel="noreferrer" href="/admin/workouts">
                                <p className="font-medium mx-2 text-gray1 cursor-pointer hover:text-gray">Workouts</p>
                            </a>
                            <a rel="noreferrer" href="/admin/settings">
                                <p className="font-medium mx-2 text-gray1 cursor-pointer hover:text-gray">Settings</p>
                            </a>
                        </div>
                    </div>
                    <button className="ml-8 sm:hidden" onClick={copyShareableLink}>
                        <FunctionsIcon/>
                    </button>
                </div>
                <div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-medium">
                        Workouts in draft</p>
                    <p className="text-sm sm:text-md md:text-lg font-light">
                        Find workouts yet to go live</p>
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

                {displayDraftWorkoutsCount()}
                {workouts.filter(workout => !workout.isLive).length > 0 ?
                    <div className="grid gap-0.5 grid-cols-2 sm:grid-cols-3">
                        {filteredWorkouts.map((item, index) => {
                            return (
                                <button key={index} onClick={() => previewWorkout(item)}>
                                    <WorkoutCard workout={item}/>
                                </button>
                            );
                        })}
                    </div> :
                    <div className="flex flex-col justify-center items-center h-screen">
                        <EmptyState/>
                        <p className="font-normal mt-4">You don't have any workouts</p>
                    </div>}
                {currentWorkout && !shouldPlayWorkout ?
                    <PreviewWorkout
                        workout={currentWorkout}
                        play={() => togglePlayWorkout(true)}
                        close={closePreview}/> : null}
                {shouldPlayWorkout ? getWorkoutPlayComponent() : null}
                {showSnackBar ?
                    <div
                        className="absolute rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-lightGreen w-1/2 sm:w-2/5">
                        <CheckIcon/>
                        <p className="ml-2 text-midnightGreen font-semibold">Link copied</p>
                    </div> : null}
            </div>
            <div className="flex flex-row justify-center items-center">
                <a rel="noreferrer" href="/" target="_blank" className="lg:hidden">
                    <FittrSmallIcon/>
                </a>
                <a rel="noreferrer" href="/" target="_blank" className="hidden lg:block">
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
                username: user.username
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
