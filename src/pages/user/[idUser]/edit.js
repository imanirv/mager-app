import Head from "next/head";
import EditUserContainer from "../../../containers/editUser";

const EditUserPage = () => {
    return (
        <>
            <Head>
                <title>mager - Edit user</title>
            </Head>
            <EditUserContainer />
        </>
    )
}
export default EditUserPage