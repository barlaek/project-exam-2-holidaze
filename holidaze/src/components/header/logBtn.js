import { Link } from "react-router-dom"

export function LogBtn() {
    return (
        <div>
            <Link to="/login"><button>Click me</button></Link>
        </div>
    )
}