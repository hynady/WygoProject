// SearchResultPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SearchResult from "../components/Search/SearchResult";
import NavBar from "../components/NavBar/NavBar";

const SearchResultPage = () => {
    const { query } = useParams();

    return (
        <div>
            <NavBar />
            <h1>Kết quả tìm kiếm cho: {query}</h1>
            <SearchResult query={query} />
        </div>
    );
};

export default SearchResultPage;
