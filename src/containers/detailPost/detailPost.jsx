import MainLayout from "../../components/layout/"
import CommunityCard from "../../components/elements/CommunityCard"
import PostItem from "../../components/elements/PostItem"


const data = { 
    displayName: "unknown", 
    userName: "unknown", 
    date: "unknown", 
    text: "Jangan lupa nonton Mobile Legends Jogja Tournament Cup nanti malam jam 8 ya Aku bakal bantai tim RRQ ! ", 
    media: "",
    mediaType: "",
    likeCount: 0, 
    commentCount: 0
}
const DetailPostContainer = () => {
    return (
        <MainLayout>
             <div className="pt-20 px-3 lg:px-40">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                    <PostItem
                        displayName = {data.displayName}
                        userName = {data.userName}
                        date={data.date}
                        text={data.text}
                        likeCount = {data.likeCount}
                        commentCount = {data.commentCount}
                        media = {data.media ? data.media : ""}
                        mediaType = {data.mediaType ? data.mediaType : ""}
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