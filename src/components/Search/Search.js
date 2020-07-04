import React from 'react';

const search = ({search, onSearch, children, id, isFocused}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused) 
        {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return(
        <>
            <label htmlFor={id}>{children}</label>
            <input id={id} 
                ref={inputRef}
                type="text" 
                value={search} 
                onChange={onSearch}/>
            <hr />
            <p>Searching for: {search ? search : null} </p> 
        </>
    )
}

export default search;