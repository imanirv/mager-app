import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import CreatePost from './elements/CreatePost'
// import PostList from './elements/PostList'
// import CommunityCard from './elements/CommunityCard'
import PostList from "../../components/elements/PostList"
import CommunityCard from "../../components/elements/CommunityCard"
import {callAPI} from '../../helpers/network'

const HomeContainer = () =>{
    const [data, setData] = useState([]);


    const getData = async () => {

        try {
            const response = await callAPI({
                url:`/postingan?page=0&size=100`,
                method: 'get',
            })
            setData(
                response.data.data
            );
        } catch (error) {
            console.log(error);
            
        }
    }
    
    useEffect(() => {
        getData();
    }, [])

    return(
       <MainLayout>
            <div className="pt-4 px-3 lg:px-40">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <div className="mb-3">
                            <CreatePost />
                        </div>
                        <PostList datas={data} />
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