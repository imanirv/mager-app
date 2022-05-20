const Subtitle2 = ({children, disabled = false}) => (
    <span className={
        `text-sm font-nunito  font-semibold 
        ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}
        `}>{children}</span>
)

export default Subtitle2