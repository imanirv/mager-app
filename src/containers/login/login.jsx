import { useFormik } from "formik"
import * as Yup from 'yup'


// const validationSchema = Yup.object({
//     username:
// })
const LoginContainer = () => {
    return(
        <div className="w-screen h-screen bg-black flex items-center justify-center">
            <div className="bg-slate-400 p-5 w-96 rounded-md">
                <h1 className="text-3xl font-nunito font-bold">Login</h1>

                <div className="mt-5">
                    <form action="">
                        <label htmlFor="username">
                            <span className="block mb-2">Username / email</span>
                            <input className="w-full bg-slate-300 p-1 rounded-md mb-4" type="text" name="username" id="username" />
                        </label>
                        <label htmlFor="password" className="">
                            <span className="block mb-2">Password</span>
                            <input className="w-full bg-slate-300 p-1 rounded-md mb-4" type="password" name="username" id="username" />
                        </label>
                        <button className="bg-blue-500 p-1 px-10 mt-5 text-white rounded-full">submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default LoginContainer