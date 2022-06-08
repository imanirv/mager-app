import { useEffect, useState } from "react";
import {getJwt} from "../../helpers/auth";

const AuthProvider = ({children}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() =>{
        const jwt = getJwt();
        // if(!jwt) {
        //     window.location.href = '/auth/login';
        // }
        setMounted(true)
    }, [])

    if(mounted) {
       return children
    }

    return <></>

}

export default AuthProvider