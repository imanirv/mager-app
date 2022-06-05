import {useRouter} from "next/router"
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import Swal from 'sweetalert2'
import { getJwt, getUser } from "../../../helpers/auth";
const initialState = {
    listUser : [],
    detailUser: [],
    postinganUser: [],
    follower: [],
    following: [],
    loading : false,
    loadingEdit: false
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
        setFollower(state, action) {
            Object.assign(state, {
                ...state,
                follower: action.payload
            })
        },
        setFollowing(state, action) {
            Object.assign(state, {
                ...state,
                following: action.payload
            })
        },
        setLoading(state, action) {
            Object.assign(state, {
                ...state,
                loading: action.payload
            })
        },
        setLoadingEdit(state, action) {
            Object.assign(state, {
                ...state,
                loadingEdit: action.payload
            })
        }
    }
})

const {setListUser, setDetailUser, setPostinganUser, setFollower, setFollowing, setLoading, setLoadingEdit} = slices.actions

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
                url:`/postingan?size=10&page=0&idUser=${id}&tipeData=user&sort=desc`,
                method:'get',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setPostinganUser(response.data.data))
        } catch (error) {
            
        }
    }
    const getFollower = async (id) => {
        try {
            const response = await callAPI({
                url: `/user/${id}/follower?size=10&page=0`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setFollower(response.data.data.content))
            // console.log(response.data.content)
        } catch (error) {
            
        }
    }
    const getFollowing = async (id) => {
        try {
            const response = await callAPI({
                url: `/user/${id}/following?size=10&page=0`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setFollowing(response.data.data.content))
            // console.log(response.data.content)
        } catch (error) {
            
        }
    }
    const doFollow = async (idFollow) => {
        const {id} = getUser()
        // const {push} = useRouter()
        try {
            const response = await callAPI({
                url:`/user/${id}/follow/${idFollow}`,
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async (values, id) => {
        let fileUrl = "";
        
        try {
            dispatch(setLoadingEdit(true))
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
            }else if(values.fotoProfile){
                fileUrl = values.fotoProfile
            }

            const payload = {
                nama : values.nama,
                username: values.username,
                biodata: values.biodata,
                // lokasi: values.lokasi,
                fotoProfile: fileUrl ? fileUrl : ""
            }
            // console.log(payload)
            const response = await callAPI({
                url:`/user/${id}`,
                method: "put",
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const user = {
                id,
                name : values.nama,
                username: values.username,
                biodata: values.biodata,
                // lokasi: values.lokasi,
                fotoProfile: fileUrl ? fileUrl : ""
            }

            localStorage.setItem('user', JSON.stringify(user))

            dispatch(setLoadingEdit(false))
            window.location.href = `/user/${id}`
        } catch (error) {
            
        }
    }


    return {
        getListUser,
        getDetailUser,
        getPostinganUser,
        getFollower,
        getFollowing,
        doFollow,
        updateUser,
        user
    }

}

export default slices.reducer