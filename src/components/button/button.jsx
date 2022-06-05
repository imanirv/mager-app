import {ButtonText} from "../typography"

const Button = ({type, caption, disabled=false, secondary=false}) => {
    return (
        <button type={type} className={`${
            disabled ? 'bg-darkmode-disabled': secondary ? 'bg-darkmode-3' : 'grad-color'} 
            w-full p-2 rounded-lg `}><ButtonText>{caption}</ButtonText></button>
    )
}

export default Button