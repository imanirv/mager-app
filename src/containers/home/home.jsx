import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import CreatePost from './elements/CreatePost'
import PostList from "../../components/elements/PostList"
import CommunityCard from "../../components/elements/CommunityCard"
// import {callAPI} from '../../helpers/network'
import { usePostDispatcher } from '../../redux/reducers/posts/slice'

const HomeContainer = () =>{
 
    const {posting: {posts}, makePost} = usePostDispatcher()
    
    useEffect(() => {
        try {
            makePost()
        } catch (error) {
            console.log(error)
        }
    }, [])

    // console.log(posts)
    return(
       <MainLayout>
            <div className=" px-3 lg:px-40 pt-24">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <div className="mb-3">
                            <CreatePost />
                        </div>
                        <PostList datas={posts} limitComment={true} />
                    </div>
                    <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                        {/* card komunitas taro sini */}
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
       </MainLayout>
    )
}

export default HomeContainer