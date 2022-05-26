import Image from "next/image"
import { useEffect } from "react"
import {useRouter} from "next/router"
import { Header3, Body1, Body2 } from "../typography"
import GroupAdd from "../icons/group-add"
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"
import { UserGroupIcon } from "@heroicons/react/solid"

const ItemList = ({name,id, src, anggota}) => {
    const {push} = useRouter()

    return(
        <div className="flex items-center my-2 p-1 hover:bg-darkmode-hover rounded-md" onClick={() => push(`/komunitas/${id}`)}>
            <div className="w-10 h-10 mr-4 rounded-md relative bg-red-300">
                <Image alt="community" className="rounded-md" layout="fill" src={src}/>
            </div>
            <div className="">
                <p className="font-semibold text-white capitalize">{name}</p>
                <div className="flex">
                    <UserGroupIcon className="w-4 h-4 mr-2 text-darkmode-disabled" />
                    <Body2 disabled>{anggota}</Body2>
                </div>
            </div>
        </div>
    )
}

const CommunityCard = () => {
    const {komunitas: {listKomunitas}, getListKomunitas} = useKomunitasDispatcher()
    const {push} = useRouter()
    useEffect(()=> {
        getListKomunitas()
    }, [])

    return(
        <div className="bg-darkmode-2 p-4 rounded-lg">
            <div className="flex justify-between items-center text-white ">
                <Header3>Komunitasmu</Header3>
                {/* <GroupAdd /> */}
            </div>
            <button className="w-full bg-gradient-to-r from-[#384CFF] to-[#009EF8] font-nunito font-bold text-white py-2 px-3 rounded-md mt-7" onClick={() => push('/komunitas/buat-komunitas')}>+ Buat Komunitas</button>
            <div className="my-3">
                {listKomunitas.map((item, i) => (
                    <ItemList key={i} id={item.id} name={item.namaKomunitas} src={item.banner ? item.banner : "/astro-2.png"} anggota={item.jumlahAnggota} />
                ))}
            </div>
        </div>
    )
}

export default CommunityCard