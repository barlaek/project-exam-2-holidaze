import { useNavigate, useParams } from "react-router-dom"
import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";
import { ProfilePopulation } from "./profilePop";
import { Bookings } from "./bookings";
import { CuratedVenues } from "./curatedVenues";

export function Dashboard() {

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    const venueManager = localData.venueManager;

    const { data, loading, error } = ApiHook(`${profilesUrl}/${name}`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    console.log(data);

    return (
        <div>
            <div>
                <ProfilePopulation profileData={data} />
            </div>
            <div>
                <Bookings />
            </div>
            <div>
                {venueManager ? (
                    <CuratedVenues />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}