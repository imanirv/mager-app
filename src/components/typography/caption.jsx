const Caption = ({children, disabled = false}) => (
    <span className={`text-sm font-nunito text-darkmode-4  ${disabled ? 'text-darkmode-disabled': ''}`}>{children}</span>

)

export default Caption