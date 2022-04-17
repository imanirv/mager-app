
import { PhotographIcon,  } from '@heroicons/react/solid'
import Image from 'next/image'

import { useState } from 'react'

import LiveIcon from "../../../components/icons/live"
import Modal from './CreatePostModal'





const CreatePostItem = ({children}) => (
    <div className={`bg-darkmode-3 hover:bg-darkmode-hover text-gray-200 h-10 w-12  mr-2 rounded-lg flex items-center justify-center`}>
        {children}
    </div>
)

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal= () => {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    // console.log(isOpen)
  }

    return(
        <>
        <div className={`bg-darkmode-2 w-full rounded-2xl px-3 py-4 flex  md:flex-row items-center justify-center`}>
          <div className="flex w-full">
            <CreatePostItem>
                <Image src={"/images/profile.png"} width={50} height={50} alt="profile"/>
            </CreatePostItem>
            <div className={`bg-darkmode-3 hover:bg-darkmode-hover text-gray-200 w-full h-10 rounded-lg mx-2 flex items-center px-4` }  onClick={openModal}>Buat post</div>
          </div>
            <div className="flex md:flex">
              <CreatePostItem><PhotographIcon className={`bg-darkmode-3 w-4 h-4`} /></CreatePostItem>
              <CreatePostItem><LiveIcon /></CreatePostItem>
            </div>
        </div>
        
        <Modal status={isOpen} close={closeModal}/>
        </>
    )
}



export default CreatePost