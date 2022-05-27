import { useRouter } from "next/router"
import Image from "next/image"
import Style from "../../styles/stars.module.css"
const LandingContainer = () => {
    const {push} = useRouter()
    return(
        // navbar 
        <div className="bg-darkmode-1 h-screen">
            <div className="fixed bg-transparent w-full h-14 flex items-center justify-between px-36">
                <div className="w-10 h-10">
                    <Image src="/images/Logo Mager-01.png" width={40} height={40} fill="responsive" alt="logo" />
                </div>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={() => push('/auth/login')}>Masuk</button>
            </div>
            <div className="h-10 z-0 pt-24 relative">
                <div id={Style.stars}></div>
                <div id={Style.stars2}></div>
                <div id={Style.star3}></div>
            </div>
            <div className="h-[500px] flex justify-between items-center px-36">
                <div className="">
                    <p className="text-xl font-semibold text-white mb-1">Ayo Gabung Bersama Ribuan </p>
                    <h1 className="text-6xl font-bold text-white mb-10">Komunitas Gamers di Indonesia</h1>
                    <div className="flex items-center">
                        <button><Image src="/google-play-badge.png" width={150} height={60} alt="" /></button>
                        <button onClick={() => push('/homepage')} className="border border-white text-white rounded-md  bg-darkmode-2 px-5 py-2">Buka Mager di Browser</button>
                    </div>
                </div>
                <div className="">
                    <Image src="/astro-3.png" width={400} height={400}  />
                </div>
            </div>
            {/* <div className="bg-darkmode-1 z-10 relative">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Komunitas terpopuler</h1>
                </div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
            </div> */}
        </div>

    )
}

export default LandingContainer