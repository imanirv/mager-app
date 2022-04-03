/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'

import { ThumbUpIcon, AnnotationIcon } from '@heroicons/react/solid'
import { ThumbUpIcon as ThumbUpOutline, AnnotationIcon as AnnotationOutline, LinkIcon } from '@heroicons/react/outline'
import { Subtitle1, Subtitle2, Caption, Body1, Body2 } from '../../../components/typography'



const Media = ({src, type}) => {
    if (type === "image") {
        return(
            <img src={src} alt="post" className='w-full rounded-2xl max-h-[640px]' />
        )
    } else {
        return (
            <ReactPlayer url={src} playing controls={true} />
        )
    }
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
                <div className="flex w-auto h-3 cursor-pointer">
                    <div className="w-1 h-1 rounded-full bg-darkmode-disabled float-right"></div>
                    <div className="w-1 h-1 rounded-full mx-1 bg-darkmode-disabled float-right"></div>
                    <div className="w-1 h-1 rounded-full bg-darkmode-disabled float-right"></div>

                </div>
            </div>
            {/* konten  */}
            <div className="mt-3">
                <Body1>{text} </Body1>
            </div>
            {/* media  */}
            <div className="mt-3 flex justify-center bg-black">
                {media ? <Media src={media} type={mediaType} /> : ""}   
            </div>
            {/* jumlah like & comment  */}
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
            {/* action post  */}
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
        </div>
    )
}

export default PostItem