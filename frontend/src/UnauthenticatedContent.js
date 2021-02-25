import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SingleCard } from './layouts';
import { LoginFormDevExpress, ResetPasswordForm, ChangePasswordForm, CreateAccountForm, LoginForm, RegisterForm } from './components';

export default function () {
  return (
    <Switch>
      <Route exact path='/login' >
        <SingleCard title="Sign In">
          <LoginForm />
        </SingleCard>
      </Route>
      <Route exact path='/create-account' >
        <SingleCard title="Sign Up">
          <RegisterForm />
        </SingleCard>
      </Route>
      <Route exact path='/reset-password' >
        <SingleCard
          title="Reset Password"
          description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
        >
          <ResetPasswordForm />
        </SingleCard>
      </Route>
      <Route exact path='/change-password/:recoveryCode' >
        <SingleCard title="Change Password">
          <ChangePasswordForm />
        </SingleCard>
      </Route>
      <Redirect to={'/login'} />
    </Switch>
  );
}
