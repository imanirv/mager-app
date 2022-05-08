import Card from "../card"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingItem = () => {
    return(
        <Card>
            <Skeleton height={30} count={5}  baseColor="#3A3B3C" highlightColor="#242526" />
        </Card>
    )
}

export default LoadingItem