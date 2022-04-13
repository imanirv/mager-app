

import MainLayout from "../../components/layout/"
import CommunityCard from "../../components/elements/CommunityCard"
import PostItem from "../../components/elements/PostItem"
import moment from 'moment';


// const data = { 
//     displayName: "unknown", 
//     userName: "unknown", 
//     date: "unknown", 
//     text: "Jangan lupa nonton Mobile Legends Jogja Tournament Cup nanti malam jam 8 ya Aku bakal bantai tim RRQ ! ", 
//     media: "",
//     mediaType: "",
//     likeCount: 0, 
//     commentCount: 0
// }
const DetailPostContainer = ({idPost = 0, data={} }) => {
    
    return (
        <MainLayout>
             <div className="pt-20 px-3 lg:px-40">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                    <PostItem
                        id ={idPost}
                        displayName = {data.createdBy ? data.createdBy.nama : ""}
                        userName =  {data.createdBy ? data.createdBy.username : ""}
                        date={moment(data.created_date).format('MMMM Do')}
                        text={data.postText}
                        likeCount = {data.jumlahLike}
                        commentCount = {data.jumlahKomentar}
                        commentar = {data.komentarBy ? data.komentarBy : []}
                        media = {data.media ? data.media : ""}
                        mediaType = {data.mediaType ? data.mediaType : ""}
                        postType = {data.postedIn ? "komunitas" : "user"}
                        communityName = {data.postedIn ? data.postedIn.namaKomunitas : "user"}
                       />
                    </div>
                    <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                        {/* card komunitas taro sini */}
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
        </MainLayout>
    )
}

export default DetailPostContainer