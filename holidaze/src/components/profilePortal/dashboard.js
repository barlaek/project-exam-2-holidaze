import { useParams } from "react-router-dom"
import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";

export function Dashboard() {
    // get name as paramater
    // apply to API hook
    // load profile data

    let { name } = useParams();
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const token = localData.accessToken;
    console.log(token)

    // const { data, loading, error } = ApiHook(`${profilesUrl}/${name}`);
    fetch(`${profilesUrl}/${name}`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    })

    return (
        <div><h2>Hello from the Dashboard</h2></div>
    )
}