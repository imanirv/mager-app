import PostItem from "./PostItem"
import moment from 'moment';

const data = [
    {
        displayName : "Ganang Rizkijaya",
        userName : "ganangrz",
        date:"1 Jam",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, natus nemo! Reprehenderit totam rem quis animi autem saepe quibusdam molestiae numquam fugit, delectus tenetur dolor repellendus, quas ut in, quidem omnis asperiores accusantium. Sint, voluptatum. Autem maxime, quidem quibusdam facilis dolorem quod mollitia.",
        likeCount : "123",
        commentCount : "321"
    },
    {
        displayName : "Moch Rafii",
        userName : "mochrafii",
        date:"1 april, pukul 20.13",
        text:"Dicari Teman Mabar Wildrift, minimal rank platinum 4, langsung komen IGN di komen ya ges",
        likeCount : "123",
        commentCount : "321"
    },
    {
        displayName : "Atthala Salsabila",
        userName : "athallasls",
        date:"8 Jam",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        media:"/images/posts/image-001.jpg",
        mediaType: "image",
        likeCount : "123",
        commentCount : "321"
    },
    {
        displayName : "Abdullah Akram",
        userName : "AAkrams",
        date:"1 Jam",
        text:"Jangan lupa like ya gays",
        media:"/videos/test.mp4",
        mediaType:"video",
        likeCount : "123",
        commentCount : "321"
    },
    {
        displayName : "Iman irvansyah",
        userName : "imanirv",
        date:"1 Jam",
        text:"Jangan lupa like ya gays",
        media:"https://youtu.be/ZKXolU_ooco",
        mediaType:"video",
        likeCount : "123",
        commentCount : "321"
    },
]

const PostList = ({datas, limitComment}) =>{
    // console.log(datas)
    return (
        <div>
             {
                data.map((item, i) => (
                    <div className="w-full mb-3" key={i}>
                       <PostItem
                        displayName = {item.displayName}
                        userName = {item.userName}
                        date={item.date}
                        text={item.text}
                        likeCount = {item.likeCount}
                        commentCount = {item.commentCount}
                        media = {item.media ? item.media : ""}
                        mediaType = {item.mediaType ? item.mediaType : ""}
                       />
                    </div>
                ))
            }        
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
                        media = {item.media ? item.media : ""}
                        mediaType = {item.mediaType ? item.mediaType : ""}
                        limitComment ={limitComment}
                        commentar = {item.komentarBy ? item.komentarBy : []}
                        postType = {item.postedIn ? "komunitas" : "user"}
                        communityName = {item.postedIn ? item.postedIn.namaKomunitas : "user"}
                       />
                    </div>
                ))
            }
           
        </div>
    )
}


export default PostList