const Subtitle2 = ({children, disabled = false, cursor = false}) => (
    <span className={
        `text-sm font-nunito  font-semibold 
        ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}
        ${cursor ? 'cursor-pointer': ''}
        `}>{children}</span>
)

export default Subtitle2