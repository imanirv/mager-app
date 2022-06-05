import { Fragment, useEffect, useState } from 'react'
import Image from "next/image"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, UserGroupIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import { Header4, Body2 } from '../../components/typography'

import AuthProvider from "../../providers/auth"
import MainLayout from "../../components/layout"
import CommunityCard from "../../components/posts/CommunityCard"

import Card from "../../components/card"
import Button from '../../components/button/button'

import { useKomunitasDispatcher } from '../../redux/reducers/komunitas'

const Item = ({id, banner, nama, deskripsi, lokasi, anggota, kategori}) => {
  const {doJoinKomunitas} = useKomunitasDispatcher()
    return (
        <div className="mb-3">
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-32 w-32 relative">
                            <Image src={banner ? banner : "/astro-2.png"} alt="community icon" layout='fill' className='rounded-lg bg-red-200 object-cover'/>
                        </div>
                        <div className="ml-3">
                            <Header4>{nama}</Header4>
                            <div className="w-96">
                                <Body2>
                                       {deskripsi}
                                </Body2>
                            </div>
                        </div>
                    </div>
                    <div className="w-32">
                        <div className="mb-1">
                            <Body2>Kategori : {kategori}</Body2>
                        </div>
                        <div className="flex items-center mb-1">
                            <UserGroupIcon className='w-4 h-4 text-white mb-1 mr-3'/>
                            <Body2>{anggota}</Body2>
                        </div>
                        <div className="flex items-center mb-2">
                            <LocationMarkerIcon className='w-4 h-4 text-white mb-1 mr-3'/>
                            <Body2>{lokasi}</Body2>
                        </div>
                        <div className="" onClick={() => doJoinKomunitas(id)}>
                          <Button href="#" caption="Gabung" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

const ExploreContainer = () => {
  const {komunitas: {listKomunitas}, getListKomunitas} = useKomunitasDispatcher()
    useEffect(() => {
      getListKomunitas()
    }, [])
    return(
      <AuthProvider>
        <MainLayout>
             <div className=" px-3 lg:px-40 pt-20">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        {/* <Filter /> */}
                        {listKomunitas.map((item, i) => (
                          <Item key={i} id={item.id} nama={item.namaKomunitas} deskripsi={item.deskripsi} anggota={item.jumlahAnggota} lokasi={item.lokasi} banner={item.banner} kategori={item.kategori.namaGame}/>
                        ))}

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

export default ExploreContainer