import {ButtonText} from "../typography"

const Button = ({type, caption, disabled=false}) => {
    return (
        <button type={type} className={`${disabled ? 'bg-darkmode-disabled': 'grad-color'} w-full p-2 rounded-lg `}><ButtonText>{caption}</ButtonText></button>
    )
}

export default Button