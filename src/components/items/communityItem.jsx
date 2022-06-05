import Image from "next/image"
import { UserGroupIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import Card from "../card"
import Button from "../button"
import { Header4, Body2  } from "../typography"
import { useKomunitasDispatcher } from "../../redux/reducers/komunitas"

const CommunityItem = ({id, banner, nama, deskripsi, lokasi, anggota, kategori}) => {
    const {doJoinKomunitas} = useKomunitasDispatcher()
      return (
          <div className="mb-3">
              <Card>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start">
                          <div className="h-14 w-14 lg:h-32 lg:w-32 relative p-5">
                              <Image src={banner ? banner : "/astro-2.png"} alt="community icon" layout='fill' className='rounded-lg bg-red-200 object-cover'/>
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
                          <div className="hidden lg:block ml-3  ">
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
export default CommunityItem