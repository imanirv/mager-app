
import { ThumbUpIcon, AnnotationIcon } from '@heroicons/react/solid'


import { Body2 } from '../../../typography'


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

export default Count