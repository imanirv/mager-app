import { useRouter } from "next/router"
import Image from "next/image"
import MainLayout from "../../components/layout"
import AuthProvider from "../../providers/auth"
import {Body1, Header2, Header3, Header4} from "../../components/typography"
import Card from "../../components/card"
import PostList from "../../components/posts/PostList"
import CreatePost from "../../components/createPost"
import { useEffect } from "react"
import {useKomunitasDispatcher} from "../../redux/reducers/komunitas"
import { UserGroupIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import EsportIcon from "../../components/icons/sport-esport"
const Komunitas = () => {
    const router = useRouter()
    const {name} = router.query
    const {komunitas:{detailKomunitas, postinganKomunitas}, getDetailKomunitas, getPostinganKomunitas, doJoinKomunitas} = useKomunitasDispatcher()

    useEffect(()=>{
        getDetailKomunitas(name)
        getPostinganKomunitas(name)
    }, [name])
    console.log(detailKomunitas)
    return (
        <AuthProvider>
            <MainLayout>

                <div className="w-full  bg-darkmode-2 md:px-40 pt-24 pb-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-52 h-52 mr-4 relative bg-red-500 rounded-lg">
                            <Image src={detailKomunitas.banner ? detailKomunitas.banner : "/astro-2.png"} layout="fill" className="object-cover rounded-lg" alt="profile"  />
                        </div>
                        <div className="mt-4">
                            <Header2>{detailKomunitas.namaKomunitas}</Header2>
                            <div className="mt-2 flex items-center justify-center">
                                <UserGroupIcon className="w-6 h-6 mr-3 mb-2 text-darkmode-disabled" /><Header4 disabled>{detailKomunitas.jumlahAnggota} Anggota</Header4>
                            </div>
                        </div>
                        <button onClick={() => doJoinKomunitas(detailKomunitas.id)} className="bg-darkmode-3 mt-4 px-32 py-2 text-white rounded-md">Gabung</button>
                    </div>
                </div>
                <div className=" px-3 lg:px-40 mt-3">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                            <CreatePost komunitas={true} idKomunitas={detailKomunitas.id} />
                            {
                                postinganKomunitas.length > 0 ? (
                                    <>
                                        <PostList datas={postinganKomunitas} />
                                    </>
                                ):(
                                    <div className="text-white">
                                        <p>tidak ada postingan</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl ">
                            <Card>
                                <div className="">
                                    <Header4>Tentang</Header4>
                                    <Body1>{detailKomunitas.deskripsi}</Body1>
                                    {/* <Body1 disabled>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum sed nemo veritatis illo officiis dolorem. Impedit est corrupti repellat dolorum!</Body1> */}
                                    <div className="flex mt-4">
                                        <LocationMarkerIcon className="w-5 h-5 mr-2 text-white" />
                                        <Body1>{detailKomunitas.lokasi}</Body1>
                                    </div>
                                    <div className="flex mt-1">
                                        <EsportIcon className="w-5 h-5 mt-1 mr-2 text-white" />
                                        <Body1>{detailKomunitas.kategori}</Body1>
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

export default Komunitas