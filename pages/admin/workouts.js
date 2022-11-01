import {withSSRContext} from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import {listWorkouts, selectAllWorkouts} from "../../src/features/auth/authUserWorkoutsSlice";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
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
                             emptyListMessage="You don't have any workouts yet"/>
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
