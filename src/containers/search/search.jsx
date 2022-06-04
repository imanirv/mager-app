import {useRouter} from "next/router"

const SearchContainer = () => {
    const router = useRouter()
    const {keyword} = router.query
    return (
        <p>{keyword}</p>
    )
}
export default SearchContainer