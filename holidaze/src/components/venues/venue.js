import { useParams } from "react-router-dom";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";
import { VenuePopulation } from "./venuePop";

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