import Image from "next/image";
import {HomeIcon, UserGroupIcon, BellIcon, ChevronDownIcon, SearchIcon} from "@heroicons/react/solid"
const Navbar = () => {
    return (
        <div className=" h-14 bg-darkmode-2 px-3 md:px-40 flex items-center justify-between">
            <div className="w-1/2 flex items-center pr-3    ">
                <div className="flex items-center">
                    <Image alt="logo" src="/images/Logo Mager-01.png" width={40} height={40} />
                    <h1 className="text-white font-nunito font-extrabold text-xl mt-1 ml-1">Mager</h1>
                </div>
                <form action="" className="w-full ml-2 relative">
                    <SearchIcon className="w-6 h-6 text-white absolute left-4 top-1/4"/>
                    <input type="text" className="p-2 pl-14 focus:outline-none  bg-darkmode-3 w-full rounded-lg text-white" placeholder="Cari Di Markas Gamer"/>
                </form>
            </div>
            <div className="w-1/2 flex items-center justify-between pl-16">
                <div className="flex items-center">
                    <HomeIcon className="text-white w-6 h-6"/>
                    <h1 className="text-white font-nunito font-bold mt-1 ml-1">Home</h1>
                </div>
                <div className="flex items-center">
                    <UserGroupIcon className="text-darkmode-disabled w-6 h-6"/>
                    <h1 className="text-darkmode-disabled font-nunito font-bold mt-1 ml-1">Komunitas</h1>
                </div>
                <button>
                    <BellIcon className="text-darkmode-disabled w-6 h-6"/>
                </button>
                <div className="flex items-center">
                    <div className="w-10 h-10 relative rounded-md bg-gray-600">
                        <Image src="/images/profile.png" layout="fill" alt="profile-picture"/>
                    </div>
                    <h1 className="text-white font-nunito font-bold mt-1 ml-2">Ganangrz</h1>
                    <ChevronDownIcon className="w-5 h-5 text-white ml-4 mt-1"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar