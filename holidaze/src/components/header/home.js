import { VenueList } from "../venues/venuelist";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";

/**
 * Home component that fetches all venues data and
 * @returns JSX for each venue
 */
export function Home() {
    const { data, loading, error } = ApiHook(`${venuesUrl}`);

    if(loading) {
        return <div>loading</div>
    }

    if(error) {
        return <div>Error</div>
    }

    return (
        <div>
            <h2>Home</h2>
            {data.map((venue) => (
                <VenueList venue={venue} key={venue.id}/>
            ))}
        </div>
    )
}