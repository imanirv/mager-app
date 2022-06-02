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
    email: Yup.string().email('Email harus valid').required('Email tidak boleh kosong')

})

const initialValues = {
    email:""
}

const ForgotPassword = () => {
    const {push} = useRouter()
    const {auth:{loading}, doForgetPass} = useAuthDispatcher()

    const onSubmit = async (values) => {
       doForgetPass(values)
    }
    
    const {handleSubmit, handleChange, handleBlur, errors, touched} = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return(
        <BackgroundLayout>
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-[550px] z-10 p-5">
                    <Card>
                        <div className="absolute top-10 left-10" onClick={() => push('/auth/login')}>
                            <ArrowLeftIcon className="w-6 h- text-white"/>
                        </div>
                        <div className="text-center mt-20 lg:mt-10">
                            <Header2>Lupa Kata Sandi</Header2>
                            <Subtitle1 disabled >Masukan email untuk mendapatkan link verifikasi</Subtitle1>
                        </div>
                        <div className="m-10">
                            <form onSubmit={handleSubmit}>
                                <Input 
                                    title="Email"
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {
                                        getIn(touched, "email") && getIn(errors, "email") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.email}
                                            </div>
                                        )
                                    }
                                {!errors.email ? (
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

export default ForgotPassword