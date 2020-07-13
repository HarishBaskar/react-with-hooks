import React from 'react';

import PasswordForgotForm from '../PasswordForget';
import {PasswordChangeForm} from '../PasswordChange/index';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordChangeForm />
    <PasswordForgotForm />
  </div>
);

export default AccountPage;