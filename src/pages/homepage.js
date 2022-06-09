import Head from 'next/head'
import HomeContainer from '../containers/home'
import { UnauthorizedHome } from '../containers/home'
import AuthProvider from '../providers/auth/authProvider'
import { getUser } from '../helpers/auth'

export default function Home() {
  const user = getUser()
  if(user){
    return (
      <AuthProvider>
        <Head>
          <title>mager - Homepage</title>
        </Head>
        <HomeContainer />
      </AuthProvider>
    )
    
  }else{
    return (
      <AuthProvider>
        <Head>
          <title>mager - Homepage</title>
        </Head>
        <UnauthorizedHome />
      </AuthProvider>
    )

  }
}
