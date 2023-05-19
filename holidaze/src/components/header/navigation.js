import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";
import { ProfileBtn } from "../profilePortal/profileNavBTN";

export function Navigation() {
    return (
        <div>
            <SearchBar />
            <LogBtn />
            <ProfileBtn />
        </div>
    )
}