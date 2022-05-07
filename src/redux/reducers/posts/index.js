import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import { getJwt } from "../../../helpers/auth";
import { getUser } from "../../../helpers/auth";

const initialState = {
    posts:[],
    detailPost:{},
    loading: false
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
    }
})

const {setPosts, setDetailPost, setLoading} = slices.actions

export const usePostDispatcher = () => {
    const {posting} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();
    const getPost = async (posts) => {
      
      const response = await callAPI({
        url:`/postingan?page=0&size=5&sort=desc`,
        method: 'get', 
        headers: {
          Authorization: `Bearer ${token}`
        }
        
        })
        const data = response.data.data
        dispatch(setPosts(data))
      }
    const getPostDetail = async (id) => {
        dispatch(setLoading(true))
        const response = await callAPI({
          url:`postingan/${id}`,
          method:'get',
          headers: {
            Authorization: `Bearer ${token}`
          }
         
      })
      dispatch(setDetailPost(response.data.data))
      dispatch(setLoading(false))
      return response.data.data
    }
    const doComment = async (idPost, values) => {
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
          
        const {data} = response;
        if (data.status === "200") {
            window.location.href = "/homepage?success"
        }else{
            window.location.href = "/homepage?error"
        }
       
    } catch (error) {
        console.log(error)
    }
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

    return {
        posting,
        getPost,
        getPostDetail,
        doComment,
        doLike,
        doPost,
        putPost
    }
}


export default slices.reducer