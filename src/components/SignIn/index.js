import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase/index';
import * as ROUTES from '../../Constants/Routes';
import Form from '../Form/Form';

const SignInPage = () => {
    return(
        <div>
            <SignInForm/>
        </div>
    )
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignInFormBase extends Component{
    state = {...INITIAL_STATE};

    onSubmit = (event) => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            })
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value});
    } 

    render(){
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        const additionalLinks = {SignupLink : true, ForgotLink : true};

        const inputParameters = [
            {name: "email", value: email, type: "text", placeholder: "Email Address"}, 
            {name: "password", value: password, type: "password", placeholder: "Password"},
          ];

        return(
            <div>
                <Form onFormSubmit={this.onSubmit} 
                    onInputChange={this.onChange} 
                    inputParameters={inputParameters}
                    invalidCheck={isInvalid}
                    errorMessage={error}
                    additionalLinks = {additionalLinks}
                    buttonName="Sign In"/>
            </div>
        )
    }

}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };