import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";
import { ProfileBtn } from "../profilePortal/profileNavBTN";
import { CvpBtn } from "../venues/cvpBtn";

export function Navigation() {

    const localData = localStorage.getItem('userBody');

    return (
        <div>
            <div>
                <SearchBar />
            </div>
            <div>
                <LogBtn />
                <ProfileBtn />
                {localData ? (
                    <CvpBtn />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}