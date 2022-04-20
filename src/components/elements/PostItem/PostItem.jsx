/* eslint-disable @next/next/no-img-element */
import { Fragment,  useState, useEffect } from 'react'
import {useRouter} from 'next/router'



import { HeaderKomunitas, HeaderUser } from './header'
import LiveStreaming from './livestream'
import Comment from './comment'
import ActionButtons from './action'
import Content from './content'
import Count from './count'
import Media from './media'



import { callAPI } from "../../../helpers/network";
import { useFormik } from 'formik'
import * as Yup from 'yup'


const validationSchema = Yup.object({
  isiKomentar: Yup.string().required(),
});

const initialValues = {
  isiKomentar: "",
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
        posterType="user",
        postType="",
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
              posterType === "user" ? (
                  <HeaderUser 
                    userName={userName} 
                    displayName={displayName} 
                    date={date} 
                    idPost={id} 
                    postType={postType} 
                    text={text}
                    linkLiveStream={liveStream}
                    media={media}
                  />
                ):(
                  <HeaderKomunitas 
                    userName={userName} 
                    communityName={communityName} 
                    date={date} 
                    idPost={id} 
                    postType={postType}
                    text={text}
                    linkLiveStream={liveStream}
                    media={media} />
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