import Style from "../styles/stars.module.css"

const Test = () => {
    return(
        <div className={Style.screens}>
            <div id={Style.stars}></div>
            <div id={Style.stars2}></div>
            <div id={Style.star3}></div>
            {/* <div id="stars2"></div>
            <div id="stars3"></div> */}
        </div>
    )
}

export default Test