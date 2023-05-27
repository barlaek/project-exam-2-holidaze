import { UpdateAvatar } from "./updateAvatar"

/**
 * Component that populates the users information at profile page.
 * Takes one @param {endpoint} props and 
 * @returns JSX
 */
export function ProfilePopulation(props) {
    const profileData = props.profileData

    return (
        <div>
            <div>
                <img src={profileData.avatar} alt="profile picture" />
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