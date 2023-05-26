import React from "react";
import { LogBtn } from "./logBtn";
import { SearchBar } from "./searchbar";
import { ProfileBtn } from "../profilePortal/profileNavBTN";
import { CvpBtn } from "../venues/cvpBtn";
import { Link } from "react-router-dom";

export function Navigation() {

    return (
        <div>
            <div>
                <SearchBar />
            </div>
            <div>
                <LogBtn />
                <ProfileBtn />
                <CvpBtn />
            </div>
        </div>
    )
}