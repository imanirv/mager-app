import Head from 'next/head'
import FavoriteGamesContainer from '../../../containers/favoriteGames'

const RegisterFavPage = () => {
    return (
        <>
            <Head>
                <title>mager - game kesukaan</title>
            </Head>
            <FavoriteGamesContainer/>
        </>
    )
}

export default RegisterFavPage