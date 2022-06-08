import AuthProvider from "../../providers/auth/authProvider"
import MainLayout from "../../components/layout/mainLayout"
import CommunityCard from "../../components/posts/CommunityCard"
import Card from "../../components/card"
import Button from "../../components/button"
import { Body1, Header3, Subtitle1, Subtitle2 } from "../../components/typography"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import ImageAdd from "../../components/icons/image-add"
import {Input, SelectInput} from "../../components/input"

import { useFormik, getIn } from "formik"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import {useRouter} from "next/router"
import { useUserDispatcher } from "../../redux/reducers/user"



const validationSchema = Yup.object({
    nama : Yup.string().max(15, 'Maximal 15 karakter'),

    biodata : Yup.string().max(300, 'Maximal 300 Karakter'),
    lokasi: Yup.object()
})


const EditUserContainer = () => {
    const [lokasi, setLokasi] = useState([])
    const [preview, setPreview] = useState()
    const [initialValues, setInitialValues] = useState({
        nama: "",
        username: "",
        lokasi: "",
        biodata: "",
        fotoProfile: ""
    })
    const {user: {detailUser, loadingEdit}, getDetailUser, updateUser} = useUserDispatcher()
    const router = useRouter()
    const {idUser} = router.query
    const onSubmit = (values) => {
        updateUser(values, idUser)
    }
    
    useEffect(() => {
        provinsi()
        getDetailUser(idUser)
       
    }, [idUser])
    
    useEffect(() => {
        if (detailUser && detailUser.nama) {
            setInitialValues({
                nama: detailUser.nama,
                username: detailUser.username,
                lokasi: detailUser.lokasi,
                biodata: detailUser.biodata,
                fotoProfile: detailUser.fotoProfile
            })
        }
        if (detailUser.fotoProfile) {
            setPreview(detailUser.fotoProfile)
        }
    }, [detailUser])
    
    const {
        handleSubmit,
        handleBlur,
        handleChange, 
        setFieldValue,
        errors,
        touched
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize : true
    })

    const provinsi = async () => {
        try {
            const response = await axios({
                url:'https://api.binderbyte.com/wilayah/provinsi?api_key=f62fe7a740ced461b9d86a007b9f54cdb93fd55b2226e88f4add8f55230e37ca',
                method:'get'
            })
            setLokasi(response.data.value)
        } catch (error) {
            console.log(error)
        }
    }

  
    const handleChangeFile = (e) => {
        const file = e.target.files
        if (file) {
            setPreview(URL.createObjectURL(file[0]))
            setFieldValue('files', file[0])
        }
    }
    console.log(errors)
    return (
        <AuthProvider>
            <MainLayout>
                <div className="pt-24 px-3 lg:px-40 flex">
                    <div className=" w-full md:w-8/12 mr-3">
                        <Card>
                            <div className="flex items-center py-5">
                                <ArrowLeftIcon className="w-6 h-6 text-white mr-4 cursor-pointer" onClick={() => router.push(`/user/${idUser}`)} />
                                <Header3>Edit Profile</Header3>
                            </div>
                            <hr />
                            <div className="mt-4">
                            <form action="" onSubmit={handleSubmit} >
                                <div className="mt-2">
                                    <Input
                                        title="Nama"
                                        name="nama"
                                        value={detailUser.nama}
                                        id="nama"
                                        type="text"
                                        placeholder="Masukkan nama"
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                </div>
                                {
                                        getIn(touched, "nama") && getIn(errors, "nama") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.nama}
                                            </div>
                                        )
                                    }
                                <div className="mt-2">
                                    <label>
                                        <span className="block text-white">Bio</span>
                                        <textarea type="text" name="biodata" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Masukkan biodata' defaultValue={detailUser.biodata} className='w-full h-full bg-darkmode-3 text-white outline-none p-3 rounded-md' />
                                    </label>
                                </div>
                                {
                                        getIn(touched, "biodata") && getIn(errors, "biodata") && (
                                            <div className="text-xs text-red-500 pb-3" >
                                                {errors.biodata}
                                            </div>
                                        )
                                    }
                                <div className="mt-2">
                                    <span className="block text-white mb-2">Lokasi</span>
                                    <SelectInput 
                                        data={lokasi} 
                                        placeholder={'Pilih Lokasi'}
                                        onChange={(val) => { setFieldValue('lokasi',val) }}
                                        title="lokasi"
                                        name="lokasi"
                                        id="lokasi"
                                        defaultVal = {detailUser.lokasi}
                                        />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="file" >
                                        <span className="block text-white mb-2">Foto Profile</span>
                                        {!preview ? (
                                        <div className="w-60 h-60 bg-darkmode-3 border-dashed border border-darkmode-4 rounded-md flex-col flex items-center justify-center">
                                            <div className="">
                                                <div className="flex items-center">
                                                    <ImageAdd />
                                                    <Subtitle1 >Upload Foto</Subtitle1>
                                                </div>    
                                                <Subtitle2 disabled>Maks Size Foto = 5 MB</Subtitle2>
                                            </div>
                                        </div>  

                                        ): (
                                            <div className="w-60 h-60 relative">
                                                <Image src={preview} alt="profile-pict" layout="fill" className="object-cover"/>
                                            </div>
                                        )}
                                        <div className="w-60">
                                            <div className="w-full p-2 bg-darkmode-3 text-white rounded-md mt-2 text-center" >Pilih Foto</div>
                                        </div>  
                                        <input type="file" name="file" onChange={handleChangeFile} id="file" className="hidden" />
                                    </label>
                                </div>
                                <div className="mt-2 mb-5">
                                    {
                                        !errors.nama && !errors.biodata  ? (
                                            <Button type="submit" caption={loadingEdit ? "Mengirim" : "Perbarui"} />
                                        ):(
                                            <button disabled className="w-full p-2 bg-darkmode-disabled text-white font-semibold rounded-md mt-2">Buat</button>
                                        )
                                    }
                                </div>

                            </form>
                            </div>

                        </Card>
                    </div>
                    <div className="hidden md:block w-4/12  bg-darkmode-2 rounded-2xl">
                        <CommunityCard />
                    </div>
                </div>
            </MainLayout>
        </AuthProvider>
    )
}

export default EditUserContainer