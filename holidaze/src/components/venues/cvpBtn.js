import { Link } from "react-router-dom"

export function CvpBtn() {

    const viewButton = () => {
        const localData = localStorage.getItem('userBody');
        const venueManager = localData.venueManager;
        if(venueManager) {
            return <Link to="/venues/createvenue"><button>Create venue</button></Link>
        } else {
            return <div></div>
        }
    }

    return (
        <div value={viewButton}></div>
    )
}