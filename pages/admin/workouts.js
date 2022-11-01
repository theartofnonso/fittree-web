import {withSSRContext} from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import {listWorkouts, selectAllWorkouts} from "../../src/features/auth/authUserWorkoutsSlice";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {
    loadCircuitWorkout,
    loadRepsAndSetsWorkout,
} from "../../src/utils/workout/workoutsHelperFunctions";
import PreviewWorkout from "../../src/components/modals/workout/PreviewWorkout";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import PlayCircuitWorkout from "../../src/components/modals/workout/PlayCircuitWorkout";
import PlayRepsAndSetsWorkout from "../../src/components/modals/workout/PlayRepsAndSetsWorkout";
import {listExercises, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import NavBar from "../../src/components/views/NavBar";
import PageDescription from "../../src/components/views/PageDescription";
import Footer from "../../src/components/views/Footer";
import WorkoutList from "../../src/components/views/WorkoutList";

export default function Workouts({username}) {

    const dispatch = useDispatch();

    const exercises = useSelector(selectAllExercises)

    const workouts = useSelector(selectAllWorkouts)

    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

    const [searchQuery, setSearchQuery] = useState("");

    const [currentWorkout, setCurrentWorkout] = useState(null)

    const [shouldPlayWorkout, setShouldPlayWorkout] = useState(false)

    /**
     * Fetch auth users exercises and workouts
     */
    useEffect(() => {
        if (username) {
            dispatch(listExercises({username}));
            dispatch(listWorkouts({username}));
        }
    }, [username])

    /**
     * Load fetched workouts
     */
    useEffect(() => {
        if (workouts) {
            const notLive = workouts.filter(item => !item.isLive)
            setFilteredWorkouts(notLive)
        }
    }, [workouts]);

    /**
     * Filter workouts
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

    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar username={username}/>
                <PageDescription title="Workouts in draft" description="Find workouts yet to go live"/>
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
                {currentWorkout && !shouldPlayWorkout ?
                    <PreviewWorkout
                        workout={currentWorkout}
                        play={() => togglePlayWorkout(true)}
                        close={closePreview}/> : null}
                {shouldPlayWorkout ? getWorkoutPlayComponent() : null}
            </div>
            <Footer/>
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
