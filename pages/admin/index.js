import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {fetchUser, selectAuthUser, selectAuthUserStatus} from "../../src/features/auth/authUserSlice";
import {workoutsAdded} from "../../src/features/auth/authWorkoutsSlice";
import Workouts from "../../src/components/screens/workout/Workouts";
import useAuth from "../../src/utils/aws-utils/useAuth";

export default function Dashboard() {

    const auth = useAuth("/signin")

    const username = auth?.username

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const status = useSelector(selectAuthUserStatus)

    /**
     * Fetch user
     */
    useEffect(() => {
        if(auth) {
            dispatch(fetchUser({username}));
        }
    }, [auth])

    /**
     * Load fetched exercises and workouts
     */
    useEffect(() => {
        if (user) {
            dispatch(workoutsAdded(user.workouts.items));
        }
    }, [user]);

    /**
     * Creator page is still loading
     */
    if (status === workoutsConstants.profileStatus.LOADING) {
        return <FittreeLoading/>
    }

    /**
     * Creator has loaded
     */
    return (
        <div className="container mx-auto px-2 py-4 min-h-screen">
            <Workouts user={user}/>
        </div>
    )

}
