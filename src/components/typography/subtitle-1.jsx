const Subtitle1 = ({children, cursor = false}) => (

    <span className={`text-base font-nunito text-darkmode-4 font-semibold ${cursor ? 'cursor-pointer': ''}`}>{children}</span>
)

export default Subtitle1