import PostItem from "./PostItem"
import usePost from "./hooks/usePost"



const PostList = ({datas}) =>{
    
    const {loadMore, lastPostRef} = usePost()

   
    return (
        <div>
            {
                datas.map((item, i) =>{
                    if (datas.length === i+1) {
                        return(
                            <div className="w-full my-3" key={i} ref={lastPostRef}>
                               <PostItem item={item} />
                            </div>
                        )    
                    }else{
                        return(
                            <div className="w-full my-3" key={i} >
                               <PostItem item={item} />
                            </div>
                        )
                    }
                    })
            }
        </div>
    )
}


export default PostList