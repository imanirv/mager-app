import { useState } from 'react'
import {useRouter} from 'next/router'

import { ThumbUpIcon as ThumbUpOutline, AnnotationIcon as AnnotationOutline, LinkIcon } from '@heroicons/react/outline'
import { Body1 } from '../../typography'
import { ThumbUpIcon } from '@heroicons/react/solid'


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

  export default ActionButtons