import ReactPlayer from 'react-player/lazy'

const Media = ({src, type}) => {
    if (type === "image") {
        return(
            <div className="mt-3 flex justify-center">
                <img src={src} alt={src} className='w-full rounded-2xl max-h-[640px]'/>
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