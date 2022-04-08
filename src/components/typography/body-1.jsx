const Body1 = ({children, disabled = false, bold = false}) => (
    <p className={` font-nunito text-base text-darkmode-4
    ${disabled ? 'text-darkmode-disabled': ''}
    ${bold ? 'font-bold': ''}
    `}>{children}</p>
)


export default Body1