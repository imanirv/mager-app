import {useRouter} from 'next/router'
import { Fragment, useState } from 'react'
import {  PencilIcon, FlagIcon, TrashIcon, GlobeIcon, LinkIcon } from '@heroicons/react/solid'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { Subtitle1, Subtitle2, Body1, Caption, Button} from '../../../typography'
import Image from 'next/image'

import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'
import { callAPI } from '../../../../helpers/network'

const validationSchema = Yup.object({
  title: Yup.string(),
  postText: Yup.string().required(),
  draft: Yup.boolean(),
  visibility: Yup.boolean()

});


const FormTipe = ({tipe = "teks", text = "", linkLiveStream, media, idPost}) => {
  const [preview, setPreview] = useState(media)
  const initialValues = {
    title: "",
    postText: text,
    livestream: linkLiveStream,
    draft:false,
    visibility:false
  }
  
  const onSubmit = async (values) => {
    const fileUrl = "";
    if (values.files) {
        const formData = new FormData();
        formData.append("file", values.files)

        console.log(formData);
        
        const upload = await callAPI({
            url:"/uploadFiles",
            method:"post",
            data: formData,
        })

        
        fileUrl = upload.data.data;
    }

    const payload = {
      linkLivestream: values.livestream,
      postText: values.postText,
      files: fileUrl,
      visibility: false,
    }
    console.log('payload >', payload)
    
    const response = await callAPI({
      url:`/postingan/${idPost}?idUser=2`,
      method:"put",
      data: payload
    })
    if (response.status == 200) {
      window.location.reload()
      // console.log('updated')
    }

  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
} = useFormik({
    initialValues,
    validationSchema,
    onSubmit
});

const handleChangeFile = (e) => {
  const files = e.target.files;
  if (files) {
      setPreview(URL.createObjectURL(files[0]));
      setFieldValue("files", files[0]);
  }
}

  if (tipe === "teks") {
    return(
      <form  onSubmit={handleSubmit}>
          <div className="relative bg-darkmode-2 rounded-lg text-white p-4">
              <div className="absolute left-3 top-0">
              </div>
              <textarea type="text" name="postText" id="" placeholder='Text'className='w-full h-full bg-transparent outline-none px-3 mb-5' onChange={handleChange}>{text}</textarea>
              <div className="absolute right-3 bottom-3">
                  <Caption disabled>0/200</Caption>
              </div>
          </div>
          <div className="mt-4 flex align-items-center justify-center">
              <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-full mx-2 p-2 rounded-lg'>Kirim</button>
          </div>
      </form>
    )
  }else if (tipe === "livestream") {
    return(
      <form  onSubmit={handleSubmit}>
          <div className="relative bg-darkmode-2 rounded-lg text-white p-4">
              <div className="absolute left-3 top-0">
              </div>
              <textarea type="text" name="postText" id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' onChange={handleChange} defaultValue={text} />
              <div className="absolute right-3 bottom-3">
                  <Caption disabled>0/200</Caption>
              </div>
          </div>
          <div className=" bg-darkmode-2 flex items-center text-white mt-2 rounded-lg  ">
              <div className="p-2 bg-darkmode-hover flex items-center rounded-tl-lg rounded-bl-lg">
                  <LinkIcon className='text-white w-5 h-5 mx-3'/>
                  <Button>Link</Button>
              </div>
              <div className="h-full w-full">
                  <input type="text" name='livestream' className='pl-4 bg-transparent h-full w-full outline-none' defaultValue={linkLiveStream} onChange={handleChange}/>
              </div>
          </div>
          <div className="mt-4 flex align-items-center justify-center">
              <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-full mx-2 p-2 rounded-lg'>Kirim</button>
          </div>
      </form>
      )
    }else {
      return(
        <form  onSubmit={handleSubmit}>
          <div className="relative bg-darkmode-2 rounded-lg text-white p-4">
              <div className="absolute left-3 top-0">
              </div>
              <textarea type="text" name="postText" id="" placeholder='Text' defaultValue={text} onChange={handleChange} className='w-full h-full bg-transparent outline-none px-3 mb-5' />
              <div className="absolute right-3 bottom-3">
                  <Caption disabled>0/200</Caption>
              </div>
          </div>
          <div className="  flex items-center text-white mt-2 rounded-lg  ">
            <label htmlFor="files">
                <div className=" bg-darkmode-2 p-3 text-white mt-2 rounded-lg border border-dashed border-gray-500">
                    {preview ? (
                      <div className="h-full  relative">
                          <img src={preview} alt={preview} width={100} height={120} /> 
                            {/* <Image alt='post image' src={preview} layout='fill' className='object-cover' /> */}
                        </div>
                    ): (
                        <div className="flex items-center justify-center w-full h-full">
                            <Body1>Upload Foto/Video</Body1>
                        </div> 
                    )}
                </div>
                <input type="file" id='files' name="file" className='hidden' onChange={handleChangeFile} accept=".jpg, .png, .jpeg"  />
            </label>
          </div>
          <div className="mt-4 flex align-items-center justify-center">
              <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-full mx-2 p-2 rounded-lg'>Kirim</button>
          </div>
        </form>
      )
  }
}

function Modal({idPost, status, close, tipe, text, linkLiveStream, media}) {
  return (
    <>
      <Transition appear show={status} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}
        >
          <div className="min-h-screen bg-darkmode-opacity text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full md:w-[700px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-darkmode-1 shadow-xl rounded-2xl">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white text-center p-1 mb-3"
                >
                    Edit Postingan
                </Dialog.Title>
                <hr />
                  <div className="flex items-center justify-between px-5 my-3">
                      <div className="flex items-center justify-between">
                          <Image src={"/images/profile.png"} width={42} height={42} alt="profile"/>
                          <div className="mx-3">
                              <div className="flex items-center">
                                  <Subtitle1>user</Subtitle1>
                                  <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-3"></div>
                                  <Subtitle2 disabled={true}>username</Subtitle2>
                              </div>
                              <div className="flex items-center">
                                  <GlobeIcon className='w-4 h-4 text-darkmode-disabled mr-2' />
                                  <Caption disabled>Public</Caption>
                              </div>
                          </div>
                      </div>
                     
                  </div>
                 <FormTipe idPost={idPost} tipe={tipe} text={text} linkLiveStream={linkLiveStream} media={media}/>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
function Dropdown({idPost, tipe, text, linkLiveStream, media}) {
    const {push} = useRouter()
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }

    function openModal() {
      setIsOpen(true)
    }

    return (
      <>
        <Menu as="div" className="relative inline-block text-left z-10">
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
                      onClick={() => openModal()}
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
        <Modal idPost={idPost} status={isOpen} close={closeModal} tipe={tipe} text={text} linkLiveStream={linkLiveStream} media={media}/>
      </>
    )
  }

export const HeaderUser = ({displayName , userName , date, idPost, postType, text, linkLiveStream, media}) => {
 
    return (
      <>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={"/images/profile.png"} width={40} height={40} alt="profile"/>
                <div className="mx-3">
                    <div className="flex items-center">
                        <Subtitle1>{displayName}</Subtitle1>
                        <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-2 mt-1 md:mx-3"></div>
                        <Subtitle2 disabled={true}>{userName}</Subtitle2>
                    </div>
                    <Caption disabled={true}>{date}</Caption>
                </div>
            </div>
            <Dropdown idPost={idPost} tipe={postType} text={text} linkLiveStream={linkLiveStream} media={media}/>
        </div>
        
      </>
    )
}
export const HeaderKomunitas = ({communityName , userName , date, idPost, postType, text, linkLiveStream, media}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={"/images/profile.png"} width={40} height={40} alt="profile"/>
                <div className="mx-3">
                    <Subtitle1>{communityName}</Subtitle1>
                    <div className="flex items-center">
                        <Subtitle2 disabled={true}>{userName}</Subtitle2>
                        <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-2 mt-1 md:mx-3"></div>
                        <Caption disabled={true}>{date}</Caption>
                    </div>
                </div>
            </div>
            <Dropdown idPost={idPost} tipe={postType} text={text} linkLiveStream={linkLiveStream} media={media}/>
        </div>
    )
}