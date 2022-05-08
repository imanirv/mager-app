import Card from "../card"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingPost = () => {
    return (
        <div className='mb-3'>
        <Card>
            <div className="flex">
                <div className="inline">
                    <Skeleton circle width={50} height={50} baseColor="#3A3B3C" highlightColor="#242526" />
                </div>
                <div className="inline w-full ml-2">
                    <Skeleton height={20} width={200}  baseColor="#3A3B3C" highlightColor="#242526" />
                    <Skeleton height={20} width={400}  baseColor="#3A3B3C" highlightColor="#242526" />
                </div>
            </div>
            <Skeleton  height={200} baseColor="#3A3B3C" highlightColor="#242526" />
        </Card>
    </div>
    )
}

export default LoadingPost