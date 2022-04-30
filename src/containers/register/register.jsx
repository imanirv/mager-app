import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { BackgroundLayout } from "../../components/layout"
import Input from "../../components/input"

const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})

const initialValues = {
    username: "",
    password: ""
}


const RegisterContainer = () => {

    const onSubmit = () => {
        alert('hello ges')
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

    return (
        <BackgroundLayout>
            <div className="w-screen h-screen  flex items-center justify-center">
                <div className="bg-[#242526] p-10 w-[550px] rounded-md m-4 z-10">
                    <div className="text-center">
                        <h1 className="text-3xl text-white font-nunito font-bold">Buat Akun</h1>
                    </div>
                    <div className="mt-9">
                        <form action="" onSubmit={handleSubmit}>
                        <Input
                                title="Nama"
                                name="nama"
                                id="nama"
                                type="text"
                                placeholder="Masukkan nama"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                getIn(touched, "nama") && getIn(errors, "nama") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Nama tidak boleh kosong
                                    </div>
                                )
                            }
                        <Input
                                title="Email"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Masukkan email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                getIn(touched, "email") && getIn(errors, "email") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        email tidak boleh kosong
                                    </div>
                                )
                            }
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
                                title="Kata Sandi"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Masukkan Kata Sandi"
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
                        <Input
                                title="Konfirmasi Kata Sandi"
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                placeholder="Masukkan Kata Sandi"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                getIn(touched, "confirmPassword") && getIn(errors, "confirmPassword") && (
                                    <div className="text-xs text-red-500 pb-3" >
                                        Konfirmasi Password tidak boleh kosong
                                    </div>
                                )
                            }
                            <label htmlFor="gender" className="h-5 w-5 bg-red-200 p-2">
                                <input type="radio" name="gender" id="gender" value="l"/>
                                man
                            </label>
                            <label htmlFor="genderwoman">
                                <input type="radio" name="gender" id="genderwoman" value="P"/>
                                woman
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </BackgroundLayout>
    )
}

export default RegisterContainer