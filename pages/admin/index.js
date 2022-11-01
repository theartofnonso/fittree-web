import {withSSRContext} from "aws-amplify";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import CreatorProfileLoading from "../../src/components/views/CreatorProfileLoading";
import {fetchUser, selectAuthUser, selectAuthUserStatus} from "../../src/features/auth/authUserSlice";
import {exercisesAdded, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import {selectAllWorkouts, workoutsAdded} from "../../src/features/auth/authUserWorkoutsSlice";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import Profile from "../../src/components/views/Profile";
import NavBar from "../../src/components/views/NavBar";
import WorkoutList from "../../src/components/views/WorkoutList";
import Footer from "../../src/components/views/Footer";

export default function Dashboard({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const status = useSelector(selectAuthUserStatus)

    const workouts = useSelector(selectAllWorkouts);

    const exercises = useSelector(selectAllExercises)

    const [filteredWorkouts, setFilteredWorkouts] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

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
     * Creator page is still loading
     */
    if (status === workoutsConstants.profileStatus.LOADING) {
        return <CreatorProfileLoading/>
    }

    /**
     * Creator has loaded
     */
    return (
        <div>
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar username={username}/>
                <Profile user={user}/>
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
