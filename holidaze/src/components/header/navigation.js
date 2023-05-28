import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";
import { ProfileBtn } from "../profilePortal/profileNavBTN";
import { CvpBtn } from "../venues/cvpBtn";
import styles from "./Navigation.module.css"

/**
 * Scaffolding component for navigation
 * @returns JSX of navigation components
 */
export function Navigation() {

    return (
        <div className={styles.container}>
            <div>
                <SearchBar />
            </div>
            <input className={styles.menuBtn} type="checkbox" />
            <label className={styles.menuIcon} for="menu-btn"><span className={styles.navIcon}></span></label>
            <div className={styles.profileContainer}>
                <LogBtn />
                <ProfileBtn />
                <CvpBtn />
            </div>
        </div>
    )
}