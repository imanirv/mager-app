import Image from "next/image"
import {useRouter} from "next/router"
import { Header3, Body1 } from "../typography"
import GroupAdd from "../icons/group-add"


const ItemList = ({name, src}) => {
    const {push} = useRouter()

    return(
        <div className="flex items-center my-2 p-1 hover:bg-darkmode-hover rounded-md" onClick={() => push(`/komunitas/${name}`)}>
            <div className="w-10 h-10 mr-4 rounded-md relative">
                <Image alt="community" className="rounded-md" layout="fill" src={src}/>
            </div>
            <Body1 bold>{name}</Body1>
        </div>
    )
}

const CommunityCard = () => {
    return(
        <div className="bg-darkmode-2 p-4 rounded-lg">
            <div className="flex justify-between items-center text-white ">
                <Header3>Komunitasmu</Header3>
                <GroupAdd />
            </div>
            <div className="my-3">
            <ItemList name="dota2" src="/images/dota2.png" />
            <ItemList name="Mobile Legends Indonesia" src="/images/mobile legends 1.png" />
            </div>
        </div>
    )
}

export default CommunityCard