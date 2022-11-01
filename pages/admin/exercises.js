import {withSSRContext} from "aws-amplify";
import EmptyState from "../../src/components/svg/empty_state.svg";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {useDispatch, useSelector} from "react-redux";
import {listExercises, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import ExerciseCard from "../../src/components/cards/ExerciseCard";
import PreviewExercise from "../../src/components/modals/exercise/PreviewExercise";
import NavBar from "../../src/components/views/NavBar";
import PageDescription from "../../src/components/views/PageDescription";
import Footer from "../../src/components/views/Footer";

export default function Exercises({username}) {

    const dispatch = useDispatch();

    const exercises = useSelector(selectAllExercises);

    const [filteredExercises, setFilteredExercises] = useState(exercises);

    const [searchQuery, setSearchQuery] = useState("");

    const [currentExercise, setCurrentExercise] = useState(null)

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
        const searchResult = searchExerciseOrWorkout(exercises, query);
        setFilteredExercises(searchResult);
    };

    /**
     * Preview exercise information
     */
    const previewExercise = (selectedExercise) => {
        setCurrentExercise(selectedExercise)
    }

    /**
     * Close the preview modal
     */
    const closePreview = () => {
        setCurrentExercise(null)
    }

    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <NavBar username={username}/>
                <PageDescription title="Exercises" description="Find all your exercises here"/>
                <form className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search exercises"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </form>

                <p className="text-sm sm:text-md md:text-lg font-light">{`${filteredExercises.length} exercises`}</p>

                {filteredExercises.length > 0 ?
                    <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-4">
                        {filteredExercises.map((item, index) => {
                            return (
                                <div key={index} onClick={() => previewExercise(item)}>
                                    <ExerciseCard exercise={item}/>
                                </div>
                            );
                        })}
                    </div> :
                    <div className="flex flex-col justify-center items-center h-screen">
                        <EmptyState/>
                        <p className="font-normal mt-4">You don't have any exercises</p>
                    </div>}
                {currentExercise ?
                    <PreviewExercise
                        exercise={currentExercise}
                        close={closePreview}/> : null}
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
