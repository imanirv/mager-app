import { useState, useEffect } from 'react'

import { ThumbUpIcon as ThumbUpOutline, AnnotationIcon as AnnotationOutline, LinkIcon } from '@heroicons/react/outline'
import { Body1 } from '../../../typography'
import { ThumbUpIcon } from '@heroicons/react/solid'
import {getUser} from "../../../../helpers/auth"

import { usePostDispatcher } from '../../../../redux/reducers/posts'
const ActionButtons = ({id, setToggle, toggle, likedList}) => {
    const {doLike} = usePostDispatcher()
    const userData = getUser();
    const [liked, setLiked] = useState(false)
    
    const handleLike = () => {
      doLike(id)
    }

    useEffect(() => {
       const isLike = likedList.filter(item => item.user.id === userData.id)
        if (isLike.length >= 1) {
          setLiked(true)
        }
    })
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

  export default ActionButtons