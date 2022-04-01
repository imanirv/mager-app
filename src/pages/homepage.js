import Head from 'next/head'
import Image from 'next/image'
import HomeContainer from '../containers/home'


export default function Home() {
  return (
    <>
      <Head>
        <title>mager - Homepage</title>
      </Head>
      <HomeContainer />
    </>
  )
}
