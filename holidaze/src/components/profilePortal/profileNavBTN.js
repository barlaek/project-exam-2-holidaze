import { Link } from "react-router-dom"

export function ProfileBtn() {
    const localData = JSON.parse(localStorage.getItem('userBody'))

    return (
        <div>
            {localData ? (
                <Link to={`/profiles/${localData.name}`}><button>Profile</button></Link>
            ) : (
                <Link to={`/login`}><button>Profile</button></Link>
            )}
        </div>
    )
}