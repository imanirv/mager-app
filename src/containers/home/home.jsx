import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MainLayout from '../../components/layout'
import CreatePost from '../../components/createPost'
import PostList from "../../components/elements/PostList"
import CommunityCard from "../../components/elements/CommunityCard"

import { usePostDispatcher } from '../../redux/reducers/posts'
import Card from '../../components/card'

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
                                <div className='mb-3'>
                                    <Card>
                                        <div className="flex">
                                            <div className="inline">
                                                <Skeleton circle width={50} height={50} baseColor="#3A3B3C" highlightColor="#242526" />
                                            </div>
                                            <div className="inline w-full ml-2">
                                                <Skeleton height={20} width={200}  baseColor="#3A3B3C" highlightColor="#242526" />
                                                <Skeleton height={20} width={400}  baseColor="#3A3B3C" highlightColor="#242526" />
                                            </div>
                                        </div>
                                        <Skeleton  height={200} baseColor="#3A3B3C" highlightColor="#242526" />
                                    </Card>
                                </div>
                                <div className='mb-3'>
                                    <Card>
                                        <div className="flex">
                                            <div className="inline">
                                                <Skeleton circle width={50} height={50} baseColor="#3A3B3C" highlightColor="#242526" />
                                            </div>
                                            <div className="inline w-full ml-2">
                                                <Skeleton height={20} width={200}  baseColor="#3A3B3C" highlightColor="#242526" />
                                                <Skeleton height={20} width={400}  baseColor="#3A3B3C" highlightColor="#242526" />
                                            </div>
                                        </div>
                                        <Skeleton  height={200} baseColor="#3A3B3C" highlightColor="#242526" />
                                    </Card>
                                </div>
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