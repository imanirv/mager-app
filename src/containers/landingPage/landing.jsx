import { useRouter } from "next/router"
import Image from "next/image"
import Style from "../../styles/stars.module.css"
const LandingContainer = () => {
    const {push} = useRouter()
    return(
        // navbar 
        <div className={`${Style.screens} h-screen overflow-auto scrollbar-hide`}>
            <div className="= bg-transparent w-full h-14 flex items-center justify-between px-10 lg:px-36 z-50 relative">
                <div className="h-10">
                    <Image src="/images/Logo Mager-01.png" width={100} height={40} fill="responsive" alt="logo" />
                </div>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={() => push('/auth/login')}>Masuk</button>
            </div>
            <div className="fixed z-0">
                <div id={Style.stars}></div>
                <div id={Style.stars2}></div>
                <div id={Style.star3}></div>
           
            </div>
            <div className="h-[500] flex flex-col lg:flex-row justify-center lg:justify-between items-center pt-20 px-10 lg:px-36">
                <div className="text-center lg:text-left max-w-[700px]">
                    <p className="text-xl font-semibold text-white mb-1">Ayo Gabung Bersama Ribuan </p>
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-10">Komunitas Gamers di Indonesia</h1>
                    <div className="hidden lg:flex items-center justify-center lg:justify-start">
                        <button className="relative h-12 w-44"><Image src="/google-play-badge.png" alt="" layout="fill" className="object-cover rounded-md"/></button>
                        <button onClick={() => push('/homepage')} className="border border-white text-white rounded-md h-12 ml-3  bg-darkmode-2 px-5 ">Buka Mager di Browser</button>
                    </div>
                </div>
                <div className="">
                    <Image src="/astro-3.png" width={400} height={400}  />
                </div>
                <div className="flex flex-col items-center lg:hidden relative z-10 mb-20">
                    <button className="block"><Image src="/google-play-badge.png" width={150} height={60} alt="" /></button>
                    <button onClick={() => push('/homepage')} className=" block border border-white text-white rounded-md  bg-darkmode-2 px-5 py-2">Buka Mager di Browser</button>
                </div>
            </div>
            <div className="bg-darkmode-1 z-10 relative py-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Komunitas terpopuler</h1>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-between lg:px-36 mt-14">
                    <div className="bg-darkmode-2 w-[100px] lg:w-[200px] m-3">
                        <div className="w-full">
                            <Image src="/images/games/ml.png" width={200} height={200} layout="responsive" alt="ml" />
                        </div>
                        <div className="py-3 lg:py-10">
                            <p className="text-white font-semibold text-center px-3">Mobile Legends Indonesia</p>
                        </div>
                    </div>
                    <div className="bg-darkmode-2 w-[100px] lg:w-[200px] m-3">
                        <div className="w-full">
                            <Image src="/images/games/aov.png" width={200} height={200} layout="responsive" alt="ml" />
                        </div>
                        <div className="py-3 lg:py-10">
                            <p className="text-white font-semibold text-center px-3">AOV Indonesia</p>
                        </div>
                    </div>
                    <div className="bg-darkmode-2 w-[100px] lg:w-[200px] m-3">
                        <div className="w-full">
                            <Image src="/images/games/ff.png" width={200} height={200} layout="responsive" alt="ml" />
                        </div>
                        <div className="py-3 lg:py-10">
                            <p className="text-white font-semibold text-center px-3">Free Fire Indonesia</p>
                        </div>
                    </div>
                    <div className="bg-darkmode-2 w-[100px] lg:w-[200px] m-3">
                        <div className="w-full">
                            <Image src="/images/games/dota.png" width={200} height={200} layout="responsive" alt="ml" />
                        </div>
                        <div className="py-3 lg:py-10">
                            <p className="text-white font-semibold text-center px-3">Dota2 Indonesia</p>
                        </div>
                    </div>
                    <div className="bg-darkmode-2 w-[100px] lg:w-[200px] m-3">
                        <div className="w-full">
                            <Image src="/images/games/cr.png" width={200} height={200} layout="responsive" alt="ml" />
                        </div>
                        <div className="py-3 lg:py-10">
                            <p className="text-white font-semibold text-center px-3">Clash Royale Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[700px] lg:h-[500px] bg-darkmode-4 w-full z-10 relative flex flex-col lg:flex-row items-center justify-center lg:justify-between px-10 lg:px-36 py-10">
                <div className="w-60 h-60 lg:w-80 lg:h-80">
                    <Image src="/astro-2.png" width={400} height={400} alt="" />
                </div>
                <div className="max-w-[450px] text-center mb-10 lg:mb-0 lg:text-left">
                    <h3 className="text-3xl font-bold mb-5">Temukan teman mabar kamu disini</h3>
                    <p>Temukan teman baru berdasarkan game yang kamu mainkan. Ada ratusan komunitas gamers dari berbagai kota di Indonesia</p>
                </div>
            </div>
            <div className="h-[700px] lg:h-[500px] bg-darkmode-1 w-full z-10 relative flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between px:14 lg:px-36">
                <div className="max-w-[450px] text-center mb-10 lg:mb-0 lg:text-left">
                    <h3 className="text-3xl font-bold mb-5 text-white">Bagikan pengalaman, tips & trick game dengan gamers lainnya</h3>
                    <p className="text-white">Kembangkan skillmu bersama ribuan gamers indonesia lainya</p>
                </div>
                <div className="w-60 h-60 lg:w-80 lg:h-80">
                    <Image src="/astro-4.png" width={400} height={400} alt="" />
                </div>
            </div>
            <div className="h-[700px] lg:h-[500px] bg-darkmode-4 w-full z-10 relative flex flex-col lg:flex-row items-center justify-center lg:justify-between px:14 lg:px-36">
                <div className="w-60 h-60 lg:w-80 lg:h-80">
                    <Image src="/astro-5.png" width={400} height={400} alt="" />
                </div>
                <div className="max-w-[450px] text-center mb-10 lg:mb-0 lg:text-left">
                    <h3 className="text-3xl font-bold mb-5 ">Bagikan siaran langsung bersama member komunitas</h3>
                    <p className="">Di Mager kamu dapat membagikan siaran langsung youtube dengan gamers lainnya.</p>
                </div>
            </div>
           
            <div className="h-[600px] bg-darkmode-1 w-full z-10 relative flex flex-col items-center justify-center px-10 lg:px-36">
                <div className="max-w-[450px]">
                    <h3 className="text-3xl font-bold mb-14 text-white text-center">Siap Gabung Sekarang ? </h3>
                </div>
                <div className="w-60 h-60 lg:w-80 lg:h-80">
                    <Image src="/astro-1.png" width={300} height={300} alt="" />
                </div>
                <button><Image src="/google-play-badge.png" width={150} height={60} alt="" /></button>
                <button onClick={() => push('/homepage')} className="border border-white text-white rounded-md  bg-darkmode-2 px-5 py-2">Buka Mager di Browser</button>
            </div>
            <div className="w-full bg-darkmode-2 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-10 lg:px-36">
                <div className="max-w-[350px] text-center lg:text-left py-10">
                    <h3 className="text-2xl text-white font-bold mb-2">Markas Gamer</h3>
                    <p className="text-white">Markas Gamer adalah wadah bagi para gamer untuk mendapatkan teman sepermainan dari seluruh Indonesia</p>
                </div>
                <div className="w-60 h-60 lg:w-60 lg:h-14">
                    <Image src="/images/Logo Mager-01.png" width={250} height={100} alt="" layout="responsive" />
                </div>
            </div>
        </div>

    )
}

export default LandingContainer