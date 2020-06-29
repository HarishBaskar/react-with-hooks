import React from 'react';

const search = ({ search, onSearch }) => {

    const [searchTerm, setSearchTerm] = React.useState('');

    const onHandleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event);
    }

    return(
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" value={search} onChange={onHandleChange}/>
            <hr />
            <p>Searching for story: {searchTerm ? searchTerm : search}</p>
        </div>
    )
}

export default search;