import { UpdateAvatar } from "./updateAvatar"
import styles from "./ProfilePopulation.module.css"

/**
 * Component that populates the users information at profile page.
 * Takes one @param {endpoint} props and 
 * @returns JSX
 */
export function ProfilePopulation(props) {
    const profileData = props.profileData

    return (
        <div className={styles.container}>
            <div>
                <img src={profileData.avatar} alt="profile picture" className={styles.image} />
                <UpdateAvatar />
            </div>
            <div>
                <h3>{profileData.name}</h3>
                <div>
                    <p>Contact information:</p>
                    <p>{profileData.email}</p>
                </div>
            </div>
        </div>
    )
}