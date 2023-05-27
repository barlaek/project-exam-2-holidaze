import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

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
            localStorage.removeItem('userBody');
            setCurrentUser(null)
        }

    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}