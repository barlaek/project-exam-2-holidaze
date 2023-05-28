import { ApiHook } from "../api/api";
import { profilesUrl } from "../api/endpoints";
import { ProfilePopulation } from "./profilePop";
import { Bookings } from "./bookings";
import { CuratedVenues } from "./curatedVenues";
import styles from "./Dashboard.module.css"

/**
 * Scaffold that fetches the data that populates the profile components and
 * @returns the user's profile page
 */
export function Dashboard() {
    /**
     * Variables for authorization
     */
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    const venueManager = localData.venueManager;

    /**
     * Api hook that fetches the data of the user
     */
    const { data, loading, error } = ApiHook(`${profilesUrl}/${name}`, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    console.log(data);

    return (
        <div className={styles.container}>
            <div>
                <ProfilePopulation profileData={data} />
            </div>
            <div className={styles.population}>
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
        </div>
    )
}