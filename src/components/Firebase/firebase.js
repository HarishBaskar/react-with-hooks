import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCZawSmn8iqdFzWXgJQvBqrzudH_hmDt4w",
    authDomain: "hacker-search-app-1.firebaseapp.com",
    databaseURL: "https://hacker-search-app-1.firebaseio.com",
    projectId: "hacker-search-app-1",
    storageBucket: "hacker-search-app-1.appspot.com",
    messagingSenderId: "898615583224",
    appId: "1:898615583224:web:5eadb26e2f416429d0360d",
    measurementId: "G-75ZVT3HTFE"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;


    