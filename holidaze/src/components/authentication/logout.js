// Removes the JWT from storage, invalidating the HTTP request
// And changes the context state to false.

import { useContext } from "react";
import { UserContext } from "../../App";

export function Logout() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    function logOut() {
        localStorage.removeItem('accessToken');
        console.log(localStorage);
        setCurrentUser(null)
        console.log(currentUser);

    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}