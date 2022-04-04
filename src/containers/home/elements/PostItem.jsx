/* eslint-disable @next/next/no-img-element */
import { Fragment,  useState } from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { Menu, Transition } from '@headlessui/react'

import { ThumbUpIcon, AnnotationIcon, ChevronDownIcon, PencilIcon, FlagIcon, TrashIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpOutline, AnnotationIcon as AnnotationOutline, LinkIcon } from '@heroicons/react/outline'
import { Subtitle1, Subtitle2, Caption, Body1, Body2 } from '../../../components/typography'



function Dropdown() {
  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex w-auto h-3 cursor-pointer">
                <div className="w-1 h-1 rounded-full bg-darkmode-disabled float-right"></div>
                <div className="w-1 h-1 rounded-full mx-1 bg-darkmode-disabled float-right"></div>
                <div className="w-1 h-1 rounded-full bg-darkmode-disabled float-right"></div>
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
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-darkmode-2 border border-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-darkmode-hover ' : '' 
                    }  text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                      <PencilIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-darkmode-hover ' : ''
                    } text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                     <FlagIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    Laporkan
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-darkmode-hover ' : ''
                    } text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                     <TrashIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    Hapus
                  </button>
                )}
              </Menu.Item>
            </div>   
          </Menu.Items>
        </Transition>
      </Menu>
    // <div className="w-56 text-right fixed top-16">
    // </div>
  )
}

const Header = ({displayName, userName, date}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex">
                <Image src={"/images/profile.png"} width={50} height={50} alt="profile"/>
                <div className="mx-3">
                    <div className="flex items-center">
                        <Subtitle1>{displayName}</Subtitle1>
                        <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-3"></div>
                        <Subtitle2 disabled={true}>{userName}</Subtitle2>
                    </div>
                    <Caption disabled={true}>{date}</Caption>
                </div>
            </div>
            <Dropdown />
        </div>
    )
}

const Content = ({text}) => (
    <div className="mt-3">
        <Body1>{text} </Body1>
    </div>
)

const Media = ({src, type}) => {
    if (type === "image") {
        return(
            <div className="mt-3 flex justify-center">
                <img src={src} alt="post" className='w-full rounded-2xl max-h-[640px]' />
            </div>
        )
    } else {
        return (
            <div className="mt-3 flex justify-center bg-black">
                <ReactPlayer url={src} playing controls={true} />
            </div>
        )
    }
}

const Count = ({likeCount, commentCount}) =>{
    return(
        <div className="mt-3 flex items-center">
                <div className="flex items-center p-2 mr-8">
                    <div className=" bg-gradient-to-r from-[#384CFF] to-[#009EF8] p-1 flex items-center justify-center rounded-md mr-2">
                        <ThumbUpIcon  className="text-white w-4 h-4"/>
                    </div>
                        <Body2 disabled={true}>{likeCount} Suka</Body2>
                </div>
                <div className="flex items-center p-2">
                    <div className=" bg-gradient-to-r from-[#384CFF] to-[#009EF8] p-1 flex items-center justify-center rounded-md mr-2">
                        <AnnotationIcon  className="text-white w-4 h-4"/>
                    </div>
                        <Body2 disabled={true}>{commentCount} Komentar</Body2>
                </div>
            </div>
    )
}

const ActionButtons = () => {
    return (
        <div className="mt-3 flex justify-between items-center">
            <button className='flex items-center mx-16 py-3 px-6 rounded-md hover:bg-darkmode-hover'>
                <ThumbUpOutline className='text-white w-5 h-5 mr-3'/>
                <Body1 disabled={true}>Suka</Body1>
            </button>
            <button className='flex items-center mx-16 py-3 px-6 rounded-md hover:bg-darkmode-hover'>
                <AnnotationOutline className='text-white w-5 h-5 mr-3'/>
                <Body1 disabled={true}>Komentar</Body1>
            </button>
            <button className='flex items-center mx-16 py-3 px-2 rounded-md hover:bg-darkmode-hover'>
                <LinkIcon className='text-white w-5 h-5 mr-3'/>
                <Body1 disabled>Salin Link</Body1>
            </button>
        </div>
    )
}

const PostItem = (
    {
        displayName = "", 
        userName = "", 
        date = "", 
        text= "", 
        media = "",
        mediaType = "",
        likeCount = 0, 
        commentCount = 0}) => {
    return(
        <div className="bg-darkmode-2 w-full rounded-2xl p-3 mb-3">
            {/* header  */}
           <Header userName={userName} displayName={displayName} date={date} />
            {/* konten  */}
           <Content text={text}/>
            {/* media  */}
            {media ? <Media src={media} type={mediaType} /> : ""}   
            {/* jumlah like & comment  */}
            <Count likeCount={likeCount} commentCount={commentCount} />
            {/* action post  */}
            <ActionButtons />
        </div>
    )
}

export default PostItem