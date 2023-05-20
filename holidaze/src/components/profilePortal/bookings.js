import { ApiHook } from "../api/api"
import { profilesUrl } from "../api/endpoints";
import { Link } from "react-router-dom";

export function Bookings() {

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    
    const { data, loading, error } = ApiHook(`${profilesUrl}/${name}/bookings`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    console.log(data)

    return (
        <div>
            <h2>Your bookings</h2>
            {data.map((booking) => {
                return <div>
                    <Link to={`/venues/${booking.id}`}>
                        <p>From {booking.dateFrom} to {booking.dateTo}</p>
                        <p>Number of guests: {booking.guests}</p>
                        <p>Created: {booking.created}</p>
                        <p>Last uppdated: {booking.updated}</p>
                    </Link>
                </div>
            })}
        </div>
    )
}