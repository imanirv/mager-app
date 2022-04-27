import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { callAPI } from "../../helpers/network";


const User = () => {
    const router = useRouter();
    const {idUser} = router.query
    const [id, setId] = useState("");
    const [profile, setProfile] = useState();

    const getUser = async (id) => {
        const response = await callAPI({
            url:`/user/${id}`,
            method: 'get'
        })

        console.log(response)
    }
    
    useEffect(() => {
        if (router.isReady) {
            setId(idUser)    
            getUser(idUser)    
        }
    },[router.isReady])

    return(
        <h1>ini user {id} page</h1>
    )
}

export default User