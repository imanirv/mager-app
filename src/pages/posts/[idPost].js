import Head from 'next/head'
import DetailPostContainer from '../../containers/detailPost'
import UnauthDetailPostContainer from '../../containers/detailPost/unauthDetailPost'
import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { usePostDispatcher } from '../../redux/reducers/posts'
import { getUser } from '../../helpers/auth'
import { useUnauthDispatcher } from '../../redux/reducers/unauthorized'


export default function Home() {
  const router = useRouter();
  const bio = getUser();
  const {idPost} = router.query
  const {posting:{detailPost, loadingDetailPost},getPostDetail} = usePostDispatcher()




    useEffect(() => {
      getPostDetail(idPost)
    },[idPost])

    return (
      <>
        <Head>
          <title>mager - Detail Postingan</title>
        </Head>
        {bio ? 
          <DetailPostContainer data={detailPost} isLoading={loadingDetailPost}/> : <UnauthDetailPostContainer id={idPost}/>
        }
      </>
    )
}
