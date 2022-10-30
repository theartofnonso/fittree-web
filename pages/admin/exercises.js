import {withSSRContext} from "aws-amplify";
import ShareIcon from "../../src/components/svg/share-box-line.svg";
import HomeIcon from "../../src/components/svg/home-4-line.svg";
import FunctionsIcon from "../../src/components/svg/function-fill.svg";
import EmptyState from "../../src/components/svg/empty_state.svg";
import CheckIcon from "../../src/components/svg/check-green-24.svg";
import FittrSmallIcon from "../../src/components/svg/fittr_small.svg";
import FittrBigIcon from "../../src/components/svg/fittr.svg";
import {generateShareableLink} from "../../src/utils/workout/workoutsHelperFunctions";
import {useEffect, useState} from "react";
import {searchExerciseOrWorkout} from "../../src/utils/workoutAndExerciseUtils";
import {useDispatch, useSelector} from "react-redux";
import {listExercises, selectAllExercises} from "../../src/features/auth/authUserExercisesSlice";
import ExerciseCard from "../../src/components/cards/ExerciseCard";
import PreviewExercise from "../../src/components/modals/exercise/PreviewExercise";

export default function Exercises({username}) {

    const dispatch = useDispatch();

    /**
     * Show snackbar for err message
     */
    const [showSnackBar, setShowSnackBar] = useState(false)

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
     * Hide Snackbar
     */
    useEffect(() => {
        if (showSnackBar) {
            setTimeout(() => {
                setShowSnackBar(false)
            }, 5000)
        }
    }, [showSnackBar])

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
     * copy shareable link
     */
    const copyShareableLink = () => {
        navigator.clipboard.writeText(generateShareableLink(username)).then(() => {
            setShowSnackBar(true)
        });
    }

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
                        Exercises</p>
                    <p className="text-sm sm:text-md md:text-lg font-light">
                        Find all your exercises here</p>
                </div>

                <form className="my-4 flex flex-col items-center">
                    <input
                        className="border-gray w-5/6 bg-secondary h-14 sm:h-18 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        type="text"
                        placeholder="Search exercises"
                        value={searchQuery}
                        onChange={event => onChangeSearch(event.target.value.toLowerCase())}/>
                </form>

                <p className="text-sm sm:text-md md:text-lg font-light">{`${filteredExercises.length} workouts`}</p>

                {filteredExercises.length > 0 ?
                    <div className="mt-1 grid gap-0.5 grid-cols-2 sm:grid-cols-4">
                        {filteredExercises.map((item, index) => {
                            return (
                                <button key={index} onClick={() => previewExercise(item)}>
                                    <ExerciseCard exercise={item}/>
                                </button>
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
                {showSnackBar ?
                    <div
                        className="fixed rounded-3xl bottom-0 left-0 ml-2 sm:ml-10 mb-8 p-2 flex flex-row justify-start items-center rounded bg-lightGreen w-1/2 sm:w-2/5">
                        <CheckIcon/>
                        <p className="ml-2 text-midnightGreen font-semibold">Link copied</p>
                    </div> : null}
            </div>
            <div className="flex flex-row justify-center items-center">
                <a rel="noreferrer" href="/" className="lg:hidden">
                    <FittrSmallIcon/>
                </a>
                <a rel="noreferrer" href="/" className="hidden lg:block">
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
