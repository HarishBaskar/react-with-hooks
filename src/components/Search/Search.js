import React from 'react';

const search = ({search, onSearch, children, id, isFocused, onButtonClick}) => {
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
            &nbsp;
            <button type="button" disabled={!search} onClick={onButtonClick}>Search</button>
            <hr />
        </>
    )
}

export default search;