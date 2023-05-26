import { RenderCvpBtn } from "./renderCvpBtn"
import { Link } from "react-router-dom"

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