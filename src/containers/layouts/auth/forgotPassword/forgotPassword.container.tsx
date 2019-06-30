import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ForgotPasswordFormData } from '@src/components/auth';
import { ForgotPassword } from './forgotPassword.component';
import * as firebase from 'firebase';

export class ForgotPasswordContainer extends React.Component<NavigationScreenProps> {

  private onResetPress = (data: ForgotPasswordFormData) => {
    console.log(data);
    const {email} = data
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email has been sent.")
    },(error)=>{
      alert(error.message)
    }
  )
    this.props.navigation.goBack();
  };

  public render(): React.ReactNode {
    return (
      <ForgotPassword onResetPress={this.onResetPress}/>
    );
  }
}
