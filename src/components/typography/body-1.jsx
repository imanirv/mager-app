const Body1 = ({children, disabled = false}) => (
    <p className={`text-base text-darkmode-4
    ${disabled ? 'text-darkmode-disabled': ''}`}>{children}</p>
)


export default Body1