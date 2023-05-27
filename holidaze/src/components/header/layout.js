import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * Scaffolding component that
 * @returns a layout of the application
 */
export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}