import PostItem from "./PostItem"

const PostList = () =>{
    return (
        <div className="w-full mt-3">
           <PostItem
            displayName = "Ganang Rizkijaya"
            userName = "ganangrz"
            date="1 Jam"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, natus nemo! Reprehenderit totam rem quis animi autem saepe quibusdam molestiae numquam fugit, delectus tenetur dolor repellendus, quas ut in, quidem omnis asperiores accusantium. Sint, voluptatum. Autem maxime, quidem quibusdam facilis dolorem quod mollitia."
            likeCount = "123"
            commentCount = "321"

           />
           <PostItem
            displayName = "Moch Rafii"
            userName = "mochrafii"
            date="1 april, pukul 20.13"
            text="Dicari Teman Mabar Wildrift, minimal rank platinum 4, langsung komen IGN di komen ya ges"
            likeCount = "20"
            commentCount = "12"

           />
           <PostItem
            displayName = "Atthala Salsabila"
            userName = "athallasls"
            date="8 Jam"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            media="/images/posts/image-001.jpg"
            mediaType="image"
            likeCount = "123"
            commentCount = "321"

           />
           <PostItem
            displayName = "Abdullah Akram"
            userName = "AAkrams"
            date="8 Jam"
            text="Jangan lupa like ya gays"
            media="/videos/test.mp4"
            mediaType="videos"
            likeCount = "123"
            commentCount = "321"

           />
           <PostItem
            displayName = "Abdullah Akram"
            userName = "AAkrams"
            date="8 Jam"
            text="Nonton dulu"
            media="https://youtu.be/nRHbm2Qffk8"
            mediaType="videos"
            likeCount = "123"
            commentCount = "321"

           />
        </div>
    )
}


export default PostList