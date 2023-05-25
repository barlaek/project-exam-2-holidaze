// Removes the JWT from storage, invalidating the HTTP request
// And changes the context state to false.

import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

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