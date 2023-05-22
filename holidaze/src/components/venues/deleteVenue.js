import { venuesUrl } from "../api/endpoints"

export function DeleteVenue(props) {

    const id = props.id

    const localData = JSON.parse(localStorage.getItem('userBody'));
    const token = localData.accessToken;

    function deleteVenue() {
        fetch(`${venuesUrl}/${id}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(response.ok) {
                window.location.reload();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <button onClick={deleteVenue}>Delete venue</button>
    )
}