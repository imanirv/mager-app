import Head from 'next/head'
import HomeContainer from '../containers/home'
import { UnauthorizedHome } from '../containers/home'
import AuthProvider from '../providers/auth/authProvider'
import { getUser } from '../helpers/auth'

export default function Home() {
  const user = getUser()
  return (
    <AuthProvider>
      <Head>
        <title>mager - Homepage</title>
      </Head>
      {user ? 
      <HomeContainer />
      :<UnauthorizedHome />}
    </AuthProvider>
  )
}
