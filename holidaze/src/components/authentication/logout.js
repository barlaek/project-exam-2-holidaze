// Removes the JWT from storage, invalidating the HTTP request
// And changes the context state to false.

export function Logout() {
    function logOut() {
        localStorage.removeItem('accessToken');
        console.log(localStorage);
    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}