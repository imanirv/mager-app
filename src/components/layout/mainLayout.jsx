import Navbar from "./elements/navbar"

const MainLayout = ({children}) => {
    return(
        <>
            <Navbar />
            <div className="bg-black  min-h-screen">
                {children}
            </div>
        </>

    )
}

export default MainLayout