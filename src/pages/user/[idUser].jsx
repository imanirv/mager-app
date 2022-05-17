import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { useUserDispatcher } from "../../redux/reducers/user";

import Image from "next/image"
import AuthProvider from "../../providers/auth"
import MainLayout from "../../components/layout"
import {Body1, Header2, Header4} from "../../components/typography"
// import CreatePost from "../../components/createPost"
import PostList from "../../components/posts/PostList"
import Card from "../../components/card"
import { UserGroupIcon, LocationMarkerIcon } from "@heroicons/react/solid"

const User = () => {
    const router = useRouter();
    const {idUser} = router.query

    const {user: {detailUser, postinganUser},getDetailUser, getPostinganUser} = useUserDispatcher()


    useEffect(() => {  
        getDetailUser(idUser) 
        getPostinganUser(idUser)   
    },[idUser])

    console.log(detailUser)
    return(
        <AuthProvider>
            <MainLayout>

                <div className="w-full  bg-darkmode-2 md:px-40 pt-24 pb-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-44  h-44  mr-4 relative">
                            <Image src="/images/profile/livy.png" layout="fill" className="object-cover rounded-lg" alt="profile"  />
                        </div>
                        <div className="mt-6">
                            <Header2>{detailUser.nama}</Header2>
                            <div className="mt-2 flex items-center justify-center">
                                <Header4 disabled>100 Pengikut</Header4>
                                <div className="mx-3"></div>
                                <Header4 disabled>100 Mengikuti</Header4>
                            </div>
                        </div>
                        <button className="bg-darkmode-3 mt-4 px-32 py-2 text-white rounded-md">Mengikuti</button>
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