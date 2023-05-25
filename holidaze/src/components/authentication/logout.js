// Removes the JWT from storage, invalidating the HTTP request
// And changes the context state to false.

import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('userBody');
        console.log(localStorage);
        setCurrentUser(null)
        console.log(currentUser);
        if(!localStorage) {
            navigate('/');
        }

    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}