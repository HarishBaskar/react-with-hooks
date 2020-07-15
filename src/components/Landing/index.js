import React from 'react';
import Styles from './Landing.module.css';
import * as ROUTES from '../../Constants/Routes';
import {Link} from 'react-router-dom';

const LandingPage = () => {

    const greet = () => {
        let greetMessage;

        let myDate = new Date();
        let hrs = myDate.getHours();

        if (hrs < 12)
        {
            greetMessage = 'Good Morning';
        }
        else if (hrs >= 12 && hrs <= 17)
        {
            greetMessage = 'Good Afternoon';
        }
        else if (hrs >= 17 && hrs <= 24)
        {
            greetMessage = 'Good Evening';
        }

        return greetMessage
    }

    return(
        <div className={Styles.textcontainer}>
            <h1>Hey There! <span>{greet()}!</span></h1>
            <p>Here you can search some recent Hacker Stories</p>
            <p>Login to find out. Happy Hacking!</p>
            <StoriesLink/>
        </div>
    )
}

const StoriesLink = () => (
    <p>
      Click here to <Link to={ROUTES.SEARCH_PAGE}>Search stories</Link>
    </p>
  );

export default LandingPage;