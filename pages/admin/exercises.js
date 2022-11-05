import {withSSRContext} from "aws-amplify";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {useDispatch, useSelector} from "react-redux";
import {listExercises, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import NavBar from "../../src/components/views/NavBar";
import PageDescription from "../../src/components/views/PageDescription";
import Footer from "../../src/components/views/Footer";
import ExerciseList from "../../src/components/views/ExerciseList";

export default function Exercises({username}) {

    const dispatch = useDispatch();

    const exercises = useSelector(selectAllExercises);

    const [filteredExercises, setFilteredExercises] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Fetch auth users exercises
     */
    useEffect(() => {
        if (username) {
            dispatch(listExercises({username}));
        }
    }, [username])

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
