import React, {Component} from 'react';
import { withFirebase } from '../Firebase/index';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import Form from '../Form/Form';

const PasswordForgotPage = () => {
    return(
        <div>
            <PasswordForgotForm/>
        </div>
    )
};

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgotFormBase extends Component{
    state = {...INITIAL_STATE};

    onSubmit = (event) => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
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
        const { email, error } = this.state;

        const isInvalid = email === '';

        const inputParameters = [
            {name: "email", value: email, type: "text", placeholder: "Email Address"}, 
          ];

        const additionalLinks = {SignupLink : false, ForgotLink : false};


        return(
            <div>
                <Form onFormSubmit={this.onSubmit} 
                    onInputChange={this.onChange} 
                    inputParameters={inputParameters}
                    invalidCheck={isInvalid}
                    errorMessage={error}
                    additionalLinks={additionalLinks}
                    buttonName="Reset Password"/>
            </div>
        )
    }
}

const PasswordForgetLink = () => (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );

const PasswordForgotForm = withFirebase(PasswordForgotFormBase);

export default PasswordForgotPage;

export { PasswordForgotForm, PasswordForgetLink };