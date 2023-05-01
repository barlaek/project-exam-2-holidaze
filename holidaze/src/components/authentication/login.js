import { Link } from "react-router-dom";

// Sends post request to the endpoint and store JWT to localstorage and updates state
export function Login() {
    return (
        <div>
            <div>Here goes the form</div>
            <Link to="/register"><p>Register an account</p></Link>
        </div>
    )
}