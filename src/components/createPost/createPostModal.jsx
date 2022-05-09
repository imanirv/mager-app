import { Fragment, useState } from 'react'
import Image from 'next/image'

// dependencies 
import { Dialog, Transition, Tab } from '@headlessui/react'
import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'

// icons 
import { PhotographIcon, GlobeIcon, LinkIcon  } from '@heroicons/react/solid'
import PostAdd from "../icons/post-add"
import ImageAdd from "../icons/image-add"
import LiveIcon from "../icons/live"

// typograph 
import { Subtitle1, Subtitle2, Caption,Button, Body1, Body2 } from '../typography'

// api call 
import { usePostDispatcher } from '../../redux/reducers/posts'
import { getUser } from '../../helpers/auth'


    const validationSchema = Yup.object({
        title: Yup.string(),
        postText: Yup.string().required(),
        draft: Yup.boolean(),
        visibility: Yup.boolean()
    
    });

    const initialValues = {
        title: "",
        postText: "",
        draft:false,
        visibility:false
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    function Tabs({index}) {
        const [preview, setPreview] = useState();
        const {doPost} = usePostDispatcher()
        const onSubmit = async (values) => {
            doPost(values)
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
         
        const handleChangeFile = (e) =>{
            const files = e.target.files;
            if (files) {
                setPreview(URL.createObjectURL(files[0]))
                setFieldValue("files", files[0])
            }
        } 
    
        return (
        <div className="p-2">
            <div className="w-full bg-darkmode-3 rounded-md">
            <Tab.Group defaultIndex={index}>
                {/* header tab  */}
                <Tab.List className="flex rounded-xl border-none">
                
                    <Tab
                    className={({ selected }) =>
                    classNames(
                        'w-full p-2 text-sm  font-nunito font-semibold text-white border-gray-500 border rounded-tl-md flex justify-center items-center',
                        selected
                        ? 'bg-darkmode-hover text-white '
                        : 'bg-darkmode-3 text-gray-500  hover:text-white'
                    )
                    }>
                    <PostAdd className='w-5 h-5 mr-1'/>  <Caption> Post</Caption>
                    </Tab>
                    <Tab
                    className={({ selected }) =>
                    classNames(
                        'w-full p-2 text-sm  font-nunito font-semibold text-white border-gray-500 border  flex justify-center items-center',
                        selected
                        ? 'bg-darkmode-hover text-white '
                        : 'bg-darkmode-3 text-gray-500  hover:text-white'
                    )
                    }>
                    <PhotographIcon className='w-5 h-5 mr-1'/>  <Caption> Foto/Video</Caption>
                    </Tab>
                    <Tab
                    className={({ selected }) =>
                    classNames(
                        'w-full p-2 text-sm  font-nunito font-semibold text-white border-gray-500 border rounded-tr-md flex justify-center items-center',
                        selected
                        ? 'bg-darkmode-hover text-white '
                        : 'bg-darkmode-3 text-gray-500  hover:text-white'
                    )
                    }>
                    <LiveIcon className="mr-1"/> <Caption> Siarkan Langsung</Caption> 
                    </Tab>
                    
                </Tab.List>
                <Tab.Panels className="mb-4 bg-darkmode-1">
                    {/* ini post  */}
                    <Tab.Panel>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="relative bg-darkmode-2 rounded-b-lg text-white p-4">
                                <div className="absolute left-3 top-0">
                                </div>
                                <textarea type="text" name="postText" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' />
                                <div className="absolute right-3 bottom-3">
                                    <Caption disabled>0/200</Caption>
                                </div>
                            </div>
                            <div className="mt-4 flex align-items-center justify-center">
                                <input type="hidden" name="tipePost" value="teks" onChange={handleChange} />
                                <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-1/2 mx-2 p-2 rounded-lg'>Kirim</button>
                                <button type='button' onClick={() => onSubmit({...values, draft: true, visibility: false })} className='bg-darkmode-disabled w-1/2 mx-2 p-2 rounded-lg'>Simpan di Draft</button>
                            </div>
                        </form>
                    </Tab.Panel>
                    {/* ini post with media  */}
                    <Tab.Panel>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="relative bg-darkmode-2 rounded-b-lg text-white p-4">
                                <div className="absolute left-3 top-0">
                                </div>
                                <textarea type="text" name="postText" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' />
                                <div className="absolute right-3 bottom-3">
                                    <Caption disabled>0/200</Caption>
                                </div>
                            </div>
                            <label htmlFor="files">
                                <div className="h-36 bg-darkmode-2 p-3 text-white mt-2 rounded-lg border border-dashed border-gray-500">
                                    {preview ? (
                                        <div className="h-full w-60 bg-red-200 relative">
                                            <Image alt='post image' src={preview} layout='fill' className='object-cover' />
                                        </div>
                                    ): (
                                        <div className="flex items-center justify-center w-full h-full">
                                            <ImageAdd className="mr-1"/><Body1>Upload Foto/Video</Body1>
                                        </div> 
                                    )}
                                </div>
                                <input type="file" id='files' name="file" className='hidden' onChange={handleChangeFile} accept=".jpg, .png, .jpeg"  />
                            </label>
                            <div className="mt-4 flex align-items-center justify-center">
                            <input type="hidden" name="tipePost" value="foto" onChange={handleChange} />
                                <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-1/2 mx-2 p-2 rounded-lg'>Kirim</button>
                                <button className='bg-darkmode-disabled w-1/2 mx-2 p-2 rounded-lg'>Simpan di Draft</button>
                            </div>
                        </form>
                    </Tab.Panel>
                    {/* ini post livestream  */}
                    <Tab.Panel>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="relative bg-darkmode-2 rounded-b-lg text-white p-4">
                                <div className="absolute left-3 top-0">
                                </div>
                                <textarea type="text" name="postText" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' />
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
                                        <input type="text" name='liveStream' className='pl-4 bg-transparent h-full w-full outline-none' onChange={handleChange} />
                                    </div>
                                </div>
                           
                            <div className="mt-4 flex align-items-center justify-center">
                                <input type="hidden" name="tipePost" value="livestream" onChange={handleChange}/>
                                <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-1/2 mx-2 p-2 rounded-lg'>Kirim</button>
                                <button className='bg-darkmode-disabled w-1/2 mx-2 p-2 rounded-lg'>Simpan di Draft</button>
                            </div>
                        </form>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            </div>
        </div>
        )
    }
    
    
    const Header = () => {
        const {name, username} = getUser()

        return (
            <div className="flex items-center justify-between px-5 mb-3">
                <div className="flex items-center justify-between">
                    <Image src={"/images/profile.png"} width={42} height={42} alt="profile"/>
                    <div className="mx-3">
                        <div className="flex items-center">
                            <Subtitle1>{name}</Subtitle1>
                            <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-3"></div>
                            <Subtitle2 disabled={true}>{username}</Subtitle2>
                        </div>
                        <div className="flex items-center">
                            <GlobeIcon className='w-4 h-4 text-darkmode-disabled mr-2' />
                            <Caption disabled>Public</Caption>
                        </div>
                    </div>
                </div>
                <button className='bg-darkmode-3 px-3 py-2 rounded-lg'><Button>Draft (2)</Button></button>
            </div>
        )
    }
  
    const Modal = ({status, close, index}) => {
        return (
        <>
            <Transition appear show={status} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={close}
            >
                <div className="min-h-screen bg-darkmode-opacity px-4 text-center">
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
                    className="inline-block h-screen "
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
                    <div className="inline-block md:w-[700px] mt-28 text-left align-middle transition-all transform bg-darkmode-1  shadow-xl rounded-2xl">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white text-center p-5"
                    >
                        Buat Postingan
                    </Dialog.Title>
                    <hr />
                    <div className="mt-4 text-center">
                        <Header />
                    </div>
                    <div className="">
                        <Tabs index={index}/>
                        
                    </div>
                    </div>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition>
        </>
        )
    }

  export default Modal