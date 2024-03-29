import {withSSRContext} from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import CreateWorkout from "./CreateWorkout";
import Footer from "../../views/Footer";
import WorkoutList from "../../views/WorkoutList";
import {searchExerciseOrWorkout} from "../../../utils/workoutAndExerciseUtils";
import {selectAllWorkouts, workoutsAdded} from "../../../features/auth/authWorkoutsSlice";
import NavBar from "../../views/NavBar";
import Profile from "../../views/Profile";

export default function Workouts({user}) {

    const dispatch = useDispatch();

    const workouts = useSelector(selectAllWorkouts)

    console.log(workouts)

    const [filteredWorkouts, setFilteredWorkouts] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [openCreateWorkout, setOpenCreateWorkout] = useState(false)

    const [workoutType, setWorkoutType] = useState(workoutsConstants.workoutType.CIRCUIT)

    /**
     * Load fetched exercises and workouts
     */
    useEffect(() => {
        if (user) {
            dispatch(workoutsAdded(user.workouts.items));
        }
    }, [user]);

    /**
     * Load fetched workouts
     */
    useEffect(() => {
        if (workouts) {
            setFilteredWorkouts(workouts)
        }
    }, [workouts]);

    /**
     * Filter workouts
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        if(query) {
            const searchResult = searchExerciseOrWorkout(filteredWorkouts, query);
            setFilteredWorkouts(searchResult);
        } else {
            setFilteredWorkouts(workouts);
        }
    };

    /**
     * Open the Create workout screen
     */
    const openWorkoutCreator = (workoutType) => {
        setWorkoutType(workoutType)
        setOpenCreateWorkout(true)
    }

    if(openCreateWorkout) {
        return (
            <CreateWorkout
                close={() => setOpenCreateWorkout(false)}
                params={{workoutId: "", workoutType}}/>
        )
    }

    return (
        <div className="container mx-auto h-screen">
            <NavBar user={user}
                    isAuth={true}
                    onCreateCircuit={() => openWorkoutCreator(workoutsConstants.workoutType.CIRCUIT)}
                    onCreateRepsAndSets={() => openWorkoutCreator(workoutsConstants.workoutType.REPS_SETS)}/>
            <Profile username={user.preferred_username}/>
            <div className="mt-4 mb-5 flex flex-col items-center">
                <input
                    className="shadow-gray2 shadow-lg w-5/6 h-14 sm:h-18 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="search"
                    placeholder="Search workouts"
                    value={searchQuery}
                    onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
            </div>
            <WorkoutList
                workouts={filteredWorkouts}
                emptyListMessage="You don't have any workouts yet"/>
            <Footer/>
        </div>
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
