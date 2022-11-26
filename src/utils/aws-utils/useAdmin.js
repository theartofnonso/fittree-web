import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";

// const useAuth = () => {
//
//     const router = useRouter()
//
//     const [auth, setAuth] = useState(false)
//
//     useEffect(() => {
//         Auth.currentAuthenticatedUser()
//             .then(user => {
//                 setAuth()
//                 router.push('/admin')
//             })
//     }, [])
//
//     return auth
// }
//
// export default useAuth;
