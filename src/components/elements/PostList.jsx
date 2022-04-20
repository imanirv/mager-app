import PostItem from "./PostItem"
import moment from 'moment';

const PostList = ({datas, limitComment}) =>{

    return (
        <div>
            
            {
                datas.map((item, i) => (
                    <div className="w-full mt-3" key={i}>
                       <PostItem
                        id ={item.id}
                        displayName = {item.createdBy ? item.createdBy.nama : ""}
                        userName =  {item.createdBy ? item.createdBy.username : ""}
                        date={moment(item.created_date).format('MMMM Do')}
                        text={item.postText}
                        likeCount = {item.jumlahLike}
                        commentCount = {item.jumlahKomentar}
                        media = {item.files ? item.files : ""}
                        mediaType = {item.files ? "image" : ""}
                        liveStream = {item.linkLivestream ? item.linkLivestream : ""}
                        limitComment ={limitComment}
                        commentar = {item.komentarBy ? item.komentarBy : []}
                        posterType = {item.postedIn ? "komunitas" : "user"}
                        postType = {item.tipePost ? item.tipePost : ""}
                        communityName = {item.postedIn ? item.postedIn.namaKomunitas : "user"}
                       />
                    </div>
                ))
            }
           
        </div>
    )
}


export default PostList