import { ApiHook } from "../api/api"
import { profilesUrl } from "../api/endpoints";
import { Link } from "react-router-dom";

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

    console.log(data)

    return (
        <div>
            <h2>Your venues</h2>
            {data.map((venue) => {
                return <div>
                    <Link to={`/venues/${venue.id}`}>
                        <img src={venue.media} alt="picture of venue"/>
                        <h3>{venue.name}</h3>
                        <Link to={`/venues/${venue.id}/updatevenue`}><button>Update venue</button></Link>
                        <p>Price: {venue.price}</p>
                        <p>Number of guests: {venue.guests}</p>
                        <p>Created: {venue.created}</p>
                        <p>Last uppdated: {venue.updated}</p>
                        <p>{venue.description}</p>
                    </Link>
                </div>
            })}
        </div>
    )
}