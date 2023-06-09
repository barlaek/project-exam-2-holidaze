import { ApiHook } from "../api/api"
import { profilesUrl } from "../api/endpoints";
import { Link } from "react-router-dom";
import { DeleteVenue } from "../venues/deleteVenue";
import styles from "./CuratedVenues.module.css";

/**
 * Component that populates the user's profile page if user is a venuemanager and
 * @returns JSX
 */
export function CuratedVenues() {
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    
    const { data, loading, error } = ApiHook(`${profilesUrl}/${name}/venues`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your venues</h2>
            <div className={styles.grid}>
                {data.map((venue) => {
                    return <div className={styles.card}>
                        <img src={venue.media} alt="picture of venue" className={styles.image}/>
                        <div className={styles.content}>
                            <div>
                                <h3>{venue.name}</h3>
                                <p>Price per night: {venue.price}kr</p>
                                <p>Number of guests: {venue.maxGuests}</p>
                                <p>Created: {new Date(venue.created).toLocaleString()}</p>
                                <p>Last uppdated: {new Date(venue.updated).toLocaleString()}</p>
                                <p>{venue.description}</p>
                            </div>
                            <div className={styles.buttons}>
                                <Link to={`/venues/${venue.id}`}><button>See venue</button></Link>
                                <Link to={`/venues/updatevenue/${venue.id}`}><button>Update venue</button></Link>
                                <DeleteVenue id={venue.id} />
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}