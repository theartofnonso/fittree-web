import {useRouter} from "next/router";
import PreviewWorkout from "../../src/components/screens/workout/PreviewWorkout";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCreatorWorkout,
    selectGetWorkoutStatus,
    selectWorkoutById as unauthSelectWorkoutById
} from "../../src/features/unauth/unAuthWorkoutsSlice";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {useEffect} from "react";
import CreatorWorkout404 from "../../src/components/views/errorPages/CreatorWorkout404";


const CreatorWorkout = () => {

    /**
     * Retrieve workout Id
     */
    const router = useRouter()
    const {workoutId} = router.query

    const dispatch = useDispatch();

    const workout = useSelector(state => unauthSelectWorkoutById(state, workoutId));

    const status = useSelector(selectGetWorkoutStatus)

    /**
     * Retrieve unauth's creator workout
     * @type {Dispatch<AnyAction>}
     */
    useEffect(() => {
        if (workoutId) {
            dispatch(fetchCreatorWorkout({workoutId}));
        }
    }, [workoutId])

    if (status === workoutsConstants.profileStatus.LOADING) {
        /**
         * Creator workout page is still loading
         */
        return <FittreeLoading/>
    } else if (status === workoutsConstants.profileStatus.FAILED) {
        /**
         * Backend error from server
         */
        return <CreatorWorkout404/>

    } else {
        /**
         * Page is ready but workout may not exist
         */
        if (workout) {
            /**
             * Loaded Creator workout
             */
            return (
                <PreviewWorkout
                    workoutId={workout.id}
                    previewOnly={true}/>
            )
        } else {

            /**
             * Creator workout doesn't exist
             */
            return <CreatorWorkout404/>
        }

    }

}

export default CreatorWorkout
