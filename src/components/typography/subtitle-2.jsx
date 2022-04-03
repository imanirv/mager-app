const Subtitle2 = ({children, disabled = false}) => (
    <span className={
        `text-sm text-darkmode-4 font-semibold 
        ${disabled ? 'text-darkmode-disabled': ''}
        `}>{children}</span>
)

export default Subtitle2