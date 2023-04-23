import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

export function Layout() {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    )
}