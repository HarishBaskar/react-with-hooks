import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { withFirebase } from '../Firebase/index';
import {compose} from 'recompose';
import Form from '../Form/Form';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
);


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {

    state = {...INITIAL_STATE};

    onSubmit = event => {
        const {email, passwordOne} = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
                console.log(this.state);
            })
            .catch(error => {
                this.setState({ error });
            })
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    };


  render() {

    const {username,email,passwordOne,passwordTwo,error,} = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

    const inputParameters = [
      {name: "username", value: username, type: "text", placeholder: "Full Name"}, 
      {name: "email", value: email, type: "text", placeholder: "Email Address"}, 
      {name: "passwordOne", value: passwordOne, type: "password", placeholder: "Password"},
      {name: "passwordTwo", value: passwordTwo, type: "password", placeholder: "Confirm Password"}
    ];

    const additionalLinks = {SignupLink : false, ForgotLink : false};

    return (
      <>
        <Form onFormSubmit={this.onSubmit} 
            onInputChange={this.onChange} 
            inputParameters={inputParameters}
            invalidCheck={isInvalid}
            errorMessage={error}
            additionalLinks={additionalLinks}
            buttonName="Sign Up"/>
      </>
    );
  }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };