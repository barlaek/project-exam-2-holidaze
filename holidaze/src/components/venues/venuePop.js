import { BookVenue } from "../booking/bookVenue";
import { Link } from "react-router-dom";
import styles from "./VenuePopulation.module.css";


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
        <div className={styles.container}>
            <div>
                <img src={venueData.media} alt="picture(s) of the venue" className={styles.image}/>
            </div>
            <div className={styles.content}>
                <div className={styles.details}>
                    <div className={styles.desc}>
                        <h2>{venueData.name}</h2>
                        <p className={styles.p}>Price per night: {venueData.price}kr</p>
                        <p className={styles.p}>Max number of guests {venueData.maxGuests}</p>
                        <p className={styles.p}>{venueData.description}</p>
                    </div>
                    <div className={styles.info}>
                        <h3>Information about the venue:</h3>
                        <div className={styles.locdet}>
                            <h4>Location:</h4>
                            <div className={styles.location}>
                                <p className={styles.p}>Address: {venueData.location.address}</p>
                                <p className={styles.p}>City: {venueData.location.city}</p>
                                <p className={styles.p}>Country: {venueData.location.country}</p>
                            </div>
                        </div>
                        <div className={styles.locdet}>
                            <h4>Additional information</h4>
                            <div className={styles.location}>
                                {venueData.meta.breakfast ? (
                                    <p className={styles.p}>Serves breakfast</p>
                                    ) : (
                                    <p className={styles.p}>No breakfast</p>
                                    )}
                                {venueData.meta.parking ? (
                                    <p className={styles.p}>Has parking</p>
                                ) : (
                                    <p className={styles.p}>No parking</p>
                                )}
                                {venueData.meta.pets ? (
                                    <p className={styles.p}>Pet friendly</p>
                                ) : (
                                    <p className={styles.p}>No pets allowed</p>
                                )}
                                {venueData.meta.wifi ? (
                                    <p className={styles.p}>Has wifi</p>
                                ) : (
                                    <p className={styles.p}>No wifi</p>
                                )}
                            </div>
                        </div>
                        <p className={styles.p}>This post was last updated: {new Date(venueData.updated).toLocaleString()}</p>
                    </div>
                </div>
                <div className={styles.calendar}>
                    {localData ? (
                        <BookVenue />
                        ) : (
                        <div>
                            <p>You must be logged in to book a venue</p>
                            <Link to={'/login'}><button>Log in</button></Link>
                        </div>
                     )}
                </div>
            </div>
        </div>
    )
}