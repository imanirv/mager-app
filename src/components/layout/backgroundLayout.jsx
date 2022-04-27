import Style from "../../styles/stars.module.css"


const BackgroundLayout = ({children}) => {
    return(
        <div className={Style.screens}>
            <div id={Style.stars}></div>
            <div id={Style.stars2}></div>
            <div id={Style.star3}></div>
           {children}
        </div>
    )
}

export default BackgroundLayout