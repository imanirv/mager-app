import Image from "next/image"
import { Body1 } from "../typography"

const EmptyState = ({icon = "/astro-1.png", text}) => {
    return(
        <div className="w-full px-10 flex flex-col items-center justify-center">
            <Image src={icon} width={300} height={300} alt=""/>
            <Body1 align="center">{text}</Body1>
        </div>
    )
}

export default EmptyState