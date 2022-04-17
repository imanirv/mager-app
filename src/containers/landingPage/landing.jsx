import { useRouter } from "next/router"

const LandingContainer = () => {
    const {push} = useRouter()
    return(
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
            <h1 className="text-7xl font-nunito font-bold">Markas Gamer</h1>
            <h2 className="text-4xl font-nunito">Komunitas yang kamu butuhkan saat bermain game</h2>
            <div className="flex mt-5">
                <button className="p-2 border border-slate-500 rounded-lg hover:bg-slate-200 hover:text-black mr-5">download in playstore</button>
                <button onClick={() => push('/homepage')} className="p-2 bg-blue-900 rounded-lg hover:bg-blue-500">go to homepage</button>
            </div>
        </div>
    )
}

export default LandingContainer