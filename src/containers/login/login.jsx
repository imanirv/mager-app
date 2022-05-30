import Link from 'next/link'

import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { useAuthDispatcher } from "../../redux/reducers/auth"
import { BackgroundLayout } from "../../components/layout"
import {Input} from "../../components/input/"
import {useRouter} from "next/router"

const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})

const initialValues = {
    username: "",
    password: ""
}

const LoginContainer = () => {
    const {push} = useRouter()
    const {auth: {loading, errMessage}, doLogin} = useAuthDispatcher()
    const onSubmit = async (values) => {
      doLogin(values)
    }
    const {
        handleChange,
        handleBlur,
        handleSubmit,
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
                        <p className="mb-2 text-center text-red-500 text-nunito">{errMessage}</p>
                        <form action="" onSubmit={handleSubmit}>
                            <Input
                                title="Username"
                                name="username"
                                id="username"
                                type="text"
                                placeholder="Masukkan email atau username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                getIn(touched, "username") && getIn(errors, "username") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Username tidak boleh kosong
                                    </div>
                                )
                            }
                             <Input
                                title="Password"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Masukkan kata sandi"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                getIn(touched, "password") && getIn(errors, "password") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Password tidak boleh kosong
                                    </div>
                                )
                            }
                            <div className="flex justify-between">
                                {/* <label htmlFor="rememberMe">
                                    <input type="checkbox" name="remember me" onChange={handleChange} />
                                    <span className="ml-2 text-darkmode-disabled">Ingat saya</span>
                                </label> */}
                                <Link href="/auth/forgot-password">
                                    <a className="text-primary">Lupa kata sandi?</a>
                                </Link>
                            </div>
                            {!errors.username && !errors.password ? (
                                <button type="submit" className="bg-blue-500 p-2 px-10 w-full mt-5 text-white rounded-lg">
                                    {!loading ? "Masuk" : "Memuat"}
                                </button>
                                ):(
                                    <button className="bg-darkmode-disabled p-2 px-10 w-full mt-5 text-white rounded-lg">Masuk</button>
                            )}
                            <p className="text-white text-center mt-4">Belum Punya akun ? <span onClick={() => push('/auth/register')} className="text-primary">daftar</span></p>
                        </form>
                    </div>

                </div>
            </div>
        </BackgroundLayout>
    )
}
export default LoginContainer