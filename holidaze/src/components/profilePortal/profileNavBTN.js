import { Link } from "react-router-dom"

export function ProfileBtn() {
    const localData = JSON.parse(localStorage.getItem('userBody'))

    return (
        <Link to={`/profiles/${localData.name}`}><button>Profile</button></Link>
    )
}