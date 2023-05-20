export function ProfilePopulation(props) {
    const profileData = props.profileData

    return (
        <div>
            <div>
                <img src={profileData.avatar} alt="profile picture" />
            </div>
            <div>
                <h3>{profileData.name}</h3>
                {profileData.venueManager === true ? (
                    <p>Contact information:</p>
                    <p>{profileData.email}</p>
                ) : (
                    
                )}
            </div>
        </div>
    )
}