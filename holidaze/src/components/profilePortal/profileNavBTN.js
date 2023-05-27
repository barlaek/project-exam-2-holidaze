import { Link } from "react-router-dom";
import styles from "../header/LogBtn.module.css";

/**
 * Component that checks if a user is logged in and
 * @returns either a link to the users profile page or login page
 */
export function ProfileBtn() {
    const localData = JSON.parse(localStorage.getItem('userBody'))

    return (
        <div>
            {localData ? (
                <Link to={`/profiles/${localData.name}`}><button className={styles.logBtn}>Profile</button></Link>
            ) : (
                <Link to={`/login`}><button className={styles.logBtn}>Profile</button></Link>
            )}
        </div>
    )
}