import { useParams } from "react-router-dom"
import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";

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

    // fetch(`${profilesUrl}/${name}`, {
    //     method: 'get',
    //     headers: {
    //         'Content-type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     }
    // }).then(response => response.json())
    // .then(data => {
    //     console.log(data)
    //     const body = data
    //     return body
    // }).catch(error => {
    //     console.log(error);
    // })

    return (
        <div>
            <img src={data.avatar} alt="profile avatar" />
            <h2>{data.name}</h2>
            <p>hello</p>
        </div>
    )
}