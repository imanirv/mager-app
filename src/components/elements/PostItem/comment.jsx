import Image from 'next/image'
import {  Subtitle2, Body2 } from '../../typography'
import SendIcon from '../../icons/send'
import Card from "../../card"



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
  

  export default Comment