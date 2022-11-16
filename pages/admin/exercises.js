import {withSSRContext} from "aws-amplify";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {useDispatch, useSelector} from "react-redux";
import {exercisesAdded, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import NavBar from "../../src/components/views/NavBar";
import PageDescription from "../../src/components/views/PageDescription";
import Footer from "../../src/components/views/Footer";
import ExerciseList from "../../src/components/views/ExerciseList";
import {fetchUser, selectAuthUser} from "../../src/features/auth/authUserSlice";
import AddIcon from "../../src/assets/svg/add-line-white.svg";

export default function Exercises({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const exercises = useSelector(selectAllExercises);

    const [filteredExercises, setFilteredExercises] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [openCreateExercise, setOpenCreateExercise] = useState(false)


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
        }
    }, [user]);

    /**
     * Load fetched exercises
     */
    useEffect(() => {
        if (exercises) {
            setFilteredExercises(exercises)
        }
    }, [exercises]);

    /**
     * Filter exercises
     * @param query
     */
    const onChangeSearch = query => {
        setSearchQuery(query);
        const searchResult = searchExerciseOrWorkout(filteredExercises, query);
        setFilteredExercises(searchResult);
    };

    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar username={username}/>
                <PageDescription title="Exercises" description="Find all your exercises here"/>
                <div className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="search"
                        placeholder="Search exercises"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </div>
                <div className="flex flex-row">
                    <button
                        type="button"
                        className="flex flex-row items-center justify-center bg-primary rounded-md hover:bg-darkPrimary text-white pl-1 pr-3 py-1 mb-4 mr-2 font-semibold text-sm">
                        <AddIcon/>Create Exercise
                    </button>
                </div>
                <ExerciseList exercises={filteredExercises}
                              emptyListMessage="You don't have any exercises yet"/>
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
