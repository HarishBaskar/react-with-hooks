import React from 'react';
import style from  './Search.module.css';

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
            <label className={style.label}
                htmlFor={id}>{children}</label>
            <input className={style.input}
                id={id} 
                ref={inputRef}
                type="text" 
                value={search} 
                onChange={onSearch}/>
            &nbsp;
        </>
    )
}

export default search;