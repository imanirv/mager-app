import { Fragment, useState } from 'react'
import Image from 'next/image'

// dependencies 
import { Dialog, Transition, Tab } from '@headlessui/react'
import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'

// icons 
import { PhotographIcon,  } from '@heroicons/react/solid'
import PostAdd from "../../../../public/custom-icon/post-add"
import ImageAdd from "../../../../public/custom-icon/image-add"
import LiveIcon from "../../../../public/custom-icon/live"

// typograph 
import { Subtitle1, Subtitle2, Caption,Button, Body1, Body2 } from '../../../components/typography'

// api call 
import { callAPI } from '../../../helpers/network'


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
    
    function Tabs() {
        let [categories] = useState({
        Post: {
            icon: "",
            media: false
        },
        Foto: {
            icon: "",
            media: true
        },
        LiveStream: {
            icon: "",
            media: false
        },
        })
        const onSubmit = async (values) => {
            try {
                const payload = {
                    title: "",
                    postText: values.postText,
                    draft: false,
                    visibility: true
                    // postingan: {
                    // }

                };
                const formData = new FormData();
                
                formData.append('postingan', JSON.stringify(payload));


                const response = await callAPI({
                    url:'/postingan',
                    method: 'POST',
                    data: formData
                  });

                const {data} = response;
                
                console.log(data);
                // alert(values.postText)
            } catch (error) {
                console.log(error)
            }
        }

        const {
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
        } = useFormik({
            initialValues,
            validationSchema,
            onSubmit
        });
         
    
        return (
        <div className="p-2">
            <div className="w-full bg-darkmode-3 rounded-md">
            <Tab.Group>
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
                    <PostAdd className='w-5 h-5 mr-1'/>  <Caption> Foto/Video</Caption>
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
                {Object.values(categories).map((posts, idx) => (
                    <Tab.Panel
                    key={idx}
                    className={classNames(
                        '',
                        'text-white'
                    )}
                    >
                    <form action="" onSubmit={handleSubmit}>
                        <div className="relative bg-darkmode-2 rounded-b-lg text-white p-4">
                        <div className="absolute left-3 top-0">
                        </div>
                        <textarea type="text" name="postText" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Text' className='w-full h-full bg-transparent outline-none px-3 mb-5' />
                        <div className="absolute right-3 bottom-3">
                            <Caption disabled>0/200</Caption>
                        </div>
                        </div>
                        {
                        posts.media ? (
                            <div className="h-36 bg-darkmode-2 p-3 text-white mt-2 rounded-lg border border-dashed border-gray-500">
                            <div className="flex items-center justify-center w-full h-full">
                                <ImageAdd className="mr-1"/><Body1>Upload Foto/Video</Body1>
                            </div>
                            </div>
                        ):("")
                        }
                        <div className="mt-4 flex align-items-center justify-center">
                        <button name='submit' type='submit' className='bg-gradient-to-r from-[#384CFF] to-[#009EF8] w-1/2 mx-2 p-2 rounded-lg'>submit</button>
                        <button className='bg-darkmode-disabled w-1/2 mx-2 p-2 rounded-lg'>draft</button>
                        </div>
                    </form>
                    
                    </Tab.Panel>
                ))}
                </Tab.Panels>
            </Tab.Group>
            </div>
        </div>
        )
    }
    
    
    const Header = ({displayName ="unknown" , userName = "unknown"}) => {
        return (
            <div className="flex items-center justify-between px-5">
                <div className="flex items-center justify-between">
                    <Image src={"/images/profile.png"} width={42} height={42} alt="profile"/>
                    <div className="mx-3">
                        <div className="flex items-center">
                            <Subtitle1>{displayName}</Subtitle1>
                            <div className="w-1 h-1 rounded-full bg-darkmode-4 mx-3"></div>
                            <Subtitle2 disabled={true}>{userName}</Subtitle2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
    const Modal = ({status, close}) => {

        
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
                        <Tabs />
                        
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