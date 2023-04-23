export function VenuePopulation(props) {
    const venueData = props.venueData;

    return (
        <div>
            <img src={venueData.media} alt="pictures of the venue" />
            <div>
                <h2>{venueData.name}</h2>
                <p>{venueData.description}</p>
            </div>
        </div>
    )
}