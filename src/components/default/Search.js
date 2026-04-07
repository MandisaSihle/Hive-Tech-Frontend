import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import SearchIcon from "../../assets/images/search.svg";

export default function Search({ setSearch, setPage }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setPage(1);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setSearch(query);
        }, 300);

       
        return () => clearTimeout(timeOutId);
    }, [query, setSearch]);

    return (
        <li>
            <div className="search-container">
                <div className="search-input-wrapper">
                    <input 
                        value={query} 
                        onChange={handleInputChange}
                        className="custom-search-input"
                        type="text"
                        placeholder="Search"
                    />
                    {}
                    <Link className="menu_item search" to="/">
                        <img
                            className="search-icon"
                            src={SearchIcon}
                            alt="Search"
                        />
                    </Link>
                </div>
            </div>
        </li>
    );
}
