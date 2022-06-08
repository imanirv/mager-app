import Image from 'next/image'
import Link from "next/link"
import {SpinnerCircular} from 'spinners-react'
import {  Subtitle2, Body2 } from '../../../typography'
import SendIcon from '../../../icons/send'
import Card from "../../../card"

import { useFormik, getIn } from 'formik'
import * as Yup from 'yup'
import { usePostDispatcher } from '../../../../redux/reducers/posts'

const validationSchema = Yup.object({
  isiKomentar: Yup.string().max(300, 'maximal 300 karakter')
})

const Comment = ({idPost, commentar, toggle, limit=true}) => {
  
  const {posting:{loadingComment}, doComment} = usePostDispatcher()

  const onSubmit = (values) => {
      doComment(idPost, values)
  }
  
  const {handleChange, handleSubmit, handleBlur, errors, touched} = useFormik(
    {  
    initialValues: {isiKomentar:""},
    validationSchema,
    onSubmit
    })

    console.log(errors  )
  return (
    <div className="mt-3">
      {/* input comment  */}
      <div className={`flex w-full items-center ${toggle ? 'block' : 'hidden'}`}>
        <Image src={"/images/profile.png"} width={30} height={30} alt="profile"/>
        <div className="w-full px-2 relative">
          <form onSubmit={handleSubmit}>
            <input type="text" name='isiKomentar' className='bg-darkmode-3 text-white rounded-lg p-1 pl-4 pr-14 w-full ml-2' placeholder='Tulis Komentar' onChange={handleChange} onBlur={handleBlur} />
            {
                getIn(touched, "isiKomentar") && getIn(errors, "isiKomentar") && (
                    <div className="text-xs text-red-500 pb-3  mt-1 ml-3" >
                        {errors.isiKomentar}
                    </div>
                )
            }
            {errors.isiKomentar ? (<SendIcon className='absolute top-1 right-3 ' />): (
              <button name='submit' type='submit' className='absolute top-1 right-3 '>
                {loadingComment ? <SpinnerCircular size={20} color='#E4E6EB' secondaryColor="#242526" /> :  <SendIcon />}
              </button>
            )}
            
          </form>
        </div>
      </div>
      {/* comment section  */}
      {commentar.length >= 1 && <CommentItem comment={commentar} limit={limit}/>}
      {commentar.length > 1 && limit && <Link href={`/posts/${idPost}`}><a className='text-white ml-12 mt-3'>Lihat Komentar Lainnya</a></Link>}
              
    </div>
  )
}
  
const CommentItem = ({comment, limit}) => {   
return (
  <>
    {limit ? (
       <div className="flex w-full items-start my-3">
       <Image src={"/images/profile.png"} width={30} height={30} alt="profile"/>
       <div className="w-full bg-darkmode-3 ml-4 px-2 py-1 relative rounded-lg overflow-hidden">
         <Subtitle2>{comment[0].user.nama}</Subtitle2>
         <p className='block-ellipsis  overflow-hidden text-white'>{comment[0].isiKomentar}</p>
       </div>
     </div>
    ): (
      <>
        {
          comment.map((item, i) => (
          <div className="flex w-full items-start mt-3" key={i}>
            <Image src={"/images/profile.png"} width={30} height={30} alt="profile"/>
            <div className="w-full bg-darkmode-3 ml-4 px-2 py-1 relative rounded-lg overflow-hidden">
              <Subtitle2>{item.user.nama}</Subtitle2>
              <p className='text-ellipsis overflow-hidden text-white'>{item.isiKomentar} </p>
            </div>
          </div>

          ))
        }
      </>
    )}


  </>
)
}

  export default Comment