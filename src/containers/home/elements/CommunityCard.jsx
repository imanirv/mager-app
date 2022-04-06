import Image from "next/image"
import { Header3, Body1 } from "../../../components/typography"
import GroupAdd from "../../../../public/custom-icon/group-add"


const ItemList = ({name, src}) => {
    return(
        <div className="flex items-center my-2">
            <div className="w-10 h-10 mx-4 rounded-md relative">
                <Image alt="community" className="rounded-md" layout="fill" src={src}/>
            </div>
            <Body1 bold>{name}</Body1>
        </div>
    )
}

const CommunityCard = () => {
    return(
        <>
        <div className="flex justify-between items-center text-white p-4">
            <Header3>Komunitasmu</Header3>
            <GroupAdd />
        </div>
        <div className="my-3">
           <ItemList name="dota2" src="/images/dota2.png" />
           <ItemList name="Mobile Legends Indonesia" src="/images/mobile legends 1.png" />
        </div>
        </>
    )
}

export default CommunityCard