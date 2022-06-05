import { Header3, ButtonText } from "../../components/typography"
import Image from "next/image"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuthDispatcher } from "../../redux/reducers/auth"

const validationSchema = Yup.object({
    categories: Yup.array().min(1)
})

const initialValues = {
    categories: []
}


const Item = ({id, name, title, img, active, handleChange}) => {
    return (
        <div className="w-1/2 md:w-1/4 p-2">
            <label htmlFor={id}>
                <input type="checkbox" value={id} id={id} name={name} className="hidden" onChange={handleChange}/>
                <div className={`hover:border-4 hover:border-primary ${active? 'border-4 border-primary': ''} rounded-lg w-full h-full relative`}>
                    <Image src={img} width={100} height={100} layout="responsive" alt="" className="object-cover" />
                    <div className="bg-darkmode-opacity rounded-b-lg absolute w-full h-2/6 p-4 bottom-0 flex items-center justify-center text-center">
                        <p className="text-white text-xs font-bold lg:text-base">{title}</p>
                    </div>
                </div>
            </label>
        </div>
    )
}

const FavoriteGamesContainer = () => {
    const router = useRouter()
    const {id} = router.query
    const {doAddGamePref} = useAuthDispatcher()

    const onSubmit = (values) => {
        for (let i = 0; i < values.categories.length; i++) {
            // console.log(values.categories[i])
            doAddGamePref(id, values.categories[i])   
        }
        // console.log(values)
        // router.push('/auth/login')
    }

    const {
        handleSubmit,
        handleChange,
        errors,
        values
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    return(
       <div className="w-screen h-screen bg-darkmode-1 py-6 px-5 lg:px-40 overflow-auto scrollbar-hide">
           <div className="bg-darkmode-2 w-full  rounded-2xl">
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-6 py-3">
                        <Header3>Pilih 1 atau lebih kategori game kesukaanmu</Header3>
                        {
                            values.categories.length >= 1 ? (
                                <button type="submit" className="bg-blue-500 py-2 px-11 rounded-xl"><ButtonText>Pilih {values.categories.length}</ButtonText></button>
                            ) : (
                                <button className="bg-darkmode-disabled py-2 px-11 rounded-xl"><ButtonText>Pilih {values.categories.length}</ButtonText></button>
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center flex-wrap mt-10 ">
                           
                            <Item
                                id="Battle Royale"
                                name="categories"
                                title="Battle Royale"
                                img="/images/categories/battle-royale.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Battle Royale') ? true : false}
                            />
                            <Item
                                id="MOBA"
                                name="categories"
                                title="Multiplayer Online Battle Arena (MOBA)"
                                img="/images/categories/moba.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('MOBA') ? true : false}
                            />
                            <Item
                                id="FPS"
                                name="categories"
                                title="First Person Shooter (FPS)"
                                img="/images/categories/fps.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('FPS') ? true : false}
                            />
                            <Item
                                id="RTS"
                                name="categories"
                                title="Real-Time Strategy (RTS)"
                                img="/images/categories/rts.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('RTS') ? true : false}
                            />
                            <Item
                                id="Vehicle Simulator"
                                name="categories"
                                title="Transportation Simulation"
                                img="/images/categories/simulator.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Vehicle Simulator') ? true : false}
                            />
                            <Item
                                id="Casual"
                                name="categories"
                                title="Casual"
                                img="/images/categories/casual.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Casual') ? true : false}
                            />
                            <Item
                                id="Fighting Game"
                                name="categories"
                                title="Fighting"
                                img="/images/categories/fighting.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Fighting Game') ? true : false}
                            />
                            <Item
                                id="Live Simulation"
                                name="categories"
                                title="Life Simulation"
                                img="/images/categories/life-simulator.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Live Simulation') ? true : false}
                            />
                            <Item
                                id="Sport"
                                name="categories"
                                title="Sports"
                                img="/images/categories/sports.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Sport') ? true : false}
                            />
                            <Item
                                id="RPG"
                                name="categories"
                                title="Role Playing Game (RPG)"
                                img="/images/categories/rpg.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('RPG') ? true : false}
                            />
                            <Item
                                id="Adventure"
                                name="categories"
                                title="Adventure"
                                img="/images/categories/adventure.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Adventure') ? true : false}
                            />
                            <Item
                                id="Racing"
                                name="categories"
                                title="Racing"
                                img="/images/categories/racing.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('Racing') ? true : false}
                            />
                    </div>
                </form>
           </div>
       </div>
    )
}

export default FavoriteGamesContainer   