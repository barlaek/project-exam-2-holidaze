import { useContext } from "react"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
import { profilesUrl } from "../api/endpoints";

export function ProfileBtn() {
    const localData = JSON.parse(localStorage.getItem('userBody'))

    return (
        <Link to={`/${localData.name}`}><button>Profile</button></Link>
    )
}