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
                    <div className="flex items-center justify-start">
                        <div className="h-14 w-14 lg:h-32 lg:w-32 relative p-5">
                            <Image src={banner ? banner : "/astro-2.png"} alt="community icon" layout='fill' className='rounded-lg bg-red-200 object-cover'/>
                            {/* <Image src={ "/astro-2.png"} alt="community icon" layout='fill' className='rounded-lg bg-red-200 object-cover'/> */}
                            {/* <p className="text-white">{banner}</p> */}
                        </div>
                        <div className="ml-5 w-full lg:hidden">
                            <h1 className='text-white font-semibold'>{nama}</h1>
                            {/* <p className='text-white text-sm '>{deskripsi}</p> */}
                            <div className="flex items-center mt-2">
                                <div className="flex items-center mb-1 mr-2">
                                    <UserGroupIcon className='w-3 h-3 text-white mb-1 mr-1'/>
                                    <p className='text-xs text-white'>{anggota}</p>
                                </div>
                                <div className="flex items-center mb-1">
                                    <LocationMarkerIcon className='w-3 h-3 text-white mb-1 mr-1'/>
                                    <p className='text-xs text-white'>{lokasi}</p>
                                </div>
                            </div>

                        </div>
                        <div className="hidden lg:block ml-3 w-64 ">
                            <Header4>{nama}</Header4>
                            <div className="">
                                <Body2>
                                       {deskripsi}
                                </Body2>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 lg:hidden">
                        <div className="" onClick={() => doJoinKomunitas(id)}>
                          <Button href="#" caption="Gabung" />
                        </div>
                    </div>
                    <div className="hidden lg:block w-1/4">
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
        <MainLayout active="explore">
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