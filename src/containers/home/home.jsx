import { useEffect, useState } from 'react'

import CreatePost from './elements/CreatePost'
import PostList from './elements/PostList'
import CommunityCard from './elements/CommunityCard'
import {callAPI} from '../../helpers/network'

const HomeContainer = () =>{
    const [data, setData] = useState([]);


    const getData = async () => {

        try {
            const response = await callAPI({
                url:`/postingan?size=10&page=10`,
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
        <div className='bg-black  min-h-screen'>
        {/* nanti navbar taro sini  */}
        <div className="pt-20 px-3 lg:px-40">
            <div className="flex items-start justify-center">
                <div className=" w-full md:w-8/12 mr-3">
                    <CreatePost />
                    <PostList datas={data} />
                </div>
                <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                    {/* card komunitas taro sini */}
                    <CommunityCard />
                </div>
               
            </div>
        </div>
        </div>
    )
}

export default HomeContainer