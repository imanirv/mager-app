import { useFormik, getIn } from "formik"
import * as Yup from 'yup'
import { BackgroundLayout } from "../../components/layout"


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
                        </form>
                    </div>
                </div>
            </div>
        </BackgroundLayout>
    )
}

export default RegisterContainer