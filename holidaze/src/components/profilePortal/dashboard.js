import { useParams } from "react-router-dom"
import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";
import { ProfilePopulation } from "./profilePop";
import { Bookings } from "./bookings";

export function Dashboard() {

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;

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
        </div>
    )
}