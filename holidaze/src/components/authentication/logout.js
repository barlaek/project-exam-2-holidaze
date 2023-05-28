import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import styles from "../header/LogBtn.module.css";

/**
 * Logout component that removes the userBody object from local storage and
 * @returns a button that handles the logout function and navigates to the home page
 */
export function Logout() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate();

    function logOut() {
        if(localStorage) {
            navigate('/');
            setTimeout(() => {
                localStorage.removeItem('userBody');
                setCurrentUser(null)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }, 1000)

        }

    }

    return (
        <button onClick={logOut} className={styles.logBtn}>Log out</button>
    )
}