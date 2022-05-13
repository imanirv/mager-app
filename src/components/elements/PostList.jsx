import PostItem from "./PostItem"
import { useCallback, useRef, useState } from "react"
import { usePostDispatcher } from "../../redux/reducers/posts"


const PostList = ({datas}) =>{
    const {posting: {loading, hasMore, page}, getPost} = usePostDispatcher()

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (!hasMore) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updatePosts(page + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])

    const updatePosts = (i) => {
        getPost(i)
    }
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