const Subtitle1 = ({children, cursor = false, disabled= true}) => (

    <span className={`text-base font-nunito ${disabled ? 'text-darkmode-disabled': 'text-darkmode-4'} font-semibold ${cursor ? 'cursor-pointer': ''}`}>{children}</span>
)

export default Subtitle1