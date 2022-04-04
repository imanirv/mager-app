import { useEffect, useState } from 'react'

import CreatePost from './elements/CreatePost'
import PostList from './elements/PostList'
import {callAPI} from '../../helpers/network'

const HomeContainer = () =>{
    const [data, setData] = useState([]);


    const getData = async () => {
        const response = await callAPI({
            url:`/postingan`,
            method: 'get',
        })
        
        setData(
            response.data.data
        )
    }
    
    useEffect(() => {
        getData();
    }, [])

    return(
        <div className='bg-black  min-h-screen'>
        {/* nanti navbar taro sini  */}
        <div className="pt-20 px-40">
            <div className="flex items-start justify-center">
                <div className="w-8/12 mr-3">
                    <CreatePost />
                    <PostList datas={data} />
                </div>
                <div className="w-4/12 h-40 bg-gray-500 rounded-2xl">
                    {/* card komunitas taro sini */}
                </div>
               
            </div>
        </div>
        </div>
    )
}

export default HomeContainer