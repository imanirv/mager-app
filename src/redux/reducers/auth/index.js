import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
// import { getJwt } from "../../../helpers/auth";
import Swal from 'sweetalert2'


const initialState = {
    userData: [],
    loading: false,
}

const slices = createSlice({
    initialState,
    name:"auth",
    reducers: {
        setUser(state, action) {
            Object.assign(state, {
                ...state,
                userData: action.payload
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


const {setUser, setLoading} = slices.actions

export const useAuthDispatcher = () => {
    const {auth} = useSelector((state) => state);
    const dispatch = useDispatch();

    const doLogin = async (values) => {
        dispatch(setLoading(true))
        const params = new URLSearchParams()
        params.append('username', values.username)
        params.append('password', values.password)
        
        try {
            const sendData = await callAPI({
                url:'/login',
                method:'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: params
            })

            const token = sendData.data.access_token
            const id = sendData.data.idUser
            const getDataUser = await callAPI({
                url:`/user/${id}`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(getDataUser)
            const user = {
                id: getDataUser.data.data.id,
                username: getDataUser.data.data.username,
                name: getDataUser.data.data.nama,
                headerPic: getDataUser.data.data.fotoHeader,
                ProfilePic: getDataUser.data.data.fotoProfile   
            }
            console.log(getDataUser.data.data)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('jwt', token)
            
            dispatch(setUser(user));
            dispatch(setLoading(false))
            const res = await Swal.fire({
                title: 'Berhasil',
                text: 'Anda akan segera dialihkan ke halaman utama',
                icon: 'success',
            });
            
            if (res.isConfirmed) {
                window.location.href = "/homepage"
            }
        } catch (error) {
            console.log(error)
            const res = await Swal.fire({
                title: 'Error',
                text: 'Username atau password anda salah',
                icon: 'error',
            });
            dispatch(setLoading(false))
            
        }
    }

    const doLogout = () => {
        Swal.fire({
            title: 'Yaqueen?',
            text: "Kalo logout nanti nyesel loh!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'iyaa',
            cancelButtonText: 'gajadi'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'goodbye!',
                'Kami akan mengarahkanmu ke halaman kami, sampai jumpa kembali!',
                'success'
              ).then((res) => {
                  if (res.isConfirmed) {
                      dispatch(setUser([]));
                      localStorage.removeItem("jwt");
                      localStorage.removeItem("user");
                      window.location.href = "/"
                  }
              })
            }
          })
    }

    return {
        auth,
        doLogin,
        doLogout
    }

}

export default slices.reducer