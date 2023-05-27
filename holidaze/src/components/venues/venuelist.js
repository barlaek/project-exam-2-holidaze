import { Link } from "react-router-dom"

/**
 * Component that populates the home page DOM.
 * Takes one @param {endpoint data} props 
 * @returns JSX cards of each property in the enpoint array
 */
export function VenueList(props) {
    const venue = props.venue
    return (
        <Link to={`/venues/${venue.id}`}>
            <img src={venue.media[0]} alt="product" />
            <div>
                <h3>{venue.name}</h3>
            </div>
        </Link>
    )
}