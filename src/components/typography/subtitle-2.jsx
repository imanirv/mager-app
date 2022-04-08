const Subtitle2 = ({children, disabled = false}) => (
    <span className={
        `text-sm font-nunito text-darkmode-4 font-semibold 
        ${disabled ? 'text-darkmode-disabled': ''}
        `}>{children}</span>
)

export default Subtitle2