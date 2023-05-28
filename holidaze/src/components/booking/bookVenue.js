import { useState } from "react";
import Calendar from 'react-calendar';
import { useNavigate, useParams } from "react-router-dom";
import { bookingsUrl } from "../api/endpoints";
import 'react-calendar/dist/Calendar.css';
import styles from "./BookVenue.module.css";

/**
 * Booking component that
 * @returns a calendar booking form
 */
export function BookVenue() {
    /**
     * useState functions that sets the user's input values
     */
    const [ dateFrom, setDateFrom ] = useState(new Date());
    const [ dateTo, setDateTo ] = useState(new Date());
    const [ guests, setGuest ] = useState('');
    const navigate = useNavigate();

    /**
     * Authorization variables
     */
    const localData = JSON.parse(localStorage.getItem('userBody'));
    const token = localData.accessToken;
    let { id } = useParams();

    /**
     * Function that handles the booking request at endpoint.
     * Takes one @param {Event} e and prevents page refresh. 
     */
    const submitBooking = (e) => {
        e.preventDefault();

        /**
         * Body object that stores calendar input values
         */
        const body = {
            dateFrom: dateFrom.toString(),
            dateTo: dateTo.toString(),
            guests: parseInt(guests),
            venueId: id,
        }

        console.log(body);

        /**
         * Api function call that posts the body object to the booking endpoint
         */
        fetch(`${bookingsUrl}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(response => {
            console.log(response)
            if(response.ok) {
                navigate(`/profiles/${localData.name}`)
            }
        }).then(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <form className={styles.form}>
                <h2>Book this venue</h2>
                <h3>Select arrival date:</h3>
                <Calendar 
                    onChange={setDateFrom} 
                    value={dateFrom}/>
                    <p>From date: {dateFrom.toDateString()}</p>
                    <h3>Select departure date:</h3>
                <Calendar 
                    onChange={setDateTo} 
                    value={dateTo}/>
                    <p>To date: {dateTo.toDateString()}</p>
                    <h3>Enter number of guests:</h3>
                <input 
                    type="text" 
                    value={guests} 
                    onChange={(e) => setGuest(e.target.value)} 
                    placeholder="Number of guests"
                    className={styles.input}/> 
                <button onClick={submitBooking}>Book venue</button>
            </form>
        </div>
    )
}