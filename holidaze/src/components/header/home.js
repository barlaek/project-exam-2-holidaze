import { VenueList } from "../venues/venuelist";
import { ApiHook } from "../api";

export function Home() {
    const { data, loading, error } = ApiHook("https://api.noroff.dev/api/v1/holidaze/venues");

    return (
        <div>
            <h2>Home</h2>
            {data.map((venue) => (
                <VenueList venue={venue}/>
            ))}
        </div>
    )
}