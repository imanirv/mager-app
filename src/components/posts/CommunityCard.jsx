import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import {useRouter} from "next/router"
import { Header3, Body2 } from "../typography"
import Button from "../button"
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"
import { UserGroupIcon } from "@heroicons/react/solid"
import EmptyState from "../emptyState"

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
    const {komunitas: {listKomunitasJoined}, getListKomunitasJoined} = useKomunitasDispatcher()
    const {push} = useRouter()
    useEffect(()=> {
        getListKomunitasJoined()
    }, [])

    return(
        <div className="bg-darkmode-2 p-4 rounded-lg">
            <div className="flex justify-between items-center text-white mb-3">
                <Header3>Komunitasmu</Header3>
            </div>
            <div className="my-3">
                {listKomunitasJoined.length > 0 ? <>
                    <Link href='/komunitas/buat-komunitas' passHref>
                        <a>
                            <Button caption="+ Buat Komunitas" />
                        </a>
                    </Link>
                    {listKomunitasJoined.map((item, i) => (
                        <ItemList key={i} id={item.komunitas.id} name={item.komunitas.namaKomunitas} src={item.komunitas.banner ? item.komunitas.banner : "/astro-2.png"} anggota={item.komunitas.jumlahAnggota} />
                    ))}
                </>: <>
                <EmptyState text="Kamu belum mengikuti komunitas manapun" />
                <div className="mt-4 flex">
                    <div onClick={() => push('/explore')} className="w-full">
                        <Button  caption="Cari Komunitas" />
                    </div>
                    <div className="mx-1"></div>
                    <div onClick={() => push('/komunitas/buat-komunitas')} className="w-full">
                        <Button  caption="+ Buat Komunitas" secondary/>
                    </div>
                </div>
                </>}
            </div>
        </div>
    )
}

export default CommunityCard