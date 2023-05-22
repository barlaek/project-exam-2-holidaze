import { venuesUrl } from "../api/endpoints"

export function DeleteVenue(props) {

    const localData = JSON.parse(localStorage.getItem('userBody'));
    const token = localData.accessToken;

    function deleteVenue() {
        fetch(`${venuesUrl}/${props.id}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
        }).then(data => {
            console.log(data)
        }

        ).catch(error => {
            console.log(error)
        })
    }

    return (
        <button onClick={deleteVenue}>Delete venue</button>
    )
}