// import Link from 'next/link'
import {useRouter} from "next/router"

import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { useAuthDispatcher } from "../../redux/reducers/auth"

import { BackgroundLayout } from "../../components/layout"
import {Input} from "../../components/input"
import Button from '../../components/button'
import LinkItem from "../../components/link"
import {Body1, Header2, Subtitle1} from "../../components/typography"

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
                        <Header2>Hi Selamat Datang</Header2>
                        <Subtitle1 disabled>Login, dan temukan komunitasmu</Subtitle1>
                    </div>
                    <div className="mt-9">
                        <Body1 type="danger" align="center">{errMessage}</Body1>
                        <form action="" onSubmit={handleSubmit} className="mt-3">
                            <Input
                                title="Username"
                                name="username"
                                id="username"
                                type="text"
                                placeholder="Masukkan username"
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
                            <div className="py-3">
                                <LinkItem href="/auth/forgot-password" caption="Lupa kata sandi?" />
                            </div>
                            {!errors.username && !errors.password ? (
                                <Button type="submit" caption={!loading ? "Masuk" : "Memuat"} />
                                ):(
                                <Button type="button" caption="Masuk" disabled />
                            )}
                            <p className="text-white text-center mt-4">Belum Punya akun? <LinkItem href="/auth/register" caption=" Daftar" /></p>
                            
                        </form>
                    </div>

                </div>
            </div>
        </BackgroundLayout>
    )
}
export default LoginContainer