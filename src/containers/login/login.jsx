import { useEffect, useState } from "react"
import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { callAPI } from "../../helpers/network"
import { useAuthDispatcher } from "../../redux/reducers/auth/slice"
import { BackgroundLayout } from "../../components/layout"
const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})

const initialValues = {
    username: "",
    password: ""
}

const LoginContainer = () => {
    const { doLogin} = useAuthDispatcher()
    const onSubmit = async (values) => {
      doLogin(values)
    }
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return(
        <BackgroundLayout>
            <div className="w-screen h-screen  flex items-center justify-center">
                <div className="bg-[#242526] p-10 w-[550px] rounded-md m-4 z-10">
                    <div className="text-center">
                        <h1 className="text-3xl text-white font-nunito font-bold">Hi Selamat Datang</h1>
                        <p className="text-darkmode-disabled">Login, dan temukan komunitasmu</p>
                    </div>

                    <div className="mt-9">
                        <form action="" onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                <span className="block mb-2 text-white">Username / email</span>
                                <input className="w-full bg-darkmode-3 text-white p-4 h-14 rounded-md mb-1 outline-primary" type="text" name="username" id="username" autoComplete="off" placeholder="masukan email atau username" onChange={handleChange} onBlur={handleBlur} />
                            </label>
                            {
                                getIn(touched, "username") && getIn(errors, "username") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Username / email tidak boleh kosong
                                    </div>
                                )
                            }
                            <label htmlFor="password" className="">
                                <span className="block mb-2 text-white">Password</span>
                                <input className="w-full bg-darkmode-3 text-white p-4 h-14 rounded-md mb-1 outline-primary" type="password" name="password" id="password" placeholder="Masukkan kata sandi" onChange={handleChange} onBlur={handleBlur} />
                            </label>
                            {
                                getIn(touched, "password") && getIn(errors, "password") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Password tidak boleh kosong
                                    </div>
                                )
                            }
                            <div className="flex justify-between">
                                <label htmlFor="rememberMe">
                                    <input type="checkbox" name="remember me" onChange={handleChange} />
                                    <span className="ml-2 text-darkmode-disabled">Ingat saya</span>
                                </label>

                                <a href="" className="text-primary">Lupa kata sandi?</a>
                            </div>
                            {!errors.username && !errors.password ? (
                                <button type="submit" className="bg-blue-500 p-2 px-10 w-full mt-5 text-white rounded-lg">Masuk</button>
                                ):(
                                    <button className="bg-darkmode-disabled p-2 px-10 w-full mt-5 text-white rounded-lg">Masuk</button>
                            )}
                            <p className="text-white text-center mt-4">Belum Punya akun ? <a href="" className="text-primary">daftar</a></p>
                        </form>
                    </div>

                </div>
            </div>
        </BackgroundLayout>
    )
}
export default LoginContainer