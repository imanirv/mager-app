import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import MainLayout from "../../components/layout"
import AuthProvider from "../../providers/auth"
import {Body1, Header2, Header3, Header4} from "../../components/typography"
import Card from "../../components/card"
import PostList from "../../components/posts/PostList"
import CreatePost from "../../components/createPost"
import { useEffect, useState } from "react"
import { getUser } from "../../helpers/auth"
import {useKomunitasDispatcher} from "../../redux/reducers/komunitas"
import { UserGroupIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import EsportIcon from "../../components/icons/sport-esport"
import { LoadingItem, LoadingPost, LoadingProfile } from "../../components/loading"
import EmptyState from "../../components/emptyState"
import Button from "../../components/button"

const KomunitasContainer = () => {
    const router = useRouter()
    const {id} = router.query
    const [follow, setFollow] = useState(false)
    const account = getUser()
    const [myId, setMyId] = useState(0)
    const {komunitas:{detailKomunitas, postinganKomunitas, memberKomunitas, loading}, getDetailKomunitas, getPostinganKomunitas, getMemberKomunitas, doJoinKomunitas} = useKomunitasDispatcher()

    useEffect(()=>{
        getDetailKomunitas(id)
        getPostinganKomunitas(id)
        getMemberKomunitas(id)
        setMyId(
            account.id
        )
    }, [id])

    useEffect(() => {
        const isFollowed =  memberKomunitas.filter(member => member.user.id == account.id)
        if (isFollowed.length >= 1) {
            setFollow(true)
        }
    }, [memberKomunitas])
    return (
        <AuthProvider>
            <MainLayout>

                <div className="w-full  bg-darkmode-2 md:px-40 pt-24 pb-4">
                    <div className="flex flex-col items-center text-center">
                            {!loading ?
                                <div className="w-52 h-52 mr-4 relative bg-red-300 rounded-lg">
                                    <Image src={detailKomunitas.banner ? detailKomunitas.banner : "/astro-2.png"} layout="fill" className="object-cover rounded-lg" alt="profile"  />
                                </div>
                            :(
                                <LoadingProfile />
                            )
                            }
                        <div className="mt-4">
                            {!loading ? (
                                <>
                                    <Header2>{detailKomunitas.namaKomunitas}</Header2>
                                    <div className="mt-2 flex items-center justify-center cursor-pointer" onClick={() => router.push(`/komunitas/${id}/members`)}>
                                        <UserGroupIcon className="w-6 h-6 mr-3 mb-2 text-darkmode-disabled" /><Header4 disabled>{detailKomunitas.jumlahAnggota} Anggota</Header4>
                                    </div>

                                </>
                            ): (
                                <>
                                    <LoadingItem count={2} />
                                </>
                            )}
                        </div>
                        {detailKomunitas.roomMaster && detailKomunitas.roomMaster.id == account.id ? (<Link href={`/komunitas/${id}/edit`} passHref>
                        <a className="mt-3 w-56"><Button secondary caption="Edit Komunitas" /></a></Link>) : <>
                        {follow ?(
                            <button onClick={() => doJoinKomunitas(detailKomunitas.id)} className="bg-darkmode-3 mt-4 px-32 py-2 text-white rounded-md">Bergabung</button>
                            ): (
                                <button onClick={() => doJoinKomunitas(detailKomunitas.id)} className="bg-blue-500 mt-4 px-32 py-2 text-white rounded-md">Gabung</button>
                            )}
                        
                        </>  }
                    </div>
                </div>
                <div className=" px-3 lg:px-40 mt-3">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                            <CreatePost komunitas={true} idKomunitas={detailKomunitas.id} />
                            {!loading ? (
                                <>
                                    {
                                        postinganKomunitas.length > 0 ? (
                                            <>
                                                <PostList datas={postinganKomunitas} />
                                            </>
                                        ):(
                                            <div className="mt-3">
                                                <Card>
                                                    <EmptyState text="tidak ada Post" />
                                                </Card>
                                            </div>
                                        )
                                    }
                                </>
                            ): (
                                <div className="mt-3">
                                    <LoadingPost />
                                    <LoadingPost />
                                    <LoadingPost />
                                    <LoadingPost />
                                </div>
                            ) }
                        </div>
                        <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl ">
                            <Card>
                                <div className="">
                                    {!loading ? (
                                        <>
                                        <Header4>Tentang</Header4>
                                        <Body1>{detailKomunitas.deskripsi}</Body1>
                                        <div className="flex mt-4">
                                            <LocationMarkerIcon className="w-5 h-5 mr-2 text-white" />
                                            <Body1>{detailKomunitas.lokasi}</Body1>
                                        </div>
                                        <div className="flex mt-1">
                                            <EsportIcon className="w-5 h-5 mt-1 mr-2 text-white" />
                                            <Body1>{detailKomunitas.kategori ? detailKomunitas.kategori.namaGame : "" }</Body1>
                                        </div>
                                        </>
                                    ): <LoadingItem count={5} />}
                                </div>
                            </Card>
                        
                        </div>
                    
                    </div>
                </div>
            </MainLayout>
        </AuthProvider>
    )
}

export default KomunitasContainer