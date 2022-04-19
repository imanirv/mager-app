/* eslint-disable @next/next/no-img-element */
import { Fragment,  useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { Menu, Transition } from '@headlessui/react'

import { ThumbUpIcon, AnnotationIcon, ChevronDownIcon, PencilIcon, FlagIcon, TrashIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpOutline, AnnotationIcon as AnnotationOutline, LinkIcon } from '@heroicons/react/outline'
import SendIcon from '../icons/send'
import { Subtitle1, Subtitle2, Caption, Body1, Body2 } from '../typography'
import Card from "../card"

import { callAPI } from "../../helpers/network";
import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'


const validationSchema = Yup.object({
  isiKomentar: Yup.string().required(),
});

const initialValues = {
  isiKomentar: "",
}

function Dropdown({idPost}) {
  const {push} = useRouter()
  return (
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
                    onClick={() => push(`/posts/edit/${idPost}`)}
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

const HeaderUser = ({displayName , userName , date, idPost}) => {
    return (
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
            <Dropdown idPost={idPost} />
        </div>
    )
}
const HeaderKomunitas = ({communityName , userName , date, idPost}) => {
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
            <Dropdown idPost={idPost} />
        </div>
    )
}

const Content = ({text}) => (
    <div className="mt-3 overflow-hidden">
        <Body1>{text} </Body1>
    </div>
)

const Media = ({src, type}) => {
    if (type === "image") {
        return(
            <div className="mt-3 flex justify-center">
                <img src={src} alt={src} className='w-full rounded-2xl max-h-[640px]' />
            </div>
        )
    } else {
        return (
            <div className="mt-3 flex justify-center bg-black">
                <ReactPlayer url={src} controls={true} />
            </div>
        )
    }
}
const LiveStreaming = ({src}) => {
    return (
        <div className="mt-3 flex justify-center bg-black">
            <ReactPlayer url={src} controls={true} />
        </div>
    )
}

const Count = ({likeCount = 0, commentCount = 0}) =>{
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


const ActionButtons = ({id, setToggle, toggle}) => {
  const {push} = useRouter();
  const [liked, setLiked] = useState(false)
  const handleLike = async () => {
    try {
      const response = await callAPI({
        url: `/like?idPostingan=${id}&idUser=2`,
        method: 'post'
      })
      if (response) {
        setLiked(!liked) 
        window.location.reload()
      }else{
        console.log('gabisa')
      }
    } catch (error) {
      console.log(error)
      
    }
  }
    return (
        <div className="my-1 flex justify-between items-center md:px-14">
            <button className='flex items-center  py-3 md:px-6 rounded-md hover:bg-darkmode-hover' onClick={handleLike}>
              {
                !liked ? (
                  <ThumbUpOutline className='text-white w-5 h-5 mr-3'/>
                  ): (
                  <ThumbUpIcon className='text-white w-5 h-5 mr-3'/>
                )
              }
                <Body1 disabled={true}>Suka</Body1>
            </button>
            <button className='flex items-center  py-3 px-6 rounded-md hover:bg-darkmode-hover' onClick={() => setToggle(!toggle) }>
                <AnnotationOutline className='text-white w-5 h-5 mr-3'/>
                <Body1 disabled={true}>Komentar</Body1>
            </button>
            <button className='flex items-center  py-3 px-2 rounded-md hover:bg-darkmode-hover'>
                <LinkIcon className='text-white w-5 h-5 mr-3'/>
                <Body1 disabled>Salin Link</Body1>
            </button>
        </div>
    )
}

const CommentItem = ({comment}) => {   
  return (
    <>
    {
      comment.map((item, i) => (
      <div className="flex w-full items-start mt-3" key={i}>
        <Image src={"/images/profile.png"} width={30} height={30} alt="profile"/>
        <div className="w-full bg-darkmode-3 ml-4 px-2 py-1 relative rounded-lg overflow-hidden">
          <Subtitle2>{item.user.nama}</Subtitle2>
          <p className='text-ellipsis overflow-hidden text-white'>{item.isiKomentar}</p>
        </div>
      </div>

      ))
    }
    </>
  )
}
const Comment = ({handleSubmit, handleChange, commentCount, commentar, toggle}) => {
  
  return (
    <div className="mt-3">
      {/* input comment  */}
      <div className={`flex w-full items-center ${toggle ? 'block' : 'hidden'}`}>
        <Image src={"/images/profile.png"} width={30} height={30} alt="profile"/>
        <div className="w-full px-2 relative">
          <form onSubmit={handleSubmit}>
            <input type="text" name='isiKomentar' className='bg-darkmode-3 text-white rounded-lg p-1 pl-4 w-full ml-2' placeholder='Tulis Komentar' onChange={handleChange} />
            <button name='submit' type='submit' className='absolute top-1 right-3 '><SendIcon /></button>
          </form>
        </div>
      </div>
      {/* comment section  */}
      {
        commentCount > 0 ? (
          <CommentItem comment={commentar}/>
        ):(
          <Card>
            <div className="w-full h-10 flex items-center ">
              <Body2 disabled>tidak ada komentar</Body2>
            </div>
          </Card>
        )
      }
    </div>
  )
}

const PostItem = (
    {
        id=0,
        displayName = "unknown", 
        userName = "unknown", 
        date = "unknown", 
        text= "empty", 
        media = "",
        mediaType = "",
        liveStream = "",
        likeCount = 0, 
        commentCount = 0,
        limitComment = false,
        commentar = [],
        postType="user",
        communityName=""
      }) => {
          const {push} = useRouter();
          const [comment, setComment] = useState([])
          const [toggle, setToggle] = useState(false)
          const getKomentar = async (id) => {
            try {
              const response = await callAPI({
                url: `/komentar?idPostingan=${id}`,
                method: 'get'
              })

              if (limitComment) {
                setComment(
                  response.data[0]
                ) 
              }else{
                setComment(
                  response.data
                )
              }
              // console.log(response)
            } catch (error) {
              
            }
          }

          const onSubmit = async (values) => {
              // console.log(values);
              const payload = values
              const response = await callAPI({
                url:`/komentar?idUser=2&idPostingan=${id}`,
                method:'post',
                data: payload
              })
              // console.log(response)
              if (response.status == 200) {
                window.location.reload()
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
        
          

          useEffect(()=> {
            getKomentar(id)
          }, [])

    return(
        <div className="bg-darkmode-2 w-full rounded-2xl p-3 mb-3 overflow-hidden">
            {/* header  */}
            {
              postType === "user" ? (
                  <HeaderUser userName={userName} displayName={displayName} date={date} idPost={id} />
                ):(
                  <HeaderKomunitas userName={userName} communityName={communityName} date={date} idPost={id} />
              )
            }
            {/* konten  */}
           <Content text={text}/>
            {/* <div className="" onClick={() => push(`/posts/${id}`)}></div> */}
            {/* media  */}
            {media ? <Media src={media} type={mediaType} /> : ""}   
            {liveStream ? <LiveStreaming src={liveStream}/> : ""}   

            {/* jumlah like & comment  */}
            <Count likeCount={likeCount} commentCount={commentCount} />
            {/* action post  */}
            <div className="bg-darkmode-hover w-full h-px"></div>
              <ActionButtons id={id} setToggle={setToggle} toggle={toggle}/>
            <div className="bg-darkmode-hover w-full h-px"></div>
            {/* comment  */}
            <Comment 
              handleSubmit={handleSubmit} 
              handleChange={handleChange} 
              commentCount={commentCount}
              commentar={commentar}  
              toggle={toggle}
            />
            
        </div>
    )
}

export default PostItem