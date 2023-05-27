import { Link } from "react-router-dom"
import styles from "./VenueList.module.css"

/**
 * Component that populates the home page DOM.
 * Takes one @param {endpoint data} props 
 * @returns JSX cards of each property in the enpoint array
 */
export function VenueList(props) {
    const venue = props.venue
    return (
        <div className={styles.card}>
            <Link to={`/venues/${venue.id}`}>
                <div className={styles.imageContainer}>
                    <img src={venue.media[0]} alt="product" className={styles.img}/>
                </div>
                <div className={styles.text}>
                    <h3>{venue.name}</h3>
                    <p>Houses {venue.maxGuests} guests</p>
                    <p>Price per night: {venue.price}kr</p>
                </div>
            </Link>
        </div>
    )
}