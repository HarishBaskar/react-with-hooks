import React from 'react';
import styles from './LastSearches.module.css';

const LastSearch = ({lastSearches, handleLastSearch}) => {
    return(
        <>
            {lastSearches.length===0 ? null : <p>Last {lastSearches.length} search/searches: </p>}
            {lastSearches.map((searchTerm, index) => (
            <button className={`${styles.button} ${styles.buttonsmall}`}
            key={searchTerm + index}
            type="button"
            onClick={() => handleLastSearch(searchTerm)}
            >
            {searchTerm}
            </button>
        ))}
        </>
    )
}

export default LastSearch;