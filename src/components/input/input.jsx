import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"


const Input = ({title, name, id, type, placeholder, onChange, onBlur, error, touched, value}) => {
    const [hide, setHide] = useState(true);

    return (
        <>
            <label htmlFor={name}>
                <div className="relative">
                    <span className="block mb-2 text-white">{title}</span>
                    <input 
                        className={`w-full bg-darkmode-3 text-white p-4 h-14 rounded-md mb-1 focus:outline-primary ${error && touched ? 'border border-red-500': ''}`} 
                        type={!hide ? 'text': type} 
                        name={name} 
                        id={id} 
                        autoComplete="off" 
                        defaultValue={value}
                        placeholder={placeholder} 
                        onChange={onChange} 
                        onBlur={onBlur} />
                    {
                        type == "password" ? (
                            <span className="text-white absolute top-1/2 right-4" onClick={() => setHide(!hide)}>
                                {
                                    hide ? (
                                        <EyeOffIcon className="w-6 h-6 text-darkmode-disabled" />
                                        ):(
                                        <EyeIcon className="w-6 h-6 text-darkmode-disabled" />
                                    )
                                }
                            </span>
                        ):
                        ""
                    }
                </div>
            </label>
        </>
    )

}

export default Input