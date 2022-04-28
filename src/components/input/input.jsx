import { getIn } from "formik"


const Input = ({title, name, id, type, placeholder, onChange, onBlur}) => {
    return (
        <>
            <label htmlFor={name}>
                <span className="block mb-2 text-white">{title}</span>
                <input className="w-full bg-darkmode-3 text-white p-4 h-14 rounded-md mb-1 focus:outline-primary" type={type} name={name} id={id} autoComplete="off" placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
            </label>
        </>
    )

}

export default Input