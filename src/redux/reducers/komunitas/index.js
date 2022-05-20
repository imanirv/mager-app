import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import Swal from 'sweetalert2'
import { getJwt, getUser } from "../../../helpers/auth";
import {useRouter} from "next/router"
const initialState = {
    listKomunitas : [],
    detailKomunitas: [],
    postinganKomunitas: [],
    loading : false,
}

const slices = createSlice({
    initialState,
    name:"komunitas",
    reducers: {
        setListKomunitas(state, action) {
            Object.assign(state, {
                ...state,
                listKomunitas: action.payload
            })
        },
        setDetailKomunitas(state, action) {
            Object.assign(state, {
                ...state,
                detailKomunitas: action.payload
            })
        },
        setPostinganKomunitas(state, action) {
            Object.assign(state, {
                ...state,
                postinganKomunitas: action.payload
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

const {setListKomunitas, setDetailKomunitas, setPostinganKomunitas, setLoading} = slices.actions

export const useKomunitasDispatcher = () => {
    const {komunitas} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();
    const {push} = useRouter()
    const getListKomunitas = async () => {
        dispatch(setLoading(true))
        const response = await callAPI({
            url:'/komunitas/list?size=5&page=0',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch(setListKomunitas(response.data.data.content))
        dispatch(setLoading(false))
    }

    const getDetailKomunitas = async (id) => {
        dispatch(setLoading(true))

        try {
            const response = await callAPI({
                url: `komunitas/${id}`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setDetailKomunitas(response.data.data))
        } catch (error) {
            console.log('ini error >', error)
        }
        dispatch(setLoading(false))
        
    }
    const getPostinganKomunitas = async (id) => {
        dispatch(setLoading(true))
        try {
            const response = await callAPI({
                url:`/postingan?size=10&page=0&tipeData=komunitas&idKomunitas=${id}`,
                method:'get',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setPostinganKomunitas(response.data.data))
        } catch (error) {
            
        }
    }
    const doCreateKomunitas = async (values) => {
        dispatch(setLoading(true))
            console.log(values)
            try {
                const response = callAPI({
                    url:"",
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                
            }
        dispatch(setLoading(false))
    }
    const doJoinKomunitas = async (idKomunitas) => {
        const {id} = getUser()
        dispatch(setLoading(true))
        try {
            const response = await callAPI({
                url:`/komunitas/join/${id}/${idKomunitas}`,
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            push(`/komunitas/${idKomunitas}`)
            console.log('ini respon >', response)
        } catch (error) {
            
        }
        dispatch(setLoading(false))
    }


    return {
        doJoinKomunitas,
        getListKomunitas,
        getDetailKomunitas,
        getPostinganKomunitas,
        komunitas
    }

}

export default slices.reducer