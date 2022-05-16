import ReactPlayer from 'react-player/lazy'

const LiveStreaming = ({src}) => {
    return (
        <div className="mt-3 flex justify-center bg-black">
            <ReactPlayer url={src} controls={true} />
        </div>
    )
}

export default LiveStreaming