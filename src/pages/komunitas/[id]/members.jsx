import { useState, useEffect } from 'react'
import {useRouter} from "next/router"
import Image from "next/image"
import AuthProvider from "../../../providers/auth"
import MainLayout from "../../../components/layout"
import { getUser, getJwt } from "../../../helpers/auth"
import { useUserDispatcher } from '../../../redux/reducers/user'
import { callAPI } from '../../../helpers/network'

import CommunityCard from "../../../components/posts/CommunityCard"
import {Body1, Body2, Header3, Header4, Subtitle1, Subtitle2} from "../../../components/typography"
import Card from '../../../components/card/card'
import { ArrowLeftIcon } from "@heroicons/react/solid"

import { useKomunitasDispatcher } from '../../../redux/reducers/komunitas'
import Button from '../../../components/button'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const MemberKomunitasPage = ({index}) => {
    const router = useRouter()
    const {id} = router.query

    const {user: {detailUser, follower, following},
    getDetailUser, 
    getFollower, 
    getFollowing} = useUserDispatcher()
    const {komunitas: {memberKomunitas, detailKomunitas}, getMemberKomunitas, getDetailKomunitas}  = useKomunitasDispatcher()

    useEffect(() => {
        getFollower(id)
        getFollowing(id)
        getDetailUser(id)
        getMemberKomunitas(id)
        getDetailKomunitas(id)
    }, [id])


    
    // console.log(memberKomunitas)
    // console.log(detailKomunitas)

    return(
        <AuthProvider>
            <MainLayout>
                    <div className=" px-3 lg:px-40 pt-24">
                        <div className="flex items-start justify-center">
                            <div className=" w-full md:w-8/12 mr-3">
                                <Card>
                                    <div className="flex items-center px-4">
                                        <ArrowLeftIcon className="w-6 h-6 text-white mr-4 cursor-pointer" onClick={() => router.push(`/komunitas/${id}`)} />
                                        <div>
                                            <Header3>{detailKomunitas.namaKomunitas}</Header3> 
                                        </div>
                                    </div>
                                    <div className="my-3 text-center">
                                        <Subtitle1>Anggota</Subtitle1>
                                    </div>
                                    <hr className='my-3' />
                                    {memberKomunitas.length > 0 ?
                                        <>
                                            {memberKomunitas.map((member, i)=>(
                                                    <Followers key={i} idKomunitas={member.komunitas.id} idFolls={member.user.id} nama={member.user.nama} username={member.user.username} foto={member.user.fotoProfile} rm={member.komunitas.roomMaster.id }/>
                                            ))}
                                        </>
                                        : <div className='flex flex-col justify-center items-center mb-10'>
                                        <Image src="/astro-1.png" alt="empty state" width={300} height={300}/>
                                            <Header4>Tidak ada yang join komunitas</Header4>
                                        </div>
                                    }
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


const Followers = ({idKomunitas, idFolls, nama, username, foto, rm}) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const {doFollow} = useUserDispatcher()
    const {doKick} = useKomunitasDispatcher()
    const {id} = getUser()
    const token = getJwt()

    const GetMyFollowing = async () => {
        try {
            const myFollowing = await callAPI({
                url: `/user/${id}/following?size=10&page=0`,
                method:'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 

            const data = myFollowing.data.data.content
            
            const checkStatus = data.filter((user) => user.userFollowing.id === idFolls)
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
                    <Image src={foto? foto : "/images/profile/default-2.png"} width={10} height={10} layout="responsive" alt="" className='object-cover rounded-lg' />
                </div>
                <div>
                    <Body1>{nama}</Body1>
                    <Body2 disabled>{username}</Body2>
                </div>
            </div>
            <div className="flex justify-end">
                {
                    idFolls == id ? (<p className='text-darkmode-disabled'>Hey, its me</p>) : (
                        <>
                            <button className={`text-white  px-5 py-2 rounded-lg ${isFollowed ? 'bg-darkmode-3' : 'bg-blue-500'}`} onClick={() => doFollow(idFolls)} >
                            {!isFollowed ? 'ikuti' : 'Mengikuti'}   
                            </button>
                            {
                                rm == id ? <div className="ml-3"><button className='border border-blue-500 text-blue-500 rounded-lg px-5 py-2' onClick={() => doKick(idFolls,idKomunitas)}>Keluarkan</button></div> :""
                            }
                        </>
                    )
                }
               
            </div>
            
        </div>
    )
}

export default MemberKomunitasPage