import {withSSRContext} from "aws-amplify";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import workoutsConstants from "../../src/utils/workout/workoutsConstants";
import FittreeLoading from "../../src/components/views/FittreeLoading";
import {fetchUser, selectAuthUser, selectAuthUserStatus} from "../../src/features/auth/authUserSlice";
import {workoutsAdded} from "../../src/features/auth/authWorkoutsSlice";
import Profile from "../../src/components/views/Profile";
import NavBar from "../../src/components/views/NavBar";
import Workouts from "../../src/components/screens/workout/Workouts";

export default function Dashboard({username}) {

    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const status = useSelector(selectAuthUserStatus)

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
