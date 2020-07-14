import React from 'react';
import { withAuthorization } from '../Session/index';

const HomePage = () => {
    return(
        <div>
            Home Page
        </div>
    )
}

const condition = authUser => authUser != null

export default withAuthorization(condition)(HomePage);