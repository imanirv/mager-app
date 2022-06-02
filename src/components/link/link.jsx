import Link from "next/link"


const LinkItem = ({href, caption}) => {
    return (
        <Link href={href}>
            <a className="text-primary">{caption}</a>
        </Link>
    )
}

export default LinkItem