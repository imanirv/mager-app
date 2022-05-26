import Navbar from "./elements/navbar"

const MainLayout = ({children}) => {
    return(
        <>
            <Navbar />
            <div className="bg-darkmode-1  min-h-screen">
                {children}
            </div>
        </>

    )
}

export default MainLayout