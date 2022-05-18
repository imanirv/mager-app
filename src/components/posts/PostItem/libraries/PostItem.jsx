import { useState } from 'react'
import { HeaderKomunitas, HeaderUser } from './header'
import Content from './content'
import Media from "./media"
import moment from 'moment'
import Count from "./count"
import Comment from "./comment"
import ActionButtons from './action'
import Card from "../../../card"


const PostItem = ({item, limit=true}) => {
  const [toggle, setToggle] = useState(false)
  const {
    id,
    createdBy,
    postedIn,
    created_date,
    postText,
    tipePost,
    files,
    linkLivestream,
    jumlahLike,
    jumlahKomentar,
    likedBy,
    komentarBy
  } = item
  return (
    <Card>
      {/* header  */}
      {postedIn ? (
        <HeaderKomunitas dataUser={createdBy} dataKomunitas={postedIn} date={moment(created_date).format('MMMM Do')}  />
      ): (<HeaderUser data={createdBy} date={moment(created_date).format('MMMM Do')} idPost={id} />)}
      {/* caption */}
      <Content text={postText}/>
      {/* media  */}
      {tipePost === 'foto' && (<Media src={files} type={'image'} />)}
      {/* {tipePost === 'livestream' && (<Media src={linkLivestream} type={'livestream'} />)} */}
      {linkLivestream && (<Media src={linkLivestream} type={'livestream'} />)}
      {/* count  */}
      <Count likeCount={jumlahLike} commentCount={jumlahKomentar}/>
      {/* actions  */}
      <div className="bg-darkmode-hover w-full h-px mt-2"></div>
        <ActionButtons id={id} setToggle={setToggle} toggle={toggle} likedList={likedBy} />
      <div className="bg-darkmode-hover w-full h-px"></div>
      {/* comment  */}
      <Comment commentar={komentarBy} toggle={toggle} idPost={id} limit={limit}/>
    </Card>
  )
}

export default PostItem