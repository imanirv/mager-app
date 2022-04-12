import { useRouter } from "next/router"
import MainLayout from "../../components/layout"
import {Header1} from "../../components/typography"
import Card from "../../components/card"
import PostList from "../../components/elements/PostList"


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

const Komunitas = () => {

    const router = useRouter()
    const {name} = router.query
    return (
        <MainLayout>
            {/* header group  */}
            <div className="w-full h-60 bg-red-300"></div>
            <div className="w-full  bg-darkmode-3 md:px-40 py-4 flex">
                <div className="w-60 h-60 bg-red-600 mr-4 border-4 rounded-md"></div>
                <Header1>{name}</Header1>
            </div>
            <div className="pt-24 px-3 lg:px-40 ">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <PostList datas={data} />
                    </div>
                    <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                        
                        <Card>
                            <div className="h-40"></div>
                        </Card>
                       
                    </div>
                
                </div>
            </div>
        </MainLayout>
    )
}

export default Komunitas