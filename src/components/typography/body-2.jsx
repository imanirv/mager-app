const Body2 = ({children, disabled = false}) =>(
    <p className={`text-sm text-darkmode-4
     ${disabled ? 'text-darkmode-disabled': ''}`}>{children}</p>
)


export default Body2