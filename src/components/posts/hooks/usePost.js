import { useCallback, useRef, useState } from "react"
import { usePostDispatcher } from "../../../redux/reducers/posts"

const usePost = () => {
    const {posting: {loadMore, hasMore, page}, getUpdatePost} = usePostDispatcher()
    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loadMore) return
        if (!hasMore) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updatePosts(page + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loadMore])
    
    const updatePosts = (i) => {
        getUpdatePost(i)
    }

    return {
        loadMore,
        lastPostRef
    }

} 

export default usePost