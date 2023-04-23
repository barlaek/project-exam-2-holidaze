import { Link } from "react-router-dom"

export function VenueList(props) {
    const venue = props.venue
    return (
        <Link to={`/${venue.id}`}>
            <img src={venue.media[0]} alt="product" />
            <div>
                <h3>{venue.name}</h3>
            </div>
        </Link>
    )
}