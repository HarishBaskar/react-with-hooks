import React from 'react';
import { withAuthorization } from '../Session/index';


import PasswordForgotForm from '../PasswordForget';
import {PasswordChangeForm} from '../PasswordChange/index';

const AccountPage = () => (
  <div>
    <PasswordChangeForm />
    <PasswordForgotForm />
  </div>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);
