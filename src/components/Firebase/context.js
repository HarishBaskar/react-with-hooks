import React from 'react';

const FirebaseContext = React.createContext(null);

//HOC
export const withFirebase = Component => props => {
    return(
        <FirebaseContext.Consumer>
            {firebase => { return(
                <Component {...props} firebase={firebase}/>
            )}}
        </FirebaseContext.Consumer>
    )
}

export default FirebaseContext;