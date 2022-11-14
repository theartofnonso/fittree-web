import {withSSRContext} from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import {selectAllWorkouts, workoutsAdded} from "../../src/features/auth/authUserWorkoutsSlice";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {exercisesAdded, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import NavBar from "../../src/components/views/NavBar";
import PageDescription from "../../src/components/views/PageDescription";
import Footer from "../../src/components/views/Footer";
import WorkoutList from "../../src/components/views/WorkoutList";
import AddIcon from "../../src/assets/svg/add-line-white.svg";
import CreateWorkout from "../../src/components/screens/workout/CreateWorkout";
import {fetchUser, selectAuthUser} from "../../src/features/auth/authUserSlice";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";

export default function Workouts({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const workouts = useSelector(selectAllWorkouts)

    const [filteredWorkouts, setFilteredWorkouts] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [workoutType, setWorkoutType] = useState(workoutsConstants.workoutType.CIRCUIT)

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
        const searchResult = searchExerciseOrWorkout(filteredWorkouts, query);
        setFilteredWorkouts(searchResult);
    };

    return (
        <>
            <div className="container mx-auto p-4 h-screen">
                <NavBar username={username}/>
                <PageDescription title="Workouts in draft" description="Find workouts yet to go live"/>
                <div className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="search"
                        placeholder="Search workouts"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </div>
                <div className="flex flex-row">
                    <button
                        type="button"
                        onClick={() => {
                            setWorkoutType(workoutsConstants.workoutType.CIRCUIT)
                            setOpenCreateWorkout(true)
                        }}
                        className="flex flex-row items-center justify-center bg-primary rounded-md hover:bg-darkPrimary text-white pl-1 pr-3 py-1 mb-4 mr-2 font-semibold text-sm">
                        <AddIcon/>Create Circuits
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setWorkoutType(workoutsConstants.workoutType.REPS_SETS)
                            setOpenCreateWorkout(true)
                        }}
                        className="flex flex-row items-center justify-center bg-primary rounded-md hover:bg-darkPrimary text-white pl-1 pr-3 py-1 mb-4 font-semibold text-sm">
                        <AddIcon/>Create Reps and Sets
                    </button>
                </div>
                <WorkoutList workouts={filteredWorkouts}
                             emptyListMessage="You don't have any workouts yet"
                             isAuthUser={true}/>
                <CreateWorkout
                    open={openCreateWorkout}
                    close={() => setOpenCreateWorkout(false)}
                    user={user}
                    params={{workoutId: "", workoutType}}/>
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
