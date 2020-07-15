import React, {Component} from 'react';
import { withFirebase } from '../Firebase/index';
import Form from '../Form/Form';

const PasswordChangePage = () => {
    return(
        <div>
            <PasswordChangeForm/>
        </div>
    )
};

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeFormBase extends Component{
    state = {...INITIAL_STATE};

    onSubmit = (event) => {
        const { passwordOne } = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        const inputParameters = [
            {name: "passwordOne", value: passwordOne, type: "password", placeholder: "Password"},
            {name: "passwordTwo", value: passwordTwo, type: "password", placeholder: "Confirm Password"}
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
                    buttonName="Change Password"/>
            </div>
        )
    }
}



const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangePage;

export { PasswordChangeForm };