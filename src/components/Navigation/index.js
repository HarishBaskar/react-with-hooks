import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import SignOutButton from '../SignOut/index';
import styles from '../Navigation/Navigation.module.css';
import { AuthUserContext } from '../Session';

const Navigation = () => {
    return(
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
            </AuthUserContext.Consumer>
        </div>
    );
}

const NavigationAuth = () => {
    return(
        <nav className={styles.navigation}>
            <ul className={styles.menu}>
                <li className={styles.heading}>
                    <Link to={ROUTES.LANDING}>Hacker Stories</Link>
                </li>
                <li className={styles.item}>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li className={styles.item}>
                    <Link to={ROUTES.SEARCH_PAGE}>Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li className={styles.item}>
                    <SignOutButton/>
                </li>
            </ul>
        </nav>
    )
}

const NavigationNonAuth = () => {
    return(
        <nav className={styles.navigation}>
            <ul className={styles.menu}>
                <li className={styles.heading}>
                    <Link to={ROUTES.LANDING}>Hacker Stories</Link>
                </li>
                <li className={styles.item}>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li className={styles.item}>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </li>
            </ul>
        </nav> 
    )
}

export default Navigation;