import React from 'react';
import { withAuthorization } from '../Session/index';


import PasswordForgotForm from '../PasswordForget';
import {PasswordChangeForm} from '../PasswordChange/index';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordChangeForm />
    <PasswordForgotForm />
  </div>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);
