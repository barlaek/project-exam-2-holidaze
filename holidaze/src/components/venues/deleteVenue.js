import { venuesUrl } from "../api/endpoints"
import styles from "./DeleteVenue.module.css"

/**
 * Component that handles the API call function of deleting a created post by user.
 * Component has one @param {id} props and 
 * @returns a button that deletes venue at endpoint
 */
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
        <button onClick={deleteVenue} className={styles.delete}>Delete venue</button>
    )
}