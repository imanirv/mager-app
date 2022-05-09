import { useEffect } from 'react'
import MainLayout from '../../components/layout'
import CreatePost from '../../components/createPost'
import PostList from "../../components/elements/PostList"
import CommunityCard from "../../components/elements/CommunityCard"
import { LoadingPost } from '../../components/loading'
import { usePostDispatcher } from '../../redux/reducers/posts'

const HomeContainer = () =>{
 
    const {posting: {posts, loading}, getPost} = usePostDispatcher()

    useEffect(() => {
        try {
            getPost()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return(
       <MainLayout>
            <div className=" px-3 lg:px-40 pt-24">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <div className="mb-3">
                            <CreatePost />
                        </div>
                        {loading ? (
                            <>
                               <LoadingPost />
                               <LoadingPost />
                               <LoadingPost />
                               <LoadingPost />
                            </>

                        ): (
                            <PostList datas={posts} limitComment={true} />
                        )}
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