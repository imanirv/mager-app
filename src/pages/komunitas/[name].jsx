import { useRouter } from "next/router"
import Image from "next/image"
import MainLayout from "../../components/layout"
import AuthProvider from "../../providers/auth"
import {Header1, Header3, Header4} from "../../components/typography"
import Card from "../../components/card"
import PostList from "../../components/elements/PostList"
import CreatePost from "../../components/createPost"


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
        <AuthProvider>
            <MainLayout>
                {/* header group  */}
                <div className="w-full md:px-40">
                    <div className="relative w-full h-96">
                        <Image className="object-cover" src="/images/header/Mobile legends Sampul 1.jpg" alt="header" layout="fill" />
                    </div>
                </div>
                <div className="w-full  bg-darkmode-2 md:px-40 py-4">
                    <div className="flex">
                        <div className="w-60 h-60 mr-4 relative">
                            <Image src="/images/profile/mobile legends 3.jpg" layout="fill" className="object-cover rounded-lg" alt="profile"  />
                        </div>
                        <div className="mt-4">
                            <Header1>{name}</Header1>
                            <div className="mt-2">
                                <Header3>Publik</Header3>
                            </div>
                            <div className="mt-4">
                                <Header3>12345 Anggota</Header3>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <div className="mr-4">
                            <Header4>Post</Header4>
                        </div>
                        <div className="mr-4">
                            <Header4>Deskripsi</Header4>
                        </div>
                        <div className="mr-4">
                            <Header4>Anggota</Header4>
                        </div>
                        <div className="mr-4">
                            <Header4>Foto/Video</Header4>
                        </div>
                    </div>
                </div>
                <div className=" px-3 lg:px-40 mt-3">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                            <CreatePost />
                            <PostList datas={data} />
                        </div>
                        <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl ">
                            <Card>
                                <div className="h-40"></div>
                            </Card>
                        
                        </div>
                    
                    </div>
                </div>
            </MainLayout>
        </AuthProvider>
    )
}

export default Komunitas