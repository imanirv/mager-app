import Navbar from "./elements/navbar"
import {HomeIcon, UserGroupIcon} from "@heroicons/react/solid"
import RoundProfile from '../icons/round-profile';
const MainLayout = ({children, active}) => {
    return(
        <>
            <Navbar active={active} />
            <div className="bg-darkmode-1  min-h-screen">
                {children}
            </div>
            <div className="md:hidden w-full h-10 bg-darkmode-2 fixed bottom-0 flex items-center justify-between px-10 border-t-4 border-darkmode-1">
                <button><HomeIcon className="text-darkmode-disabled w-6 h-6"/></button>
                <button><UserGroupIcon className="text-darkmode-disabled w-6 h-6"/></button>
                <button><RoundProfile /></button>
            </div>
        </>

    )
}

export default MainLayout