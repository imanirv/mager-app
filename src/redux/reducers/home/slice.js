import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {callAPI} from "../../../helpers/network"

const initialState = {
    posts:[],
    loading: false
    
}


const slices = createSlice({
    initialState,
    name:"home",
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

export const useHomeDispatcher = () => {
    const {home} = useSelector((state) => state);
    const dispatch = useDispatch();

    const makePost = async (posts) => {

        const response = await callAPI({
            url:`/postingan?page=0&size=100&sort=desc`,
            method: 'get',
        })
        const data = response.data.data
        dispatch(setPosts(data))
    }

    return {
        home,
        makePost
    }
}


export default slices.reducer