import { RenderCvpBtn } from "./renderCvpBtn"
import { Link } from "react-router-dom"

/**
 * Scaffolding component for conditionally rendering the Create venue button and
 * @returns either a button to create venue or an empty div
 */
export function CvpBtn() {
    const localData = localStorage.getItem("userBody")
    
    return (
        <div>
            {localData ? (
                <Link to="/venues/createvenue"><RenderCvpBtn /></Link>
            ) : (
                <div></div>
            )}
        </div>
    )
}