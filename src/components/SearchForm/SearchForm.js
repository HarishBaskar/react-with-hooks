import React from 'react';
import Search from '../Search/Search';

const SearchForm = ({search, onSearch, id, isFocused, onFormSubmit}) => {
    return(
        <form onSubmit={onFormSubmit}>
            <Search id={id} 
                search={search} 
                onSearch={onSearch}
                isFocused={isFocused}>
                <strong>Search: </strong>
            </Search>
            <button type="button" disabled={!search}>Search</button>
        </form>
    )
};

export default SearchForm;