import Head from "next/head"
import LoginContainer from "../containers/login/"

const Login = () => {
    return(
        <>
            <Head>
                <title>mager - login</title>
            </Head>
            <LoginContainer />
        </>
    )
}

export default Login