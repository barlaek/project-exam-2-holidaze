import styles from "./Footer.module.css"

/**
 * Scaffolding component that
 * @returns the application's footer
 */
export function Footer() {
    return (
        <div className={styles.footerContainer}>
            <footer>Copyright© Bjørn Arne Læknes, 2023</footer>
        </div>
    )
}