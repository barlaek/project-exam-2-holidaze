import { ApiHook } from "../api/api"
import { profilesUrl } from "../api/endpoints";
import { Link } from "react-router-dom";
import styles from "./Bookings.module.css";

/**
 * Component that checks the user's booking information at endpoint and
 * @returns JSX of user's booking history 
 */
export function Bookings() {
    /**
     * Variables for authorization
     */
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    
    /**
     * Api hook that fetches the user's booking data at endpoint
     */
    const { data, loading, error } = ApiHook(`${profilesUrl}/${name}/bookings`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    console.log(data)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your bookings</h2>
            {data.map((booking) => {
                return <div className={styles.booking}>
                    <Link to={`/venues/${booking.id}`}><h3>See booking</h3></Link>
                    <p>Booking from {new Date(booking.dateFrom).toDateString()} to {new Date(booking.dateTo).toDateString()}</p>
                    <p>Number of guests: {booking.guests}</p>
                    <p>Booking was last uppdated: {new Date(booking.updated).toLocaleString()}</p>
                </div>
            })}
        </div>
    )
}