import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import Swal from 'sweetalert2'


const initialState = {
    userData: [],
    loading: false,
    errMessage: ""
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
        },
        setErrMessage(state, action) {
            Object.assign(state, {
                ...state,
                errMessage: action.payload
            })
        }
    }
})


const {setUser, setLoading, setErrMessage} = slices.actions

export const useAuthDispatcher = () => {
    const {auth} = useSelector((state) => state);
    const dispatch = useDispatch();

    const doLogin = async (values) => {
        dispatch(setLoading(true))

        const params = new URLSearchParams()
        params.append('username', values.username)
        params.append('password', values.password)
        
        try {
            const {data: login} = await callAPI({
                url:'/login',
                method:'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: params
            })

            const {data:userData} =  await callAPI({
                url:`/user/${login.idUser}`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${login.access_token}`
                }
            })
           

            const user = {
                id: userData.data.id,
                username: userData.data.username,
                name: userData.data.nama,
                headerPic: userData.data.fotoHeader,
                ProfilePic: userData.data.fotoProfile   
            }
            
            // send to localStorage 
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('jwt', login.access_token)
            
            // dispatch data 
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
            console.log(error.response)
            const res = await Swal.fire({
                title: 'Error',
                text: 'Username atau password anda salah',
                icon: 'error',
            });
            dispatch(setErrMessage(error.response.data.message))
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

    const doRegister = async (values) => {
        dispatch(setLoading(true))
        const payload = {
            nama: values.nama,
            username: values.username,
            email: values.email,
            password:values.password,
            biodata: ''
        }

        try {
            const {data: register} = await callAPI({
                url:'/user',
                method:'post',
                data: payload
            })

            console.log(register)
            const res = await Swal.fire({
                title: 'Berhasil',
                icon: 'success',
            });
            
            if (res.isConfirmed) {
                window.location.href = "/auth/login"
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error.response.message)   
        }
        



    }

    return {
        auth,
        doLogin,
        doLogout,
        doRegister
    }

}

export default slices.reducer