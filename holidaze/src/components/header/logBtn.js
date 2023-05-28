import { Link } from "react-router-dom"
import { Logout } from "../authentication/logout"
import styles from "./LogBtn.module.css"

/**
 * Scaffolding component that
 * @returns the log in and log out components
 */
export function LogBtn() {
    return (
        <div className={styles.flex}>
            <Link to="/login"><button className={styles.logBtn}>Log in</button></Link>
            <Logout />
        </div>
    )
}