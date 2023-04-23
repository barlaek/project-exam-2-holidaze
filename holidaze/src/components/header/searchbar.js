import React, { useState } from "react";
import { ApiHook } from "../api/api";

export function SearchBar() {
    const { data, loading, error } = ApiHook("https://api.noroff.dev/api/v1/holidaze/venues");

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if(searchInput !== '') {
            const filteredData = data.filter((item) => {
                return Object.values(item).join('').toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            })
            
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(data)
        }
    }


    return (
        <div>
            <input type="text" placeholder="search"></input>
        </div>
    )
}