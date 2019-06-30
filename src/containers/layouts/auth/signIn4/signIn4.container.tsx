import React from 'react';
import { View, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { SignInForm2Data } from '@src/components/auth';
import { SignIn4 } from './signIn4.component';
import * as firebase from 'firebase';

export class SignIn4Container extends React.Component<NavigationScreenProps> {

  private onSignInPress = (data: SignInForm2Data) => {
    const { username , password } = data
    try{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(response => {
      this.props.navigation.navigate('Dashboards')
      console.log(response)
    }
    )
    .catch(error => {
        alert(error.message)
    }) }catch(err){
      alert(err);
   }
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate('Sign Up 4');
  };

  private onForgotPasswordPress = () => {
    this.props.navigation.navigate('Forgot Password');
  };

  private onGooglePress = () => {

  };

  private onFacebookPress = () => {

  };

  private onTwitterPress = () => {

  };

  public render(): React.ReactNode {
    return (
      <SignIn4
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
        onGooglePress={this.onGooglePress}
        onFacebookPress={this.onFacebookPress}
        onTwitterPress={this.onTwitterPress}
      />
    );
  }
}
