import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpForm2Data } from '@src/components/auth';
import { SignUp4 } from './signUp4.component';
import * as firebase from 'firebase';
import * as Expo from 'expo';
import * as Facebook from 'expo-facebook';

export class SignUp4Container extends React.Component<NavigationScreenProps> {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(){

        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        this.props.navigation.navigate('Dashboards');

      } else {
        this.props.navigation.navigate('Dashboards');

        alert('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  

  signInWithGoogleAsync = async() => {
    console.log("request");
    
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '43648874552-b9ml89ktg1anbo7qc2r1fphgtukrcttm.apps.googleusercontent.com',
        iosClientId: '43648874552-30lbabschghdreof21s1j5b6tjbpotpn.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // return result.accessToken;
        this.onSignIn(result)        
      } else {
        return { cancelled: true };
      }
    } catch (e) {
        alert(e)
    }
  }

  signInWithFacebookAsync = async() => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('463150414502286', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInWithCredential(credential).catch(
          error =>{
            alert(error);
          }
          
        )
        this.props.navigation.navigate('Dashboards');
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  private onSignUpPress = (data: SignUpForm2Data) => {
    console.log(data);
        
    const { email , password } = data
    firebase.auth().createUserWithEmailAndPassword(email,password);
    this.props.navigation.goBack();
  };

  private onSignInPress = () => {
    this.props.navigation.navigate('Sign In 4');
  };

  private onGooglePress = () => {
    this.signInWithGoogleAsync()
  };

  private onFacebookPress = () => {
    this.signInWithFacebookAsync()
  };

  private onTwitterPress = () => {

  };

  private onPhotoPress = () => {

  };

  public render(): React.ReactNode {
    return (
      <SignUp4
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        onGooglePress={this.onGooglePress}
        onFacebookPress={this.onFacebookPress}
        onTwitterPress={this.onTwitterPress}
        onPhotoPress={this.onPhotoPress}
      />
    );
  }
}
