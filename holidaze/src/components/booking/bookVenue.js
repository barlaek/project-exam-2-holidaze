import { useState } from "react";
import Calendar from 'react-calendar'

export function BookVenue() {

    const [ dateFrom, setDateFrom ] = useState(new Date());
    const [ dateTo, setDateTo ] = useState(new Date());
    const [ guests, setGuest ] = useState('');


    const submitBooking = (e) => {
        e.preventDefault();

        const body = {
            dateFrom: dateFrom.toString(),
            dateTo: dateTo.toString(),
            guests: parseInt(guests),
        }

        console.log(body);
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