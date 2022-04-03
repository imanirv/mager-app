
import { PhotographIcon, PlayIcon } from '@heroicons/react/solid'
import Image from 'next/image'

const CreatePostItem = ({children}) => (
    <div className={`bg-darkmode-3 hover:bg-darkmode-hover text-gray-200 h-10 w-12  mr-2 rounded-lg flex items-center justify-center`}>
        {children}
    </div>
)

const CreatePost = () => (
    <div className={`bg-darkmode-2 w-full rounded-2xl px-3 py-4 flex items-center justify-center`}>
    <CreatePostItem>
        <Image src={"/images/profile.png"} width={50} height={50} alt="profile"/>
    </CreatePostItem>
    <div className={`bg-darkmode-3 hover:bg-darkmode-hover text-gray-200 w-full h-10 rounded-lg mx-2 flex items-center px-4`}>Buat post</div>
    <CreatePostItem><PhotographIcon className={`bg-darkmode-3 w-4 h-4`} /></CreatePostItem>
    <CreatePostItem><PlayIcon className={`bg-darkmode-3 w-4 h-4`} /></CreatePostItem>
</div>
)


export default CreatePost