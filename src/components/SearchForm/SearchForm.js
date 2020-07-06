import React from 'react';
import Search from '../Search/Search';
import style from './SearchForm.module.css';

const SearchForm = ({search, onSearch, id, isFocused, onFormSubmit}) => {
    return(
        <form onSubmit={onFormSubmit} className={style.searchform}>
            <Search id={id} 
                search={search} 
                onSearch={onSearch}
                isFocused={isFocused}>
                <strong>Search: </strong>
            </Search>
            <button className={`${style.button} ${style.buttonlarge}`}
                type="submit" disabled={!search}>Search</button>
        </form>
    )
};

export default SearchForm;