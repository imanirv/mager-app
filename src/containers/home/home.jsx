import { UserIcon, PhotographIcon, PlayIcon } from '@heroicons/react/solid'
import styles from "../../styles/Home.module.css"


const CreatePostItem = ({children}) => (
    <div className={`${styles.lightGrey} text-gray-200 h-10 w-12  mr-2 rounded-lg flex items-center justify-center`}>
        {children}
    </div>
)

const HomeContainer = () =>{
    return(
        <div className='bg-black w-screen h-screen'>
        {/* nanti navbar taro sini  */}
        <div className="pt-20 px-40">
            <div className="flex items-start justify-center">
                <div className="w-3/4 mr-3">
                    <div className={`${styles.grey} w-full rounded-2xl px-3 py-4 flex items-center justify-center`}>
                        <CreatePostItem><UserIcon className={`${styles.lightGrey} w-4 h-4`} /></CreatePostItem>
                        <div className={`${styles.lightGrey} text-gray-200 w-full h-10 rounded-lg mx-2 flex items-center px-4`}>Buat post</div>
                        <CreatePostItem><PhotographIcon className={`${styles.lightGrey} w-4 h-4`} /></CreatePostItem>
                        <CreatePostItem><PlayIcon className={`${styles.lightGrey} w-4 h-4`} /></CreatePostItem>
                    </div>
                </div>
                <div className="w-1/4 h-40 bg-gray-500 rounded-2xl">
                    {/* card komunitas taro sini */}
                </div>
               
            </div>
        </div>
        </div>
    )
}

export default HomeContainer