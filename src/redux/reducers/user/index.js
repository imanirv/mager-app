import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import Swal from 'sweetalert2'
import { getJwt } from "../../../helpers/auth";

const initialState = {
    listUser : [],
    detailUser: [],
    postinganUser: [],
    loading : false,
}

const slices = createSlice({
    initialState,
    name:"user",
    reducers: {
        setListUser(state, action) {
            Object.assign(state, {
                ...state,
                listUser: action.payload
            })
        },
        setDetailUser(state, action) {
            Object.assign(state, {
                ...state,
                detailUser: action.payload
            })
        },
        setPostinganUser(state, action) {
            Object.assign(state, {
                ...state,
                postinganUser: action.payload
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

const {setListUser, setDetailUser, setPostinganUser, setLoading} = slices.actions

export const useUserDispatcher = () => {
    const {user} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();

    const getListUser = async () => {
        dispatch(setLoading(true))
        const response = await callAPI({
            url:'/user/list?size=5&page=0',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch(setListUser(response.data.data.content))
        dispatch(setLoading(false))
    }

    const getDetailUser = async (id) => {
        dispatch(setLoading(true))

        try {
            const response = await callAPI({
                url: `user/${id}`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setDetailUser(response.data.data))
        } catch (error) {
            console.log('ini error >', error)
        }
        dispatch(setLoading(false))
        
    }
    const getPostinganUser = async (id) => {
        dispatch(setLoading(true))

        try {
            const response = await callAPI({
                url:`/postingan?size=10&page=0&idUser=${id}&tipeData=following`,
                method:'get',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setPostinganUser(response.data.data))
        } catch (error) {
            
        }
    }


    return {
        getListUser,
        getDetailUser,
        getPostinganUser,
        user
    }

}

export default slices.reducer