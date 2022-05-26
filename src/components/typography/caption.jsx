const Caption = ({children, disabled = false, cursor = false}) => (
    <span className={`text-sm font-nunito text-darkmode-4  ${disabled ? 'text-darkmode-disabled': ''} ${cursor ? 'cursor-pointer': ''}`}>{children}</span>

)

export default Caption