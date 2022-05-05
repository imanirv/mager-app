import { Header3,Header4, Button } from "../../components/typography"
import Image from "next/image"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
    categories: Yup.array().min(1)
})

const initialValues = {
    categories: []
}


const Item = ({id, name, title, img, active, handleChange}) => {
    return (
        <label htmlFor={id}>
            <input type="checkbox" value={id} id={id} name={name} className="hidden" onChange={handleChange}/>
            <div className={`hover:border-4 hover:border-primary ${active? 'border-4 border-primary': ''} rounded-lg w-64 h-64 m-3 flex-none relative transition-all`}>
                <Image className="rounded-lg" src={img} layout="fill" alt="Battle Royale" />
                <div className="bg-darkmode-opacity rounded-b-lg absolute w-full h-2/6 p-4 bottom-0 flex items-center justify-center text-center">
                    <Header4>{title}</Header4>
                </div>
            </div>
        </label>
    )
}

const FavoriteGamesContainer = () => {
    const {push} = useRouter()
    const onSubmit = (values) => {
        console.log(values)
        push('/auth/login')
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
       <div className="w-screen h-screen bg-darkmode-1 py-6 px-40 overflow-auto scrollbar-hide">
           <div className="bg-darkmode-2 w-full  rounded-2xl">
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex justify-between px-6 py-3">
                        <Header3>Pilih 1 atau lebih kategori game kesukaanmu</Header3>
                        {
                            values.categories.length >= 1 ? (
                                <button type="submit" className="bg-blue-500 py-2 px-11 rounded-xl"><Button>Pilih {values.categories.length}</Button></button>
                            ) : (
                                <button className="bg-darkmode-disabled py-2 px-11 rounded-xl"><Button>Pilih {values.categories.length}</Button></button>
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center flex-wrap mt-10 mx-6 ">
                            <Item
                                id="battle-royale"
                                name="categories"
                                title="Battle Royale"
                                img="/images/categories/battle-royale.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('battle-royale') ? true : false}
                            />
                            <Item
                                id="moba"
                                name="categories"
                                title="Multiplayer Online Battle Arena (MOBA)"
                                img="/images/categories/moba.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('moba') ? true : false}
                            />
                            <Item
                                id="fps"
                                name="categories"
                                title="First Person Shooter (FPS)"
                                img="/images/categories/fps.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('fps') ? true : false}
                            />
                            <Item
                                id="rts"
                                name="categories"
                                title="Real-Time Strategy (RTS)"
                                img="/images/categories/rts.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('rts') ? true : false}
                            />
                            <Item
                                id="simulator"
                                name="categories"
                                title="Transportation Simulation"
                                img="/images/categories/simulator.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('simulator') ? true : false}
                            />
                            <Item
                                id="casual"
                                name="categories"
                                title="Casual"
                                img="/images/categories/casual.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('casual') ? true : false}
                            />
                            <Item
                                id="fighting"
                                name="categories"
                                title="Fighting"
                                img="/images/categories/fighting.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('fighting') ? true : false}
                            />
                            <Item
                                id="life-simulator"
                                name="categories"
                                title="Life Simulation"
                                img="/images/categories/life-simulator.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('life-simulator') ? true : false}
                            />
                            <Item
                                id="sports"
                                name="categories"
                                title="Sports"
                                img="/images/categories/sports.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('sports') ? true : false}
                            />
                            <Item
                                id="rpg"
                                name="categories"
                                title="Role Playing Game (RPG)"
                                img="/images/categories/rpg.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('rpg') ? true : false}
                            />
                            <Item
                                id="adventure"
                                name="categories"
                                title="Adventure"
                                img="/images/categories/adventure.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('adventure') ? true : false}
                            />
                            <Item
                                id="racing"
                                name="categories"
                                title="Racing"
                                img="/images/categories/racing.jpg"
                                handleChange={handleChange}
                                active={values.categories.includes('racing') ? true : false}
                            />
                    </div>
                </form>
           </div>
       </div>
    )
}

export default FavoriteGamesContainer   