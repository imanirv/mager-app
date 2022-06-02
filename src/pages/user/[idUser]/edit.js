import Head from "next/head";
import EditUserContainer from "../../../containers/editUsername";

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