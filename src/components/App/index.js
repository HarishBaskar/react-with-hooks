import React from 'react';
import HackerSearchApp from '../../containers/HackerSearchApp';
import {BrowserRouter as Router,
        Route} from 'react-router-dom';
import Navigation from '../Navigation/index';
import * as ROUTES from '../../Constants/Routes';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withAuthentication from '../Session/withAuthentication';

const App = () => {
    return(
        <Router>
            <Navigation/>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.SEARCH_PAGE} component={HackerSearchApp}/>
        </Router>
    )
}

export default withAuthentication(App);
