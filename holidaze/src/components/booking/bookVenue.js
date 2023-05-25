import { useState } from "react";
import Calendar from 'react-calendar'
import { useParams } from "react-router-dom";
import { bookingsUrl } from "../api/endpoints";
import 'react-calendar/dist/Calendar.css';

export function BookVenue() {

    const [ dateFrom, setDateFrom ] = useState(new Date());
    const [ dateTo, setDateTo ] = useState(new Date());
    const [ guests, setGuest ] = useState('');

    const localData = JSON.parse(localStorage.getItem('userBody'));
    const token = localData.accessToken;
    let { id } = useParams();

    const submitBooking = (e) => {
        e.preventDefault();

        const body = {
            dateFrom: dateFrom.toString(),
            dateTo: dateTo.toString(),
            guests: parseInt(guests),
            venueId: id,
        }

        console.log(body);

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
                window.location.reload();
            }
        }).then(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <form>
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
                    placeholder="Number of guests"/> 
                <button onClick={submitBooking}>Book venue</button>
            </form>
        </div>
    )
}