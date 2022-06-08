import {useRouter} from "next/router"
import { useState } from "react"
import { getUser, getJwt } from "../../helpers/auth"
import Image from "next/image"
import { useEffect } from "react"
import { Tab } from '@headlessui/react'
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"
import { useUserDispatcher } from "../../redux/reducers/user"
import CommunityCard from "../../components/posts/CommunityCard"
import MainLayout from "../../components/layout"
import AuthProvider from "../../providers/auth"
import Card from "../../components/card/card"
import { Header4, Body1, Body2 } from "../../components/typography"
import {CommunityItem} from "../../components/items"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchContainer = () => {
    const router = useRouter()
    const {keyword} = router.query
    const {komunitas: {listKomunitas}, getListKomunitas} = useKomunitasDispatcher()
    const {user:{listUser}, searchUser} = useUserDispatcher()
    useEffect(() => {
        getListKomunitas(keyword)
        searchUser(keyword)
    }, [keyword])
    console.log(listUser)
    return (
        <AuthProvider>
            <MainLayout>
            <div className=" px-3 lg:px-40 pt-20">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                    <Card>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-transparent">
                                <Tab
                                key="Orang"
                                className={({ selected }) =>
                                    classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                    selected
                                        ? ' border-b-4 border-b-blue-400'
                                        : ' hover:bg-white/[0.12] '
                                    )
                                }
                                >
                                Orang
                                </Tab>
                                <Tab
                                key="Komunitas"
                                className={({ selected }) =>
                                    classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                    selected
                                        ? ' border-b-4 border-b-blue-400'
                                        : ' hover:bg-white/[0.12] '
                                    )
                                }
                                >
                                Komunitas
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel
                                key="follower"
                                className={classNames(
                                    'p-3'
                                )}
                                >
                                    {listUser.length > 0 ? <>
                                        {listUser.map((item, i)=>(
                                           <Followers key={i} idFolls={item.id} nama={item.nama} username={item.username} foto={item.fotoProfile}/>
                                        ))}
                                    
                                    </>
                                    :<div className='flex flex-col justify-center items-center my-10'>
                                        <div className="mb-10">
                                            <Image src="/astro-6.png" alt="empty state" width={250} height={250}/>
                                        </div>
                                        <Header4>{keyword} tidak ditemukan</Header4>
                                    </div> }
                                    
                                    
                                </Tab.Panel>
                                <Tab.Panel
                                key="following"
                                className={classNames(
                                    'p-3'
                                )}
                                >
                                    {listKomunitas.length > 0 ? <>
                                        {listKomunitas.map((item, i)=>(
                                            <CommunityItem key={i} id={item.id} nama={item.namaKomunitas} anggota={item.jumlahAnggota} lokasi={item.lokasi} banner={item.banner}   />
                                        ))}
                                    
                                    </>
                                :<div className='flex flex-col justify-center items-center my-10'>
                                    <div className="mb-10">
                                        <Image src="/astro-6.png" alt="empty state" width={250} height={250}/>
                                    </div>
                                    <Header4>{keyword} tidak ditemukan</Header4>
                                </div> }
                                    
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                    </div>
                    <div className="hidden md:block w-4/12   rounded-2xl">
                        
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
            </MainLayout>
        </AuthProvider>
    )
}

const Followers = ({idFolls, nama, username, foto}) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const {doFollow} = useUserDispatcher()
    const {id} = getUser()
    const token = getJwt()

    const GetMyFollowing = async () => {
        try {
            const myFollowing = await callAPI({
                url: `/user/${id}/following?size=100&page=0`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 

            const data = myFollowing.data.data.content
            const checkStatus = data.filter((user) => user.userFollowing.id == idFolls)
            if (checkStatus.length > 0) {setIsFollowed(true)}
        } catch (error) {
            console.log(error)
        }
    }

    
    GetMyFollowing()


    return (
        <div  className='flex items-center justify-between mb-4 rounded-lg hover:border hover:border-darkmode-3 p-3'>
            <div className='flex items-center'>
                <div className='w-10 h-10 rounded-md relative mr-4'>
                    <Image src={foto ? foto :"/images/profile/default-2.png"} width={10} height={10} layout="responsive" alt="" className='object-cover rounded-lg' />
                </div>
                <div>
                    <Body1>{nama}</Body1>
                    <Body2 disabled>{username}</Body2>
                </div>
            </div>

            <button className={`text-white  px-5 py-2 rounded-lg ${isFollowed ? 'bg-darkmode-3' : 'bg-blue-500'}`} onClick={() => doFollow(idFolls)} >
            {!isFollowed ? 'ikuti' : 'Mengikuti'}   
            </button>
            
        </div>
    )
}
export default SearchContainer