import { useEffect, useState } from "react";


import MainLayout from "../../components/layout"


const Component = ({tipe}) => {
    if (tipe === "teks") {
        return <h1 className="text-white">teks post</h1>
    }else if (tipe === "livestream"){
        return <h1 className="text-white">livestream post</h1>
    }else{
        return <h1 className="text-white">media post</h1>

    }
}


const EditPostContainer = ({data = {}}) => {
   console.log(data)
    return (
        <MainLayout>
            <div className="pt-20">
                <Component  tipe={data.tipePost}/>
            </div>
        </MainLayout>
    )
}

export default EditPostContainer

