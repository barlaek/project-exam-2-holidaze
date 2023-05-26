export const RenderCvpBtn = () =>  {
    const localData = JSON.parse(localStorage.getItem("userBody"));
    const venueManager = localData.venueManager;
    console.log(venueManager);

    return (
        <div>
            {venueManager ? (
                <button>Create venue</button>
            ) : (
                <div></div>
            )}
        </div>
    )
}