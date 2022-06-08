import Image from "next/image"
import moment from 'moment'
import AuthProvider from "../../providers/auth"
import MainLayout from "../../components/layout"
import { useNotificationDispatcher } from "../../redux/reducers/notification"
import CommunityCard from "../../components/posts/CommunityCard"
import EmptyState from "../../components/emptyState"
import { useEffect } from "react"
import Card from "../../components/card"
import { Body1, Caption, Header3, Subtitle2 } from "../../components/typography"


const Item = ({id, nama, username, detail, time}) => {
    return(
        <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
            <div className="w-14 h-14 bg-red-200 rounded-lg">
                    <Image src={'/astro-3.png'} width={40} height={40} layout="responsive" alt="" />
            </div>
            <div className="ml-4">
                <div className="">
                    <Subtitle2>{nama}</Subtitle2>
                    <div className="w-2 h-2 rounded-full bg-white mx-2 inline-block"></div>
                    <Caption>{username}</Caption>
                </div>
                <div className="mt-1">
                    <Body1>{detail}</Body1>
                </div>
            </div>
            </div>
            <Body1>{time}</Body1>
        </div>
    )
}

const NotificationContainer = () => {
    const {notification:{ listNotification } , getListNotification} = useNotificationDispatcher()
    useEffect(() => {
        getListNotification()
    }, [])
    return (
        <AuthProvider>
            <MainLayout active="notification">
            <div className=" px-3 lg:px-40 pt-20">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                       <Card>
                           <Header3>Notifikasi</Header3>
                           <div className="mt-4 p-5">
                            {
                                listNotification.length > 0 ? <>
                                    {listNotification.map((item, i) => (
                                    <Item key={i} id={item.user.id} nama={item.user.nama} username={item.user.username} detail={item.detailNotif}  banner={item.user.banner} time={moment(item.created_date).fromNow()}/>
                                    ))}
                                </> : <EmptyState  text="Tidak ada Notifikasi"/>
                            }
                               
                           </div>
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

export default NotificationContainer