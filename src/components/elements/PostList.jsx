import PostItem from "./PostItem"

const PostList = ({datas}) =>{
    return (
        <div>
            {
                datas.map((item, i) =>{
                    return(
                    <div className="w-full mt-3" key={i}>
                       <PostItem item={item} />
                    </div>
                )})
            }
           
        </div>
    )
}


export default PostList