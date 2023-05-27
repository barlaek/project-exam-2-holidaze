import { Navigation } from "./navigation";
import { Link } from "react-router-dom"

/**
 * Scaffolding component that
 * @returns a JSX header with logo and navigation
 */
export function Header() {
    return (
        <header>
            <Link to="/"><h1>Wassup</h1></Link>
            <Navigation />
        </header>
    )
}