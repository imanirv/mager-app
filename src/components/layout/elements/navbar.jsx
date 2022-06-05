import { Fragment, useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react'

import {HomeIcon, UserGroupIcon, BellIcon, ChevronDownIcon, SearchIcon, LogoutIcon} from "@heroicons/react/solid"
import RoundProfile from '../../icons/round-profile';
import {useAuthDispatcher} from '../../../redux/reducers/auth'
import {getUser} from '../../../helpers/auth'

function Profile() {
  const {push} = useRouter()
  const {doLogout} = useAuthDispatcher()
  const bio = getUser()
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
           <div className="flex items-center">
                    <div className="w-9 h-9 relative rounded-md bg-gray-600">
                        <Image src={bio.fotoProfile ? bio.fotoProfile :"/images/profile.png"} layout="fill" alt="profile-picture" className='rounded-lg'/>
                    </div>
                    <h1 className="text-white font-nunito font-bold mt-1 ml-2">{bio.name}</h1>
                    <ChevronDownIcon className="w-5 h-5 text-white ml-4 mt-1"/>
                </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-darkmode-3 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-darkmode-hover text-white' : 'text-white'
                    } font-nunito group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => push(`/user/${bio.id}`)}
                  >
                  <RoundProfile />
                  <span className='ml-2'>Profile</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-darkmode-hover text-white' : 'text-white'
                    } font-nunito group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => doLogout()}
                  >
                  <LogoutIcon className='w-5 h-5' />
                  <span className='ml-2'>Logout</span>
                  </button>
                )}
              </Menu.Item>
            
            </div>
           
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
const Navbar = () => {
    const {push} = useRouter()
    
    return (
        <div className="fixed z-50 w-screen h-14 bg-darkmode-2 px-3 lg:px-40 flex items-center justify-between border-b-4 border-darkmode-1">
            <div className="w-1/3 flex items-center justify-between cursor-pointer pr-3">
                <div className="flex items-center mr-10 lg:mr-1" onClick={() => push('/homepage')}>
                    <div className="w-10 h-10">
                      <Image alt="logo" src="/images/Logo Mager-02.png" width={40} height={40} layout="responsive" />
                    </div>
                    {/* <img /> */}
                    <h1 className="text-white font-nunito font-extrabold text-xl mt-1 ml-1">Mager</h1>
                </div>
                <div className="hidden md:flex items-center cursor-pointer mr-10 lg:mr-1" onClick={() => push('/homepage')}>
                    <HomeIcon className="text-white w-6 h-6"/>
                    <h1 className="text-white font-nunito font-bold mt-1 ml-1">Home</h1>
                </div>
                <div className="hidden md:flex items-center cursor-pointer mr-10 lg:mr-1" onClick={() => push("/explore")}>
                    <UserGroupIcon className="text-darkmode-disabled w-6 h-6"/>
                    <h1 className="text-darkmode-disabled font-nunito font-bold mt-1 ml-1">Komunitas</h1>
                </div>
               
                
            </div>
            <div className="w-2/3 items-center justify-between hidden lg:flex">
                <form action="" className="w-full mr-4 relative hidden lg:block">
                    <SearchIcon className="w-6 h-6 text-white absolute right-4 top-1/4"/>
                    <input type="text" className="p-2 pl-4 focus:outline-none  bg-darkmode-3 w-full rounded-lg text-white" placeholder="Cari Di Markas Gamer"/>
                </form>
                <button>
                    <BellIcon className="text-darkmode-disabled w-6 h-6 mr-4"/>
                </button>
                <Profile />
            </div>

            {/* mobile item  */}
            <div className="w1/2 flex items-center justify-end lg:hidden">
                <button className="mr-3">
                    <SearchIcon className="w-6 h-6 text-darkmode-disabled hover:text-white "/>
                </button>
                <button>
                    <BellIcon className="text-darkmode-disabled w-6 h-6"/>
                </button>
            </div>
            
        </div>
    )
}

export default Navbar