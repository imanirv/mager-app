import {useRouter} from "next/router"
import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { BackgroundLayout } from "../../components/layout"
import Card from "../../components/card"
import {Header2, Subtitle1} from "../../components/typography"
import {Input} from "../../components/input"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import { useAuthDispatcher } from "../../redux/reducers/auth"
const validationSchema = Yup.object({
    password: Yup.string().min(8, 'Kata sandi tidak boleh kurang dari 8 karakter').max(12, 'Kata sandi tidak boleh lebih dari 12 karakter').matches(/(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E])/, 'Kata sandi harus perpaduan huruf dan angka' ).required('Kata sandi tidak boleh kosong'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama').required('Konfirmasi kata sandi tidak boleh kosong'),
    

})

const initialValues = {
    password:"",
    confirmPassword:""
}

const ResetPassword = () => {
    const {push} = useRouter()
    const {auth:{loading}, doResetPass} = useAuthDispatcher()

    const onSubmit = async (values) => {
       doResetPass(values)
        // console.log(values)
    }
    
    const {handleSubmit, handleChange, handleBlur, errors, touched} = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return(
        <BackgroundLayout>
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-[550px] z-10">
                    <Card>
                        <div className="absolute top-10 left-10" onClick={() => push('/auth/login')}>
                            <ArrowLeftIcon className="w-6 h- text-white"/>
                        </div>
                        <div className="text-center mt-10">
                            <Header2>Buat Kata Sandi Baru</Header2>
                        </div>
                        <div className="m-10">
                            <form onSubmit={handleSubmit}>
                                <Input 
                                    title="Kata Sandi Baru"
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                    getIn(touched, "password") && getIn(errors, "password") && (
                                        <div className="text-xs text-red-500 pb-3" >
                                            {errors.password}
                                        </div>
                                    )
                                }
                                <Input 
                                    title="Konfirmasi Kata Sandi Baru"
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                    getIn(touched, "confirmPassword") && getIn(errors, "confirmPassword") && (
                                        <div className="text-xs text-red-500 pb-3" >
                                            {errors.confirmPassword}
                                        </div>
                                    )
                                }
                                {!errors.password || !errors.confirmPassword ? (
                                    <button type="submit" className="bg-blue-500 p-2 px-10 w-full mt-5 mb-2 text-white rounded-lg"> {!loading ? "Kirim" : "Memuat"}</button>
                                    ):(
                                        <button type="submit" className="bg-darkmode-disabled p-2 px-10 w-full mt-5 mb-2 text-white rounded-lg"> {!loading ? "Kirim" : "Memuat"}</button>
                                    )
                            }
                            </form>
                        </div>
                    </Card>

                </div>
            </div>
        </BackgroundLayout>
    )
}

export default ResetPassword