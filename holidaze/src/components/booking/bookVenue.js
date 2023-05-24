import { useState } from "react";
import Calendar from 'react-calendar'

export function BookVenue() {

    const [ date, setDate ] = useState(new Date())


    const onChange = date => {
        
        console.log(date);

        const body = {
            dateFrom: date.toString(),
            dateTo: date.toString(),
        }

        console.log(body);
    }

    return (
        <div>
            <Calendar onChange={onChange} value={date} />
            <input type="number" placeholder="Number of guests"/> 
            <button>Book venue</button>
        </div>
    )
}