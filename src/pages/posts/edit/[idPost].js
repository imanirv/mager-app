import Head from "next/head"
import {useRouter} from "next/router"
import { useEffect, useState } from "react"

import EditPostContainer from "../../../containers/editPost/"
import { callAPI } from "../../../helpers/network"

const EditPost = () => {
    const router = useRouter();
    const {idPost} = router.query
    const [data, setData] = useState()

    const getData = async (id) => {
        const response = await callAPI({
            url: `postingan/${id}`,
            method: 'get',
        })
        setData(response.data.data)
        // console.log(response);
    }

    useEffect(() => {
        if (router.isReady) {
            getData(idPost)
        }
      },[router.isReady])

    return (
        <>
            <Head>
                <title>mager - Edit Post</title>
            </Head>
            <EditPostContainer data={data}/>
        </>
    )
}

export default EditPost