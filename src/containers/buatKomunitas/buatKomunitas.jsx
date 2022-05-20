import { useState, useEffect  } from "react"
import {  ArrowLeftIcon } from '@heroicons/react/solid'
import { Header4, Body2, Header3, Subtitle1, Subtitle2 } from '../../components/typography'

import AuthProvider from "../../providers/auth"
import MainLayout from "../../components/layout"
import CommunityCard from "../../components/posts/CommunityCard"

import Card from "../../components/card"
import {Input, SelectInput} from "../../components/input"


import { useFormik, getIn } from "formik"
import * as Yup from "yup"

import ImageAdd from "../../components/icons/image-add"

import axios from "axios"





const game = [
    {id: 1, name: 'adventure'},
    {id: 2, name: 'battle royale'},
    {id: 3, name: 'casual'},
    {id: 4, name: 'fighting'},
    {id: 5, name: 'fps'},
    {id: 6, name: 'life simulator'},
    {id: 7, name: 'moba'},
    {id: 8, name: 'racing'},
    {id: 9, name: 'rpg'},
    {id: 10, name: 'rts'},
    {id: 11, name: 'simulator'},
    {id: 12, name: 'sports'},
]

const BuatKomunitasContainer = () => {
    const [lokasi, setLokasi] = useState([])


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

    const onSubmit =(values) => {
        console.log(values)
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
    } = useFormik({
        initialValues: {
            nama: "",
            kategori: "moba",
            deskripsi: "",
            lokasi: "jakarta",
        },
        onSubmit
    })

    useEffect(() =>{
        provinsi()
    }, [])
    
    return(
      <AuthProvider>
        <MainLayout>
             <div className=" px-3 lg:px-40 pt-20">
                <div className="flex items-start justify-center">
                    <div className=" w-full md:w-8/12 mr-3 mb-5">
                      <Card>
                          <div className="flex items-center">
                                <ArrowLeftIcon className="text-white w-6 h-6 mx-4" />
                                <Header3>Buat Komunitas</Header3>
                          </div>
                            <hr className="text-white my-4" />
                        <form action="" onSubmit={handleSubmit} >
                            <div className="mt-2">
                                <Input
                                    title="Nama Komunitas"
                                    name="nama"
                                    id="namaKomunitas"
                                    type="text"
                                    placeholder="Masukkan nama komunitas"
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                            </div>
                            <div className="mt-2">
                                <span className="block text-white mb-2">Kategori Game</span>
                                <SelectInput 
                                    data={game} 
                                    placeholder={'Pilih kategori'} 
                                    onChange={handleChange}
                                    title="Nama Komunitas"
                                    name="kategori"
                                    id="kategoriGame"
                                />
                            </div>
                            <div className="mt-2">
                                <label>
                                    <span className="block text-white">Deskripsi Komunitas</span>
                                    <textarea type="text" name="deskripsiKomunitas" onChange={handleChange} onBlur={handleBlur} id="" placeholder='Masukkan deskripsi komunitas' className='w-full h-full bg-darkmode-3 text-white outline-none p-3 rounded-md' />
                                </label>
                            </div>
                            <div className="mt-2">
                                <span className="block text-white mb-2">Lokasi</span>
                                <SelectInput 
                                    data={lokasi} 
                                    placeholder={'Pilih Lokasi'}
                                    onChange={handleChange}
                                    title="lokasi"
                                    name="lokasi"
                                    id="lokasi  "
                                    />
                            </div>
                            <div className="mt-2">
                                <span className="block text-white mb-2">Deskripsi Komunitas</span>
                                <div className="w-60 h-60 bg-darkmode-3 border-dashed border border-darkmode-4 rounded-md flex-col flex items-center justify-center">
                                    <div className="">
                                        <div className="flex items-center">
                                            <ImageAdd />
                                            <Subtitle1 >Upload Foto</Subtitle1>
                                        </div>    
                                        <Subtitle2 disabled>Maks Size Foto = 5 MB</Subtitle2>
                                    </div>
                                </div>  
                                <div className="w-60">
                                    <button className="w-full p-2 bg-darkmode-3 text-white rounded-md mt-2">Pilih Foto</button>
                                </div>  
                            </div>
                            <div className="mt-2 mb-5">
                                <button className="w-full p-2 bg-darkmode-disabled text-white font-semibold rounded-md mt-2">Buat</button>
                            </div>

                        </form>
                      </Card>
                    </div>
                    <div className="hidden md:block w-4/12   rounded-2xl">
                        
                        <CommunityCard />
                    </div>
                
                </div>
            </div>
        </MainLayout>
      </AuthProvider>
    )
}

export default BuatKomunitasContainer