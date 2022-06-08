import { useEffect } from 'react'
import MainLayout from '../../components/layout'
import CreatePost from '../../components/createPost'
import PostList from "../../components/posts/PostList"
import CommunityCard from "../../components/posts/CommunityCard"
import { LoadingPost } from '../../components/loading'
import { usePostDispatcher } from '../../redux/reducers/posts'


const HomeContainer = () =>{
    const {posting: {posts, loading}, getPost} = usePostDispatcher()

    useEffect(() => {
        getPost()
    }, [])

    return(
       <MainLayout active="home">
            <div className=" px-3 lg:px-40 pt-24">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <div className="mb-3">
                            <CreatePost />
                        </div>
                        {loading ? (
                           <LoadingScreen />
                        ): (
                            <PostList datas={posts} limitComment={true} />
                        )}
                    </div>
                    <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
       </MainLayout>
    )
}

const LoadingScreen = () => {
    return(
        <>
        <LoadingPost />
        <LoadingPost />
        <LoadingPost />
        <LoadingPost />
     </>
    )
}

export default HomeContainer