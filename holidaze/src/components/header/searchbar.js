import React, { useState } from "react";
import { ApiHook } from "../api";

export function SearchBar() {
    const { data, loading, error } = ApiHook("https://api.noroff.dev/api/v1/holidaze/venues");

    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if(searchInput !== '') {
            const filteredData = data.filter((item) => {
                return Object.values(item).join('').toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            })
            
            setFilteredData(filteredData);
        } else {
            setFilteredData(data)
        }
    }


    return (
        <input type="text" placeholder="search" onChange={(e) => searchItems(e.target.value)} />
    )
}