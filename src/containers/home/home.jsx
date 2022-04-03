

import CreatePost from './elements/CreatePost'
import PostList from './elements/PostList'




const HomeContainer = () =>{
    return(
        <div className='bg-black '>
        {/* nanti navbar taro sini  */}
        <div className="pt-20 px-40">
            <div className="flex items-start justify-center">
                <div className="w-8/12 mr-3">
                    <CreatePost />
                    <PostList />
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