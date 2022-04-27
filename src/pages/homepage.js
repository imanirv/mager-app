import Head from 'next/head'
import Image from 'next/image'
import HomeContainer from '../containers/home'
import AuthProvider from '../providers/auth/authProvider'

export default function Home() {
  return (
    <AuthProvider>
      <Head>
        <title>mager - Homepage</title>
      </Head>
      <HomeContainer />
    </AuthProvider>
  )
}
