import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";


const initialState = {
    listPosts : [],
    detailPost: [],
    loading : false,
}


const slices = createSlice({
        initialState,
        name: "unauth",
        reducers: {
            setListPosts(state, action) {
                Object.assign(state, {
                    ...state,
                    listPosts: action.payload
                })
            },
            setDetailPost(state, action){
                Object.assign(state, {
                    ...state,
                    detailPost: action.payload
                })
            },
            setLoading(state, action) {
                Object.assign(state, {
                    ...state,
                    loading: action.payload
                })
            }
        }
})

const {setListPosts, setDetailPost, setLoading} = slices.actions

export const useUnauthDispatcher = () => {
    const {unauth} = useSelector((state) => state);
    const dispatch = useDispatch();

    const getListPosts = async () => {
        dispatch(setLoading(true))
        try {
            const response = await callAPI({
                url: '/postingan?size=31&page=0&sort=desc',
                method: 'get'
            })
            const data = response.data.data
            console.log(data)
            dispatch(setListPosts(data))
        dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
        }
    }
    const getPostDetail = async (id) => {
        dispatch(setLoading(true))
        try {
            const response = await callAPI({
              url:`postingan/${id}`,
              method:'get'
            
          })
          dispatch(setDetailPost(response.data.data))
          dispatch(setLoading(false))
          return response.data.data
        } catch (error) {
          // const res = await Swal.fire({
          //     title: 'hmmm',
          //     text: 'Terjadi kesalahan, silahkan coba lagi',
          //     icon: 'error',
          // });
        }
    }

    return{
        unauth,
        getPostDetail,
        getListPosts
    }

}

export default slices.reducer