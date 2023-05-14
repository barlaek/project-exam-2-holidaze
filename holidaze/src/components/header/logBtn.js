import { Link } from "react-router-dom"
import { Logout } from "../authentication/logout"

export function LogBtn() {
    return (
        <div>
            <Link to="/login"><button>Click me</button></Link>
            <Logout />
        </div>
    )
}