import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";

const useAuth = (redirectUrl = "") => {

    const router = useRouter()

    const [auth, setAuth] = useState(null)

    useEffect(() => {
        const doStuff = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                await handleAuth(router, redirectUrl)
                setAuth(user)
            } catch (err) {
                await handleNoAuth(router, redirectUrl)
                setAuth({username: ""})
            }
        }
        doStuff()
    }, [])

    return auth
}

/**
 * If redirect url is /admin, then user either tried to visit /signin or /signup
 * Since we have auth, proceed with redirect
 * We only redirect authenticated users to /admin if visiting from /signin or /signup
 * @param router
 * @param redirectUrl
 */
const handleAuth = async (router, redirectUrl) => {

    if (redirectUrl === "/admin") {
        await router.push(redirectUrl)
    }
}

/**
 * If redirect url is /signin or /signup, then user either tried to visit /admin
 * Since we do not have auth, proceed with redirect
 * We only redirect unAuthenticated users to /signin or /signup if visiting from /admin
 * @param router
 * @param redirectUrl
 */
const handleNoAuth = async(router, redirectUrl) => {

    if (redirectUrl === "/signin" || redirectUrl === "/signup") {
        await router.replace(redirectUrl)
    }
}

export default useAuth;
