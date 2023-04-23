import { VenueList } from "../venues/venuelist";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";

export function Home() {
    const { data, loading, error } = ApiHook(`${venuesUrl}`);

    return (
        <div>
            <h2>Home</h2>
            {data.map((venue) => (
                <VenueList venue={venue} key={venue.id}/>
            ))}
        </div>
    )
}