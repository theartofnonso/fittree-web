import {withSSRContext} from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import AddIcon from "/src/assets/svg/add-line-white.svg";
import workoutsConstants from "../../../utils/workout/workoutsConstants";
import CreateWorkout from "./CreateWorkout";
import Footer from "../../views/Footer";
import WorkoutList from "../../views/WorkoutList";
import {searchExerciseOrWorkout} from "../../../utils/workoutAndExerciseUtils";
import {selectAllWorkouts, workoutsAdded} from "../../../features/auth/authWorkoutsSlice";

export default function Workouts({user}) {

    const dispatch = useDispatch();

    const workouts = useSelector(selectAllWorkouts)

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
        <div className="container mx-auto h-screen">
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
            <WorkoutList
                workouts={filteredWorkouts}
                emptyListMessage="You don't have any workouts yet"/>
            {openCreateWorkout ?
                <CreateWorkout
                    close={() => setOpenCreateWorkout(false)}
                    params={{workoutId: "", workoutType}}/> : null}
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
