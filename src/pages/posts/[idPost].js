import Head from 'next/head'
import DetailPostContainer from '../../containers/detailPost'
import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { usePostDispatcher } from '../../redux/reducers/posts'


export default function Home() {
  const router = useRouter();
  const {idPost} = router.query
  const {posting:{detailPost, loading},getPostDetail} = usePostDispatcher()
  // const [post, setPost] = useState()
  // const [id, setId] = useState()


    useEffect(() => {
      if (router.isReady) {
        getPostDetail(idPost)
      }
    },[router.isReady])

    return (
      <>
        <Head>
          <title>mager - Detail Postingan</title>
        </Head>
          <DetailPostContainer data={detailPost} isLoading={loading}/> 
      </>
    )
}
