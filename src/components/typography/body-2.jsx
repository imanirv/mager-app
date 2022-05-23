const Body2 = ({children, disabled = false}) =>(
    <p className={`font-nunito text-sm 
     ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}`}>{children}</p>
)


export default Body2