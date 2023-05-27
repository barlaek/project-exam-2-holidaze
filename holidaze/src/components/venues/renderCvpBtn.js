import styles from "../header/LogBtn.module.css";
/**
 * Component that checks the local storage for the venueManager property and
 * @returns a conditional rendering
 */
export const RenderCvpBtn = () =>  {

    /**
     * Variables that check and stores the venue manager property of the userBody object in localStorage
     */
    const localData = JSON.parse(localStorage.getItem("userBody"));
    const venueManager = localData.venueManager;
    console.log(venueManager);

    return (
        <div>
            {venueManager ? (
                <button className={styles.logBtn}>Create venue</button>
            ) : (
                <div></div>
            )}
        </div>
    )
}