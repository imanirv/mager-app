import Link from "next/link"
import {useRouter} from "next/router"
import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { useAuthDispatcher } from "../../redux/reducers/auth"
import { BackgroundLayout } from "../../components/layout"
import {Input} from "../../components/input"
import MaleIcon from "../../components/icons/male"
import FemaleIcon from "../../components/icons/female"


const validationSchema = Yup.object({
    nama: Yup.string().required('Nama tidak boleh kosong').min(3, 'Minimal 3 karakter'),
    email: Yup.string().email('Email harus valid').required('Email tidak boleh kosong'),
    username: Yup.string().required('Username tidak boleh kosong').min(3, 'Minimal 3 karakter').max(15, 'Maximal 15 karakter'),
    password: Yup.string().min(8, 'Kata sandi tidak boleh kurang dari 8 karakter').max(12, 'Kata sandi tidak boleh lebih dari 12 karakter').matches(/(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E])/, 'Kata sandi harus perpaduan huruf dan angka' ).required('Kata sandi tidak boleh kosong'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Kata sandi tidak sama').required('Konfirmasi kata sandi tidak boleh kosong'),
    gender: Yup.string().required()
})

const initialValues = {
    nama:"",
    email:"",
    username: "",
    password: "",
    confirmPassword:"",
    gender:""

}


const RegisterContainer = () => {
    // const router = useRouter();
    const {auth: {loading}, doRegister} = useAuthDispatcher()
    const onSubmit = async (values) => {
        // console.log(values)
        doRegister(values)
        // router.push('/auth/favorite-games')
    }
    

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
    return (
        <BackgroundLayout>
            <div className="w-screen h-screen overflow-auto flex items-start justify-center" id="register-card">
                <div className="bg-[#242526] p-10 w-[550px] rounded-md m-4 z-10">
                    <div className="text-center">
                        <h1 className="text-3xl text-white font-nunito font-bold">Buat Akun</h1>
                    </div>
                    <div className="mt-9">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <Input
                                        title="Nama"
                                        name="nama"
                                        id="nama"
                                        type="text"
                                        placeholder="Masukkan nama"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.nama}
                                        touched={touched.nama}
                                    />
                                    {
                                        getIn(touched, "nama") && getIn(errors, "nama") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.nama}
                                            </div>
                                        )
                                    }
                            </div>
                            <div className="mb-2">
                                <Input
                                        title="Email"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Masukkan email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                    {
                                        getIn(touched, "email") && getIn(errors, "email") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.email}
                                            </div>
                                        )
                                    }
                            </div>
                            <div className="mb-2">
                                <Input
                                        title="Username"
                                        name="username"
                                        id="username"
                                        type="text"
                                        placeholder="Masukkan username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.username}
                                        touched={touched.username}
                                    />
                                    {
                                        getIn(touched, "username") && getIn(errors, "username") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.username}
                                            </div>
                                        )
                                    }
                            </div>
                            <div className="mb-2">
                                <Input
                                        title="Kata Sandi"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Masukkan Kata Sandi"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.password}
                                        touched={touched.password}
                                    />
                                    {
                                        getIn(touched, "password") && getIn(errors, "password") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.password}
                                            </div>
                                        )
                                    }
                            </div>
                            <div className="mb-2">
                                <Input
                                        title="Konfirmasi Kata Sandi"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Masukkan Kata Sandi"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                    />
                                    {
                                        getIn(touched, "confirmPassword") && getIn(errors, "confirmPassword") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                               {errors.confirmPassword}
                                            </div>
                                        )
                                    }
                            </div>
                            <div className="mb-2">
                                <span className="text-white block mb-2">Jenis Kelamin</span>
                                <label htmlFor="gender" >
                                    <div className="w-1/2 inline-flex pr-1" >
                                        <div className={`w-full bg-darkmode-3 h-16 rounded-lg flex justify-center items-center ${values.gender == 'L' ? 'border border-[#4D77FF]': ''}`}>
                                            <MaleIcon color={values.gender == 'L' ? '#4D77FF': 'rgba(250, 250, 250, 0.64)'} />
                                            <span className="text-darkmode-4 cursor-pointer">
                                                Laki - Laki
                                            </span>
                                        </div>
                                    </div>
                                    <input type="radio" name="gender" id="gender" value="L" className="hidden" onChange={handleChange}/>
                                </label>
                                <label htmlFor="genderwoman">
                                    <div className="w-1/2 inline-flex pl-1" > 
                                        <div className={`w-full bg-darkmode-3 h-16 rounded-lg flex justify-center items-center ${values.gender == 'P' ? 'border border-[#F900BF]': ''}`}>
                                            <FemaleIcon color={values.gender == 'P' ? '#F900BF': 'rgba(250, 250, 250, 0.64)'} />
                                            <span className="text-darkmode-4">
                                                Perempuan
                                            </span>
                                        </div>
                                    </div>    
                                    <input type="radio" name="gender" id="genderwoman" value="P" className="hidden" onChange={handleChange}/>
                                </label>
                            </div>
                            {
                                !errors.name && !errors.username && !errors.email && !errors.password && !errors.confirmPassword && !errors.gender ? (
                                    <button type="submit" className="bg-blue-500 p-2 px-10 w-full mt-5 mb-2 text-white rounded-lg">{loading ? 'Mengirim data': 'Daftar'}</button>
                                    ):(
                                        <button type="submit" className="bg-darkmode-disabled p-2 px-10 w-full mt-5 mb-2 text-white rounded-lg">Daftar</button>
                                    )
                            }
                            <p className="text-white text-center">Sudah punya akun? <Link href="/auth/login"><a className="text-primary">Masuk</a></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </BackgroundLayout>
    )
}

export default RegisterContainer