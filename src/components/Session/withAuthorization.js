import React from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase/index';
import {AuthUserContext} from './index';
import {compose} from 'recompose';
import * as ROUTES from '../../Constants/Routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component{

        componentDidMount(){
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if(!condition(authUser))
                {
                    this.props.history.push(ROUTES.SIGN_IN);
                }
            })
        }

        componentWillUnmount(){
            this.listener();
        }


        render(){
            return(
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(withRouter,withFirebase)(WithAuthorization);
}

export default withAuthorization;