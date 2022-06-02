const Body1 = ({children, disabled = false, bold = false, type, align}) => (
    <p className={` font-nunito text-base 
    ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'}
    ${bold ? 'font-bold': ''}
    ${type === 'primary' ? 'text-blue-400': type === 'danger' ? 'text-red-400' : 'text-darkmode-4'}
    ${align === 'center' ? 'text-center': align === 'right' ? 'text-right' : 'text-left'}
    `}>{children}</p>
)


export default Body1