import React, { useState } from "react";
import { ApiHook } from "../api/api";
import { venuesUrl } from "../api/endpoints";

export function SearchBar() {
    const { data } = ApiHook(`${venuesUrl}`);

    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const searchWord = e.target.value;
        const venueList = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        })

        if(searchInput === '') {
            setSearchInput('');
            console.log(setSearchInput)
        } else {
            setSearchInput(venueList);
            console.log(setSearchInput);
        }
    }


    return (
        <div>
            <input 
                type="text" 
                placeholder="search" 
                onChange={handleChange}/>
        </div>
    )
}