import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// dependecies 
import { useFormik } from 'formik'
import * as Yup from 'yup'
// custom func 
import { callAPI } from '../../../../helpers/network'
import {getUser} from "../../../../helpers/auth"

// dispatcher 
import { usePostDispatcher } from '../../../../redux/reducers/posts'

// component 
import { Subtitle1, Subtitle2, Body1, Caption, Button} from '../../../typography'

// icon 
import {  PencilIcon, FlagIcon, TrashIcon, GlobeIcon, LinkIcon, XIcon, ArrowLeftIcon } from '@heroicons/react/solid'
import { Menu, Transition, Dialog } from '@headlessui/react'

const validationSchema = Yup.object({
  title: Yup.string(),
  postText: Yup.string().required(),
  draft: Yup.boolean(),
  visibility: Yup.boolean()

});


const ModalReport = ({status, close, idPost}) => {
  const [toggle, setToggle] = useState(false)
  const {posting:{loadingReport}, doReport} = usePostDispatcher()
  const onSubmit = (values) =>{
    doReport(values, idPost)
  }
  const initialValues = {
    isiReport: "ini report"
  }
  const {
    handleSubmit,
    handleChange,
    handleBlur
  } = useFormik({
    initialValues, 
    onSubmit
  })

  return (
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
                className="text-lg font-medium leading-6 text-white text-center p-1 mb-3 flex items-center justify-between"
            >
              <div  onClick={()=>setToggle(!toggle)}>
                <ArrowLeftIcon className={`${!toggle && "hidden"} w-4 text-white`} />
              </div>
                Laporan
              <div onClick={() => close()}>
                <XIcon className='w-4 h-4 text-white' />
              </div>
            </Dialog.Title>
            <hr />
            <div className="mt-4 relative">
              <form action="" className='mt-3' onSubmit={handleSubmit}>
                <div className={`${toggle && "hidden"}`}>
                <Body1 bold>Kenapa kamu laporkan post ini ?</Body1>
                <Body1 disabled>Laporan kamu akan dikirim ke sistem Markas Gamer</Body1>
                  <div className="mt-4">

                      <div className="mb-2">
                        <label htmlFor="reportSpam">
                          <input type="radio" name="isiReport" onChange={handleChange} id="reportSpam" value="spam" />
                          <span className='ml-2 text-white'>Spam</span>
                        </label>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="reportToxic">
                          <input type="radio" name="isiReport" onChange={handleChange} id="reportToxic" value="reportToxic" />
                          <span className='ml-2 text-white'>Kata-kata kasar</span>
                        </label>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="reportHarrasment">
                          <input type="radio" name="isiReport" onChange={handleChange} id="reportHarrasment" value="reportHarrasment" />
                          <span className='ml-2 text-white'>Bully atau pelecehan</span>
                        </label>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="reportPenipuan">
                          <input type="radio" name="isiReport" onChange={handleChange} id="reportPenipuan" value="reportPenipuan" />
                          <span className='ml-2 text-white'>Penipuan</span>
                        </label>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="reportViolence">
                          <input type="radio" name="isiReport" onChange={handleChange} id="reportViolence" value="reportViolence" />
                          <span className='ml-2 text-white'>Kekerasan</span>
                        </label>
                      </div>
                    <div className=" mb-4 cursor-pointer" onClick={() => setToggle(!toggle)}>
                      <Body1>Lainnya</Body1>
                    </div>
                  </div>
                </div>
                <div className={`${!toggle && "hidden"} bg-darkmode-1 w-full h-full top-0 left-0`}>
                  <Body1>Lainnya</Body1>
                  <textarea name='isiReport' onChange={handleChange} className='my-4 w-full h-32 bg-darkmode-3 rounded-lg text-white p-3'></textarea>
                </div>
                <button type={!loadingReport ? "submit" : "button" }  className='w-full p-2 rounded-md bottom-0 bg-blue-600 text-white'>{!loadingReport ? "Kirim" : "Sedang Mengirim" }</button>
                
              </form>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}

const FormTipe = () => {

  const {posting:{detailPost}, putPost} = usePostDispatcher() 
  const [initialValues, setInitialValues] = useState(
    {
      title: "",
      postText: '',
      livestream: "",
      draft:false,
      visibility:false, 
      files: ""
  }
  )
  const [preview, setPreview] = useState(detailPost.files)


  useEffect(() => {
    console.log(detailPost)
    setPreview(detailPost.files)
    setInitialValues(
      {
          title: "",
          postText: detailPost.postText,
          livestream: detailPost.linkLiveStream,
          draft:false,
          visibility:false,
          files: detailPost.files
      }
    )
  }, [detailPost])

  
  const onSubmit = async (values) => {
    putPost(values, detailPost.id)
  }
  
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
} = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize:true
});

  if (detailPost.tipePost === "teks") {
    return(
      <form  onSubmit={handleSubmit}>
          <div className="relative bg-darkmode-2 rounded-lg text-white p-4">
              <div className="absolute left-3 top-0">
              </div>
              <textarea type="text" name="postText" id="" placeholder='Text'className='w-full h-full bg-transparent outline-none px-3 mb-5' onChange={handleChange} defaultValue={initialValues.postText}></textarea>
              <div className="absolute right-3 bottom-3">
                  <Caption disabled>0/200</Caption>
              </div>
          </div>
          <div className="mt-4 flex align-items-center justify-center">
              <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-full mx-2 p-2 rounded-lg'>Kirim</button>
          </div>
      </form>
    )
  }else if (detailPost.tipePost === "livestream") {
    return(
      <form  onSubmit={handleSubmit}>
          <div className="relative bg-darkmode-2 rounded-lg text-white p-4">
              <div className="absolute left-3 top-0">
              </div>
              <textarea type="text" name="postText" id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' onChange={handleChange} defaultValue={initialValues.postText} />
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
                  <input type="text" name='livestream' className='pl-4 bg-transparent h-full w-full outline-none' defaultValue={detailPost.linkLivestream} onChange={handleChange}/>
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
              <textarea type="text" name="postText" id="" placeholder='Text' defaultValue={initialValues.postText} onChange={handleChange} className='w-full h-full bg-transparent outline-none px-3 mb-5' />
              <div className="absolute right-3 bottom-3">
                  <Caption disabled>0/200</Caption>
              </div>
          </div>
          <div className="  flex items-center text-white mt-2 rounded-lg h-32 relative">
            <label htmlFor="files">
                <div className=" bg-darkmode-2 p-3 text-white mt-2 rounded-lg border border-dashed border-gray-500 h-32 w-full">
                    {initialValues.files ? (
                      <div className="">
                          {/* <img src={preview} alt={preview} width={100} height={120} />  */}
                            <Image alt='post image' src={preview} layout='fill' className='object-cover rounded-md' />
                        </div>
                    ): (
                        <div className="flex items-center justify-center w-full h-full">
                            <Body1>Upload Foto/Video</Body1>
                        </div> 
                    )}
                </div>
            </label>
          </div>
          <div className="mt-4 flex align-items-center justify-center">
              <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-full mx-2 p-2 rounded-lg'>Kirim</button>
          </div>
        </form>
      )
  }
}

function Modal({idPost, status, close}) {
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
                 <FormTipe />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function Dropdown({idUser, idPost}) {
    const {id} = getUser()
    const {getPostDetail, delPost} = usePostDispatcher()
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenReport, setIsOpenReport] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }

    function openModal() {
      setIsOpen(true)
      getPostDetail(idPost)
      // console.log(idPost)
    }
    function closeModalReport() {
      setIsOpenReport(false)
    }

    function openModalReport() {
      setIsOpenReport(true)
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
                {idUser == id && (
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
                ) }
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-darkmode-hover ' : ''
                      } text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => openModalReport()}
                    >
                       <FlagIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                      Laporkan
                    </button>
                  )}
                </Menu.Item>
                {idUser == id && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-darkmode-hover ' : ''
                        } text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() =>delPost(idPost) }
                      >
                        <TrashIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        Hapus
                      </button>
                    )}
                  </Menu.Item>
                )}
              </div>   
            </Menu.Items>
          </Transition>
        </Menu>
        <Modal idPost={idPost} status={isOpen} close={closeModal} />
        <ModalReport idPost={idPost} status={isOpenReport} close={closeModalReport}/>
      </>
    )
  }

export const HeaderUser = ({data, date, idPost}) => {
  const {id, nama, username}= data
  const {push} = useRouter()
    return (
      <>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={"/images/profile.png"} width={40} height={40} alt="profile"/>
                <div className="mx-3">
                    <div className="flex items-center" onClick={() => push(`/user/${id}`)}>
                        <Subtitle1>{nama}</Subtitle1>
                        <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-2 mt-1 md:mx-3"></div>
                        <Subtitle2 disabled={true}>{username}</Subtitle2>
                    </div>
                    <Caption disabled={true}>{date}</Caption>
                </div>
            </div>
            <Dropdown idUser={id} idPost={idPost}/>
        </div>
        
      </>
    )
}
export const HeaderKomunitas = ({dataUser, dataKomunitas, date}) => {
  const {push} = useRouter()
  const {id, username}= dataUser
  const {idKomunitas=id, namaKomunitas} = dataKomunitas
  // const {}
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={"/images/profile/default-1.png"} width={40} height={40} alt="profile"/>
                <div className="mx-3" onClick={() => push(`/komunitas/${idKomunitas}`)}>
                    <Subtitle1>{namaKomunitas}</Subtitle1>
                    <div className="flex items-center">
                        <Subtitle2 disabled={true}>{username}</Subtitle2>
                        <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-2 mt-1 md:mx-3"></div>
                        <Caption disabled={true}>{date}</Caption>
                    </div>
                </div>
            </div>
            {/* <Dropdown idPost={idPost} tipe={postType} text={text} linkLiveStream={linkLiveStream} media={media}/> */}
        </div>
    )
}