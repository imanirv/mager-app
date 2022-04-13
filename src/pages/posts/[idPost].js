import Head from 'next/head'
import Image from 'next/image'
import DetailPostContainer from '../../containers/detailPost'
import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { callAPI } from "../../helpers/network"

export default function Home() {
  const router = useRouter();
  const {idPost} = router.query
  const [post, setPost] = useState()
  const [id, setId] = useState()


    const getPost = async(id) => {
        const response = await callAPI({
            url:`postingan/${id}`,
            method:'get'
        })
        const data = response.data.data

        if (response.status == 200) {
            setPost(    
                data
            )
            // console.log(post)
        }     

        
    }

    useEffect(() => {
      if (router.isReady) {
        setId(idPost)
        getPost(idPost)
      }
    },[router.isReady])

  return (
    <>
      <Head>
        <title>mager - Detail Postingan</title>
      </Head>
      <DetailPostContainer data={post} idPost={id} />
    </>
  )
}
