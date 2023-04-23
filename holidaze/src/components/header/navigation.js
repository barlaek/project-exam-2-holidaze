import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";

export function Navigation() {
    return (
        <div>
            <SearchBar />
            <LogBtn />
        </div>
    )
}