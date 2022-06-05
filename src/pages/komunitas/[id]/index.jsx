import Head from "next/head"
import KomunitasContainer from "../../../containers/komunitas"

const KomunitasPage = () => {
    return(
        <>
            <Head>
                <title>Mager - Komunitas</title>
            </Head>
            <KomunitasContainer />
        </>
    )
}

export default KomunitasPage