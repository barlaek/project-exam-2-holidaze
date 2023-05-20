import { useParams } from "react-router-dom"
import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";
import { ProfilePopulation } from "./profilePop";

export function Dashboard() {

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    console.log(token)

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
            <img src={data.avatar} alt="profile avatar" />
            <h2>{data.name}</h2>
            <ProfilePopulation profileData={data} />
        </div>
    )
}