import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import Swal from 'sweetalert2'
import { getJwt, getUser } from "../../../helpers/auth";
import {useRouter} from "next/router"

const initialState = {
    listKomunitas : [],
    listKomunitasJoined: [],
    detailKomunitas: [],
    postinganKomunitas: [],
    memberKomunitas: [],
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
        setListKomunitasJoined(state, action) {
            Object.assign(state, {
                ...state,
                listKomunitasJoined: action.payload
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
        setMemberKomunitas(state, action) {
            Object.assign(state, {
                ...state,
                memberKomunitas: action.payload
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

const {setListKomunitas,setListKomunitasJoined, setDetailKomunitas, setPostinganKomunitas, setMemberKomunitas, setLoading} = slices.actions

export const useKomunitasDispatcher = () => {
    const {komunitas} = useSelector((state) => state);
    const dispatch = useDispatch();
    const token = getJwt();
    const {push} = useRouter()

    const getListKomunitas = async (keyword = "") => {
        dispatch(setLoading(true))
        const response = await callAPI({
            url:`/komunitas/list?size=20&page=0&nama=${keyword}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch(setListKomunitas(response.data.data.content))
        dispatch(setLoading(false))
    }
    const getListKomunitasJoined = async () => {
        const {id} = getUser()
        try {
            const response = await callAPI({
                url: `komunitas/joined/${id}?size=10&page=0`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.data.content)
            dispatch(setListKomunitasJoined(response.data.data.content))
        } catch (error) {
            
        }
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
    const getMemberKomunitas = async (id) => {
        dispatch(setLoading(true))
        try {
            const response = await callAPI({
                url: `/komunitas/member/${id}?size=10&page=0`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setMemberKomunitas(response.data.data.content))
            // console.log(response.data.data.content)
        } catch (error) {
            console.log(error)
        }
        dispatch(setLoading(false))
    }
    const doCreateKomunitas = async (values) => {
        console.log(values)
        const {id} = getUser()
        const fileUrl = "";

        dispatch(setLoading(true))
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

            const payload = {
                namaKomunitas: values.namaKomunitas,
                kategori: {id:values.kategori.id},
                deskripsi: values.deskripsi,
                banner: fileUrl,
                lokasi: values.lokasi.name,
                acceptance: false
            }
            try {
                const response = callAPI({
                    url:`/komunitas?idUser=${id}`,
                    method: "post",
                    data: payload,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                // if (response) {
                //     window.location.href = "/homepage"
                // }
            } catch (error) {
                console.log(error.response)
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
            // console.log('ini respon >', response)
            window.location.reload()
        } catch (error) {
            
        }
        dispatch(setLoading(false))
    }


    return {
        doJoinKomunitas,
        getListKomunitas,
        getListKomunitasJoined,
        getDetailKomunitas,
        getPostinganKomunitas,
        getMemberKomunitas,
        doCreateKomunitas,
        komunitas
    }

}

export default slices.reducer