import { Fragment, useState } from 'react'
import Image from "next/image"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, UserGroupIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import { Header4, Body2 } from '../../components/typography'

import MainLayout from "../../components/layout/"
import CommunityCard from "../../components/elements/CommunityCard"

import Card from "../../components/card/"


const people = [
  { name: 'Rekomendasi Komunitas' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

function Example() {
  const [selected, setSelected] = useState(people[0])

  return (
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    // <div className="w-72 fixed top-16">
    // </div>
  )
}

const Filter = () => {
    return(
        <div className="mb-3">
            <Card>
                <div className="flex items-center justify-between">
                    <div className="bg-darkmode-3 w-72 rounded-lg text-white font-nunito font-bold">
                        <Example />
                    </div>
                    <button className="bg-gradient-to-r from-[#384CFF] to-[#009EF8] font-nunito font-bold text-white p-1 px-3 rounded-md">Filter</button>
                </div>
            </Card>
        </div>
    )
}
const Item = () => {
    return (
        <div className="mb-3">
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-32 w-32 relative">
                            <Image src="/images/mobile legends 1.png" alt="community icon" layout='fill' className='rounded-lg'/>
                        </div>
                        <div className="ml-3">
                            <Header4>Mobile Legend Indonesia</Header4>
                            <div className="w-96">
                                <Body2>
                                        Komunitas Official Mobile Legends Indonesia  
                                        Sharing info turnamen di seluruh Indonesia !
                                        Sharing info update hero meta
                                        Rasis & Sara = Banned
                                </Body2>
                            </div>
                        </div>
                    </div>
                    <div className="w-32">
                        <div className="mb-1">
                            <Body2>Kategori : moba</Body2>
                        </div>
                        <div className="flex items-center mb-1">
                            <UserGroupIcon className='w-4 h-4 text-white mb-1 mr-3'/>
                            <Body2>100</Body2>
                        </div>
                        <div className="flex items-center mb-2">
                            <LocationMarkerIcon className='w-4 h-4 text-white mb-1 mr-3'/>
                            <Body2>Jakarta</Body2>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#384CFF] to-[#009EF8] font-nunito font-bold text-white p-1 px-3 rounded-md">Gabung</button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

const KomunitasContainer = () => {
    return(
        <MainLayout>
             <div className="pt-4 px-3 lg:px-40">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3">
                        <Filter />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </div>
                    <div className="hidden md:block w-4/12   rounded-2xl">
                        {/* card komunitas taro sini */}
                        <div className="mb-3">
                            <Card>
                                <div className="text-center p-2">
                                    <Header4>
                                        Tulisannya apa belom tau
                                    </Header4>
                                    <button className="w-full bg-gradient-to-r from-[#384CFF] to-[#009EF8] font-nunito font-bold text-white p-1 px-3 rounded-md mt-7">Buat Komunitas</button>
                                </div>
                            </Card>

                        </div>
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
        </MainLayout>
    )
}

export default KomunitasContainer