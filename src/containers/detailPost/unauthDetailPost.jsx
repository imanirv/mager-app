import {useRouter} from "next/router"
import Image from "next/image"
import MainLayout from "../../components/layout"
import PostItem from "../../components/posts/PostItem"
import AuthProvider from "../../providers/auth"
import { useUnauthDispatcher } from "../../redux/reducers/unauthorized"
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"
import { LoadingPost, LoadingItem } from "../../components/loading"
import { useEffect } from "react"
import Card from "../../components/card"
import { Header3, Body2 } from "../../components/typography"
import { UserGroupIcon } from "@heroicons/react/solid"
const UnauthDetailPostContainer = ({id}) => {
    const {push} = useRouter()
    const {unauth:{detailPost,loading}, getPostDetail} = useUnauthDispatcher()
    const {komunitas:{listKomunitas}, getListKomunitasPopuler} = useKomunitasDispatcher();
    useEffect(() => {
        getPostDetail(id)
        getListKomunitasPopuler()
    },[id])
    return (
        <AuthProvider>
            <MainLayout>
                <div className="pt-20 px-3 lg:px-40">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                        {
                            loading ? (
                                <>
                                    <LoadingPost />
                                    <LoadingItem />
                                </>
                            ):(
                                <PostItem
                                 item={detailPost}
                                 limit={false}
                                />
                            )
                        }
                        </div>
                        <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                            {/* card komunitas taro sini */}
                            {/* <CommunityCard /> */}
                            <Card>
                            <div className="flex flex-col justify-between text-white mb-3">
                                <Header3>Komunitas Terpopuler</Header3>
                                <div className="my-3">
                                    {listKomunitas.map((item, i) => (
                                            <ItemList key={i} id={item.id} name={item.namaKomunitas} src={item.banner ? item.banner : "/astro-2.png"} anggota={item.jumlahAnggota} />
                                        ))}
                                </div>
                            </div>
                        </Card>
                        </div>
                    
                    </div>
                </div>
            </MainLayout>
        </AuthProvider>
    )
}

const ItemList = ({name,id, src, anggota}) => {
    const {push} = useRouter()

    return(
        <div className="flex items-center my-2 p-1 hover:bg-darkmode-hover rounded-md" onClick={() => push(`/komunitas/${id}`)}>
            <div className="w-10 h-10 mr-4 rounded-md relative bg-red-300">
                <Image alt="community" className="rounded-md" layout="fill" src={src}/>
            </div>
            <div className="">
                <p className="font-semibold text-white capitalize">{name}</p>
                <div className="flex">
                    <UserGroupIcon className="w-4 h-4 mr-2 text-darkmode-disabled" />
                    <Body2 disabled>{anggota}</Body2>
                </div>
            </div>
        </div>
    )
}

export default UnauthDetailPostContainer