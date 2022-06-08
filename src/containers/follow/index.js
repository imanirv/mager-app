import { useState, useEffect } from 'react'
import {useRouter} from "next/router"
import Image from "next/image"
import AuthProvider from "../../providers/auth"
import MainLayout from "../../components/layout"
import { getUser, getJwt } from "../../helpers/auth"
import { useUserDispatcher } from '../../redux/reducers/user'
import { callAPI } from '../../helpers/network'

import { Tab } from '@headlessui/react'
import {Body1, Body2, Header4, Subtitle1, Subtitle2} from "../../components/typography"
import Card from "../../components/card"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import CommunityCard from "../../components/posts/CommunityCard"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const FollowsContainer = ({index}) => {
    const router = useRouter()
    const {idUser} = router.query

    const {user: {detailUser, follower, following},
    getDetailUser, 
    getFollower, 
    getFollowing} = useUserDispatcher()

    useEffect(() => {
        getFollower(idUser)
        getFollowing(idUser)
        getDetailUser(idUser)
    }, [idUser])

    console.log(follower)
    return(
        <AuthProvider>
            <MainLayout>
                    <div className=" px-3 lg:px-40 pt-24">
                        <div className="flex items-start justify-center">
                            <div className=" w-full md:w-8/12 mr-3">
                                <Card>
                                    <div className="flex items-center px-4">
                                        <ArrowLeftIcon className="w-6 h-6 text-white mr-4 cursor-pointer" onClick={() => router.push(`/user/${idUser}`)} />
                                        <div>
                                            <Subtitle1>{detailUser.nama}</Subtitle1> 
                                            <br />
                                            <Subtitle2 disabled>{detailUser.username}</Subtitle2>
                                        </div>
                                    </div>
                                    <Tab.Group defaultIndex={index}>
                                        <Tab.List className="flex space-x-1 rounded-xl bg-transparent">
                                            <Tab
                                            key="follower"
                                            className={({ selected }) =>
                                                classNames(
                                                'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                                selected
                                                    ? ' border-b-4 border-b-blue-400'
                                                    : ' hover:bg-white/[0.12] '
                                                )
                                            }
                                            >
                                            Pengikut
                                            </Tab>
                                            <Tab
                                            key="following"
                                            className={({ selected }) =>
                                                classNames(
                                                'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                                selected
                                                    ? ' border-b-4 border-b-blue-400'
                                                    : ' hover:bg-white/[0.12] '
                                                )
                                            }
                                            >
                                            Mengikuti
                                            </Tab>
                                        </Tab.List>
                                        <Tab.Panels className="mt-2">
                                            <Tab.Panel
                                            key="follower"
                                            className={classNames(
                                                'p-3'
                                            )}
                                            >
                                                {follower.length > 0 ? <>
                                                    {follower.map((user, i)=>(
                                                       <Followers key={i} idFolls={user.userFollower.id} nama={user.userFollower.nama} username={user.userFollower.username} foto={user.userFollower.fotoProfile}/>
                                                    ))}
                                                
                                                </>
                                            :<div className='flex flex-col justify-center items-center mb-10'>
                                            <Image src="/astro-1.png" alt="empty state" width={300} height={300}/>
                                                <Header4>Tidak Diikuti Siapapun</Header4>
                                            </div> }
                                               
                                            </Tab.Panel>
                                            <Tab.Panel
                                            key="following"
                                            className={classNames(
                                                'p-3'
                                            )}
                                            >
                                                {following.length > 0 ?
                                                <>
                                                    {following.map((user, i)=>(
                                                         <Followers key={i} idFolls={user.userFollowing.id} nama={user.userFollowing.nama} username={user.userFollowing.username} foto={user.userFollowing.fotoProfile}/>
                                                    ))}
                                                </>
                                                : <div className='flex flex-col justify-center items-center mb-10'>
                                                <Image src="/astro-1.png" alt="empty state" width={300} height={300}/>
                                                    <Header4>Tidak Mengikuti Siapapun</Header4>
                                                </div>
                                                }
                                               
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                </Card>
                            </div>
                            <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl ">
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

export default FollowsContainer