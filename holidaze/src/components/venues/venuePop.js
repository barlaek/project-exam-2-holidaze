import { useContext } from "react";
import { UserContext } from "../../App";
import { BookVenue } from "../booking/bookVenue";

export function VenuePopulation(props) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const venueData = props.venueData;

    console.log(currentUser)

    return (
        <div>
            <img src={venueData.media} alt="pictures of the venue" />
            <div>
                <BookVenue />
            </div>
            <div>
                <h2>{venueData.name}</h2>
                <p>{venueData.description}</p>
            </div>
        </div>
    )
}