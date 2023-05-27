import { BookVenue } from "../booking/bookVenue";
import { Link } from "react-router-dom";


/**
 * Component of singular venue by ID that takes one
 * @param {endpoint data of venue} props and
 * @returns JSX that populates the venue by ID's DOM
 */
export function VenuePopulation(props) {
    /**
     * Fetches the local data to apply conditional rendering of JSX Calendar component
     */
    const localData = localStorage.getItem('userBody');

    /**
     * Variable that stores the properties of the data object
     */
    const venueData = props.venueData;

    return (
        <div>
            <div>
                {venueData.media.map((img) => {
                    return <img src={img} alt="picture(s) of the venue" />
                })}
            </div>
            <div>
                {localData ? (
                    <BookVenue />
                ) : (
                    <div>
                        <p>You must be logged in to book a venue</p>
                        <Link to={'/login'}><button>Log in</button></Link>
                    </div>
                )}
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
                    <p>This post was last updated: {new Date(venueData.updated).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}