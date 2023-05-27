import { Link } from "react-router-dom"
import { Logout } from "../authentication/logout"

/**
 * Scaffolding component that
 * @returns the log in and log out components
 */
export function LogBtn() {
    return (
        <div>
            <Link to="/login"><button>Log in</button></Link>
            <Logout />
        </div>
    )
}