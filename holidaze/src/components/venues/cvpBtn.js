import { Link } from "react-router-dom"

export function CvpBtn() {

    const localData = localStorage.getItem('userBody');
    const venueManager = localData.venueManager;

    return (
        <div>
            {venueManager ? (
                <Link to="/venues/createvenue"><button>Create venue</button></Link>
            ) : (
                <div></div>
            )}
        </div>
    )
}