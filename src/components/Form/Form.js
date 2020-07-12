import React from 'react';
import styles from './Form.module.css';

const Form = ({inputParameters, onFormSubmit, onInputChange, invalidCheck, errorMessage, buttonName}) => {

    const inputFields = inputParameters.map((inputObject, index) => {
        return(
            <div className={styles.userbox}>
                <input key={`inputValue${index}`}
                name={inputObject.name}
                value={inputObject.value}
                onChange={onInputChange}
                type={inputObject.type}
                placeholder={inputObject.placeholder}
                />
            </div>
        )
    })
        

    return(
        <div className={styles.loginbox}>
            <h2>{buttonName}</h2>
            <form onSubmit={onFormSubmit}>
                {inputFields}
                <button disabled={invalidCheck} type="submit">{buttonName}</button>
                {errorMessage && <p>{errorMessage.message}</p>}
            </form>
        </div>
    )
}

export default Form;