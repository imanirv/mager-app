import Head from "next/head";
import UserContainer from "../../../containers/user";

const UserPage = () => {
    return(
        <>
            <Head>
                <title>Mager - User</title>
            </Head>
            <UserContainer />
        </>
    )
}

export default UserPage