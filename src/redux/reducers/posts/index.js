import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import { getJwt } from "../../../helpers/auth";
import { getUser } from "../../../helpers/auth";
import Swal from 'sweetalert2'
const initialState = {
    posts:[],
    page: 0,
    hasMore: true,
    detailPost:{},
    loading: false,
    loadMore: false,
    loadingPost:false,
    loadingComment:false,
    loadingDetailPost: false
}


const slices = createSlice({
    initialState,
    name:"posting",
    reducers: {
        setPosts(state, action){
            Object.assign(state, {
                ...state,
                posts: action.payload
            })
        },
        setPage(state, action){
            Object.assign(state, {
                ...state,
                page: action.payload
            })
        },
        setHasMore(state, action){
            Object.assign(state, {
                ...state,
                hasMore: action.payload
            })
        },
        setDetailPost(state, action){
            Object.assign(state, {
                ...state,
                detailPost: action.payload
            })
        },
        setLoading(state, action){
            Object.assign(state, {
                ...state,
                loading: action.payload
            })
        },
        setLoadMore(state, action){
            Object.assign(state, {
                ...state,
                loadMore: action.payload
            })
        },
        setLoadingPost(state, action){
            Object.assign(state, {
                ...state,
                loadingPost: action.payload
            })
        },
        setLoadingComment(state, action){
            Object.assign(state, {
                ...state,
                loadingComment: action.payload
            })
        },
        setLoadingDetailPost(state, action){
            Object.assign(state, {
                ...state,
                loadingDetailPost: action.payload
            })
        },
    }
})

const {setPosts, setPage, setHasMore, setLoadMore, setDetailPost, setLoading, setLoadingPost, setLoadingComment, setLoadingDetailPost} = slices.actions

export const usePostDispatcher = () => {
    const {posting} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();
    const getPost = async (page = 0) => {
      dispatch(setLoading(true))
      const response = await callAPI({
        url:`/postingan?page=${page}&size=5&sort=desc`,
        method: 'get', 
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      })
      const data = response.data.data
      console.log(response.data.totalPages)
      if (page == response.data.totalPages) {
        dispatch(setLoading(false))
        dispatch(setHasMore(false))
        return
      }
      const payload = [...posting.posts, ...data]
      dispatch(setPage(response.data.currentPage))
      dispatch(setPosts(payload))
      dispatch(setLoading(false))
    }
    const getUpdatePost = async (page = 0) => {
      dispatch(setLoadMore(true))
      const response = await callAPI({
        url:`/postingan?page=${page}&size=5&sort=desc`,
        method: 'get', 
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      })
      const data = response.data.data
      console.log(response.data.totalPages)
      if (page == response.data.totalPages) {
        dispatch(setLoading(false))
        dispatch(setHasMore(false))
        return
      }
      const payload = [...posting.posts, ...data]
      dispatch(setPage(response.data.currentPage))
      dispatch(setPosts(payload))
      dispatch(setLoadMore(false))
    }
    const getPostDetail = async (id) => {
        dispatch(setLoadingDetailPost(true))
        const response = await callAPI({
          url:`postingan/${id}`,
          method:'get',
          headers: {
            Authorization: `Bearer ${token}`
          }
         
      })
      dispatch(setDetailPost(response.data.data))
      dispatch(setLoadingDetailPost(false))
      return response.data.data
    }
    const doComment = async (idPost, values) => {
      dispatch(setLoadingComment(true))
        const {id} = getUser()
        const payload = values
        const response = await callAPI({
          url:`/komentar?idUser=${id}&idPostingan=${idPost}`,
          method:'post',
          data: payload,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.status == 200) {
          window.location.reload()
        }
      dispatch(setLoadingComment(false))
    }
    const doLike = async (idPost) => {
        const {id} = getUser()
        try {
            const response = await callAPI({
              url: `/like?idPostingan=${idPost}&idUser=${id}`,
              method: 'post',
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            if (response) {
                window.location.reload()
            }else{
              console.log('gabisa')
            }
          } catch (error) {
            console.log(error)
            
          }
    }
    const doPost = async (values) => {
      dispatch(setLoadingPost(true))
      try {
        
        const {id} = getUser()
        const tipePost = "";
        const fileUrl = "";
       
        if (values.files) {
            const formData = new FormData();
            formData.append("file", values.files)

            console.log(formData);
            
            const upload = await callAPI({
                url:"/uploadFiles",
                method:"post",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            fileUrl = upload.data.data;
        }

        if (values.liveStream) {
            tipePost ="livestream"
        }else{
            tipePost="foto"
        }
        const payload = {
            postText: values.postText,
            visibility: false,
            files: fileUrl,
            linkLivestream: values.liveStream ? values.liveStream : "",
            tipePost: tipePost
        };
        console.log(payload)
        const response = await callAPI({
            url:`/postingan?idUser=${id}`,
            method: 'POST',
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          
          
        dispatch(setLoading(false))
        const {data} = response;
        if (data.status === "200") {
            window.location.href = "/homepage?success"
        }else{
            window.location.href = "/homepage?error"
        }
       
    } catch (error) {
        console.log(error)
    }
    dispatch(setLoading(false))
    }
    const putPost = async (values, idPost) => {
      const {id} = getUser()
      const fileUrl = "";
      if (values.files) {
          const formData = new FormData();
          formData.append("file", values.files)
  
          console.log(formData);
          
          const upload = await callAPI({
              url:"/uploadFiles",
              method:"post",
              data: formData,
          })
  
          
          fileUrl = upload.data.data;
      }
  
      const payload = {
        linkLivestream: values.livestream,
        postText: values.postText,
        files: fileUrl,
        visibility: false,
      }
      // console.log('payload >', payload)
      
      const response = await callAPI({
        url:`/postingan/${idPost}?idUser=${id}`,
        method:"put",
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response)
      if (response.status == 200) {
        window.location.reload()
        // console.log('updated')
      }
    }
    const delPost = async (id) => {
      const res = await Swal.fire({
        title: 'Yakin?',
        text: 'Post yang dihapus tidak akan balik lagi lho',
        icon: 'warning',
    });
    
    if (res.isConfirmed) {
      const response = await callAPI({
        url: `/postingan/${id}`,
        method:'delete',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      window.location.reload()      
       
    }

    }

    return {
        posting,
        getPost,
        getUpdatePost,
        getPostDetail,
        doComment,
        doLike,
        doPost,
        putPost,
        delPost
    }
}


export default slices.reducer