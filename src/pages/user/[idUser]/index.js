import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { useUserDispatcher } from "../../../redux/reducers/user";

import Image from "next/image"
import AuthProvider from "../../../providers/auth"
import MainLayout from "../../../components/layout"
import Button from "../../../components/button"
import {Body1, Header2, Header4} from "../../../components/typography"
// import CreatePost from "../../../components/createPost"
import PostList from "../../../components/posts/PostList"
import Card from "../../../components/card"
import { UserGroupIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import { getUser } from "../../../helpers/auth";
const User = () => {
    const router = useRouter();
    const {idUser} = router.query
    const [follow, setFollow] = useState(false)
    const [myId, setMyId] = useState(0)
    const account = getUser()

    const {
        user: {detailUser, postinganUser, follower, following},
        getDetailUser, 
        getPostinganUser,
        getFollower, 
        getFollowing,
        doFollow} = useUserDispatcher()


    useEffect(() => {  
        getDetailUser(idUser) 
        getPostinganUser(idUser) 
        getFollower(idUser)  
        getFollowing(idUser)  
        setMyId(
            account.id
        )
    },[idUser])

    useEffect(() => {
        const isFollowed =  follower.filter(user => user.userFollower.id === account.id)
        // console.log(id)
        if (isFollowed.length >= 1) {
            setFollow(true)
        }
    }, [follower])
    return(
        <AuthProvider>
            <MainLayout>
                <div className="w-full  bg-darkmode-2 md:px-40 pt-24 pb-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-44  h-44  mr-4 relative">
                            <Image src="/images/profile/default-1.png" layout="fill" className="object-cover rounded-lg" alt="profile"  />
                        </div>
                        <div className="mt-6">
                            <Header2>{detailUser.nama}</Header2>
                            <div className="mt-2 flex items-center justify-center">
                                <div className="cursor-pointer" onClick={() => router.push(`/user/${idUser}/followers`)}>
                                    <Header4 disabled>{follower.length} Pengikut</Header4>
                                </div>
                                <div className="mx-3"></div>
                                <div className="cursor-pointer" onClick={() => router.push(`/user/${idUser}/following`)}>
                                    <Header4 disabled>{following.length} Mengikuti</Header4>
                                </div>
                            </div>
                        </div>
                            {
                            myId == idUser ? (
                                <div className="m-5 px-14 w-full max-w-sm" onClick={() => router.push(`/user/${myId}/edit`)}>
                                    <Button caption="Edit Profile" />
                                </div>
                            ): follow ? (
                                <div className="m-5 px-14 w-full max-w-sm" onClick={() => doFollow(idUser)}>
                                        <Button disabled href="#" caption="Mengikuti" />
                                </div>
                            ) : (
                                <div className="m-5 px-14 w-full max-w-sm" onClick={() => doFollow(idUser)}>
                                    <Button href="#" caption="Ikuti" />
                                </div>
                            ) 
                            }   
                    </div>
                </div>
                <div className=" px-3 lg:px-40 mt-3">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                            {
                                postinganUser.length > 0 ? (
                                    <>
                                        <PostList datas={postinganUser} />
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
                                    <Header4>Username</Header4>
                                    <Body1 disabled>{detailUser.username}</Body1>
                                    <div className="mt-2"></div>
                                    <Header4>Bio</Header4>
                                    {/* <Body1 disabled>{detailUser.biodata}</Body1> */}
                                    <Body1 disabled>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum sed nemo veritatis illo officiis dolorem. Impedit est corrupti repellat dolorum!</Body1>
                                    <div className="flex mt-4">
                                        <LocationMarkerIcon className="w-5 h-5 mr-2 text-white" />
                                        <Header4>Jakarta</Header4>
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

export default User