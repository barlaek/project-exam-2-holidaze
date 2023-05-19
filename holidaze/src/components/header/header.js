import { Navigation } from "./navigation";
import { Link } from "react-router-dom"

export function Header() {
    return (
        <header>
            <Link to="/"><h1>Wassup</h1></Link>
            <Navigation />
        </header>
    )
}