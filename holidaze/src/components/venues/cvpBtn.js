import { Children } from "react";
import { Link } from "react-router-dom"

export function CvpBtn() {

    const viewButton = () => {
        const localData = JSON.parse(localStorage.getItem("userBody"));
        console.log(localData)
        if(localData.venueManager === true) {
            return <Link to="/venues/createvenue/"><button>Create venue</button></Link>
        } else {
            return <p>butt</p>
        }
    
    }

    return (
        <div>{viewButton}
        </div>
    )
}