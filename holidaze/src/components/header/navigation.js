import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";
import { ProfileBtn } from "../profilePortal/profileNavBTN";
import { CvpBtn } from "../venues/cvpBtn";

export function Navigation() {
    return (
        <div>
            <SearchBar />
            <LogBtn />
            <ProfileBtn />
            <CvpBtn />
        </div>
    )
}