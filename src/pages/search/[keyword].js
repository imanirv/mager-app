import Header from "next/head"
import SearchContainer from "../../containers/search"

const SearchPage = () => {
    return (
        <>
            <Header>
                <title>mager - search</title>
            </Header>
            <SearchContainer />
        </>
    )
}

export default SearchPage