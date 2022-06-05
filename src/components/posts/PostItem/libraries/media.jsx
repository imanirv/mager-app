import ReactPlayer from 'react-player/lazy'

const Media = ({src, type}) => {
    if (type === "image") {
        return(
            <div className="mt-3 flex justify-center bg-black rounded-2xl ">
                <img src={src} alt="post images" className='h-full max-h-[640px]  rounded-2xl '/>
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

export default Media