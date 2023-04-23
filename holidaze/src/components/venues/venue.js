import { useParams } from "react-router-dom";
import { ApiHook } from "../api";

export function Venue() {
    let id = useParams();

    const  { data, loading, error } = ApiHook(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}`);

    return (
        <div>
            {data.map((venue) => (
                <div>{venue.name}</div>
            ))}
        </div>
    )
}