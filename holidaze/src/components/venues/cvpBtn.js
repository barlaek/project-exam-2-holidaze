export function CvpBtn() {
    const localData = JSON.parse(localStorage.getItem("userBody"))
    

    return (
        <div>
            {localData ? (
                <button>Create venue</button>
            ) : (
                <p>Butt</p>
            )}
        </div>
    )
}