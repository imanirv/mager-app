export {default} from './libraries/PostItem'

// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import { usePostDispatcher } from '../../../redux/reducers/posts'

//  function Modal({status, close, postId}) {

//     const {posting:{detailPost}} = usePostDispatcher()

//   return (
//     <Transition appear show={status} as={Fragment}>
//         <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={close}
//         >
//         <div className="min-h-screen bg-darkmode-opacity text-center">
//             <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//             >
//             <Dialog.Overlay className="fixed inset-0" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//             className="inline-block h-screen align-middle"
//             aria-hidden="true"
//             >
//             &#8203;
//             </span>
//             <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//             >
//             <div className="inline-block w-full md:w-[700px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-darkmode-1 shadow-xl rounded-2xl">
//                 <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-white text-center p-1 mb-3"
//                 >
//                     ini tulisan dinamis
//                 </Dialog.Title>
//                 <hr />
//                 <p className='text-white text-center'>{detailPost.postText}</p>
//             </div>
//             </Transition.Child>
//         </div>
//         </Dialog>
//     </Transition>
//   )
// }



// const PostItem = ({item}) => {
//     let [isOpen, setIsOpen] = useState(false)
//     const {getPostDetail} = usePostDispatcher()

//     function closeModal() {
//         setIsOpen(false)
//     }

//     function openModal() {
//         setIsOpen(true)
//         getPostDetail(item.id)
//     }
//     return (
//         <>
//             <div className="bg-darkmode-2 text-white rounded-md p-5 flex justify-between">
//                 <p>
//                     {item.id}
//                 </p>
//                 <div className="">
//                         <button
//                         type="button"
//                         onClick={() => openModal()}
//                         className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//                         >
//                         Open dialog
//                         </button>
//                 </div>
//             </div>
//             <Modal status={isOpen} close={closeModal} postId={item.id} />
//         </>
//     )
// }

// export default PostItem