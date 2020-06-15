import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB_dyQrrxPWROqVnWY-XVfLx6edkBWwlHU",
    authDomain: "mokos-base.firebaseapp.com",
    databaseURL: "https://mokos-base.firebaseio.com",
    projectId: "mokos-base",
    storageBucket: "mokos-base.appspot.com",
    messagingSenderId: "713052106515",
    appId: "1:713052106515:web:365f143ee11085ad8c34e6",
    measurementId: "G-6DKGM7K3L0"
  };




firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
// export const auth1 = firebase.auth;
export const storage = firebase.storage();
export const functions = firebase.functions();

export const PasswordReset = (email) =>{
  firebase.auth().sendPasswordResetEmail(email);
}
