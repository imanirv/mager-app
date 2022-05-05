const Body1 = ({children, disabled = false, bold = false}) => (
    <p className={` font-nunito text-base 
    ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}
    ${bold ? 'font-bold': ''}
    `}>{children}</p>
)


export default Body1