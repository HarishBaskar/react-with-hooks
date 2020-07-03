import React from 'react';

const search = ({search, onSearch}) => {
    return(
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" value={search} onChange={onSearch}/>
            <hr />
            <p>Searching for: {search ? search : null} </p> 
        </div>
    )
}

export default search;