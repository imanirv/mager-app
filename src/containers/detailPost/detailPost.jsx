

import MainLayout from "../../components/layout/"
import CommunityCard from "../../components/elements/CommunityCard"
import PostItem from "../../components/elements/PostItem"
import AuthProvider from "../../providers/auth"

import { LoadingPost, LoadingItem } from "../../components/loading"

const DetailPostContainer = ({ data={}, isLoading }) => {
    
    return (
        <AuthProvider>
            <MainLayout>
                <div className="pt-20 px-3 lg:px-40">
                    <div className="flex items-start justify-center">
                        <div className=" w-full md:w-8/12 mr-3">
                        {
                            isLoading ? (
                                <>
                                    <LoadingPost />
                                    <LoadingItem />
                                </>
                            ):(
                                <PostItem
                                 item={data}
                                 limit={false}
                                />
                            )
                        }
                        </div>
                        <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                            {/* card komunitas taro sini */}
                            <CommunityCard />
                        </div>
                    
                    </div>
                </div>
            </MainLayout>
        </AuthProvider>
    )
}

export default DetailPostContainer