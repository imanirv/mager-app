import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import { getJwt } from "../../../helpers/auth";

const initialState = {
    posts:[],
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
        }
    }
})

const {setPosts} = slices.actions

export const usePostDispatcher = () => {
    const {posting} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();

    const makePost = async (posts) => {

        const response = await callAPI({
            url:`/postingan?page=1&size=15&sort=desc`,
            method: 'get', 
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        })
        const data = response.data.data
        dispatch(setPosts(data))
    }
    return {
        posting,
        makePost
    }
}


export default slices.reducer