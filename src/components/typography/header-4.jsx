const Header4 = ({children, disabled = false}) => (
    <h4 className={`text-xl font-nunito  font-bold  ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}`}>{children}</h4>

)


export default Header4