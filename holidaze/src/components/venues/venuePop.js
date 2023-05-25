import { useContext } from "react";
import { UserContext } from "../../App";
import { BookVenue } from "../booking/bookVenue";

export function VenuePopulation(props) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const venueData = props.venueData;

    console.log(currentUser)

    return (
        <div>
            <div>
                {venueData.media.map((img) => {
                    return <img src={img} alt="picture(s) of the venue" />
                })}
            </div>
            <div>
                <BookVenue />
            </div>
            <div>
                <div>
                    <h2>{venueData.name}</h2>
                    <p>Price per night: {venueData.price}kr</p>
                    <p>{venueData.description}</p>
                </div>
                <div>
                    <h3>Information about the venue:</h3>
                    <div>
                        <h4>Location:</h4>
                        <p>Addres: {venueData.location.address}</p>
                        <p>City: {venueData.location.city}</p>
                        <p>Country: {venueData.location.country}</p>
                    </div>
                    <div>
                        <h4>Additional information</h4>
                            {venueData.meta.breakfast ? (
                            <p>Serves breakfast</p>
                            ) : (
                                <p>No breakfast</p>
                            )}
                            {venueData.meta.parking ? (
                                <p>Has parking</p>
                            ) : (
                                <p>No parking</p>
                            )}
                            {venueData.meta.pets ? (
                                <p>Pet friendly</p>
                            ) : (
                                <p>No pets allowed</p>
                            )}
                            {venueData.meta.wifi ? (
                                <p>Has wifi</p>
                            ) : (
                                <p>No wifi</p>
                            )}
                    </div>
                    <p>This post was last updated: {venueData.updated}</p>
                </div>
            </div>
        </div>
    )
}