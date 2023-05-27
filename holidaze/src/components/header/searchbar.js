import React, { useState } from "react";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";
import styles from "./Searchbar.module.css";

/**
 * Component that handles a search string and
 * @returns a JSX input object and renders array of results
 */
export function SearchBar() {
    /**
     * Hook that fetches all venues at endpoint
     */
    const { data } = ApiHook(`${venuesUrl}`);

    /**
     * Function that sets the input state of the searchbar
     */
    const [searchInput, setSearchInput] = useState([]);

    /**
     * Function that handles input.
     * Takes one @param {Event} e to prevent default reload and 
     * @returns an array of search results.
     */
    const handleChange = (e) => {
        e.preventDefault();
        const searchWord = e.target.value;
        const venueList = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        })

        if(searchInput === '') {
            return setSearchInput([])
        } else {
            return setSearchInput(venueList);
        }
    }

    console.log(searchInput)


    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder="search" 
                onChange={handleChange}
                className={styles.input}/>
        </div>
    )
}