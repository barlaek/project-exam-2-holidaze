import { useParams } from "react-router-dom";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";
import { VenuePopulation } from "./venuePop";

/**
 * Venue scaffold that takes the VenuePopulation component and renders the data properties
 * of the individual venues by ID and
 * @returns a fully populated page
 */
export function Venue() {
    let { id } = useParams();

    const  { data, loading, error } = ApiHook(`${venuesUrl}/${id}`);

    if(loading) {
        return <div>loading</div>
    }

    if(error) {
        return <div>Error</div>
    }

    return (
        <div>
            <VenuePopulation venueData={data} />
        </div>
    )
}