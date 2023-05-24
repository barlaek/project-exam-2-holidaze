import { useState } from "react";
import Calendar from 'react-calendar'
import { useParams } from "react-router-dom";
import { bookingsUrl } from "../api/endpoints";

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
        }).then(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <form>
                <Calendar 
                    onChange={setDateFrom} 
                    value={dateFrom}/>
                <Calendar 
                    onChange={setDateTo} 
                    value={dateTo}/>
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