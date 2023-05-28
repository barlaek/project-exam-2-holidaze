import { CreateVenue } from "./createVenue";
import styles from "./CreateVenuePage.module.css"

/**
 * Scaffodling component that
 * @returns the create venue page with form properties
 */
export function CreateVenuePage() {
    return (
        <div className={styles.container}>
            <CreateVenue />
        </div>
    )
}