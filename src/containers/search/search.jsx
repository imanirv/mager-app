import {useRouter} from "next/router"
import Image from "next/image"
import { useEffect } from "react"
import { Tab } from '@headlessui/react'
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"
import CommunityCard from "../../components/posts/CommunityCard"
import MainLayout from "../../components/layout"
import AuthProvider from "../../providers/auth"
import Card from "../../components/card/card"
import { Header4 } from "../../components/typography"
import {CommunityItem} from "../../components/items"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchContainer = () => {
    const router = useRouter()
    const {keyword} = router.query
    const {komunitas: {listKomunitas}, getListKomunitas} = useKomunitasDispatcher()

    useEffect(() => {
        getListKomunitas(keyword)
    }, [keyword])
    return (
        <AuthProvider>
            <MainLayout>
            <div className=" px-3 lg:px-40 pt-20">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                    <Card>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-transparent">
                                <Tab
                                key="Orang"
                                className={({ selected }) =>
                                    classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                    selected
                                        ? ' border-b-4 border-b-blue-400'
                                        : ' hover:bg-white/[0.12] '
                                    )
                                }
                                >
                                Orang
                                </Tab>
                                <Tab
                                key="Komunitas"
                                className={({ selected }) =>
                                    classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-white',
                                    selected
                                        ? ' border-b-4 border-b-blue-400'
                                        : ' hover:bg-white/[0.12] '
                                    )
                                }
                                >
                                Komunitas
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel
                                key="follower"
                                className={classNames(
                                    'p-3'
                                )}
                                >
                                    
                                    
                                </Tab.Panel>
                                <Tab.Panel
                                key="following"
                                className={classNames(
                                    'p-3'
                                )}
                                >
                                    {listKomunitas.length > 0 ? <>
                                        {listKomunitas.map((item, i)=>(
                                            <CommunityItem key={i} id={item.id} nama={item.namaKomunitas} anggota={item.jumlahAnggota} lokasi={item.lokasi} banner={item.banner}  />
                                        ))}
                                    
                                    </>
                                :<div className='flex flex-col justify-center items-center my-10'>
                                    <div className="mb-10">
                                        <Image src="/astro-6.png" alt="empty state" width={250} height={250}/>
                                    </div>
                                    <Header4>{keyword} tidak ditemukan</Header4>
                                </div> }
                                    
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                    </div>
                    <div className="hidden md:block w-4/12   rounded-2xl">
                        
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
            </MainLayout>
        </AuthProvider>
    )
}
export default SearchContainer