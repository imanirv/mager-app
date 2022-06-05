import Card from "../card"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingItem = ({count = 1}) => {
    return(  
        <Skeleton height={30} width={200} count={count}  baseColor="#3A3B3C" highlightColor="#242526" />
    )
}

export default LoadingItem