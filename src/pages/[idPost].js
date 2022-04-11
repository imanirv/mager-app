import Head from 'next/head'
import Image from 'next/image'
import DetailPostContainer from '../containers/detailPost/'


export default function Home() {
  return (
    <>
      <Head>
        <title>mager - Detail Postingan</title>
      </Head>
      <DetailPostContainer />
    </>
  )
}
