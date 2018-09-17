import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(

   {
        apiKey: "AIzaSyBUxuXmP3e9cSL2WjSaBcnh452EgDH6_SE",
        authDomain: "catch-of-the-day-bilal.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-bilal.firebaseio.com"
      }

);
const base = Rebase.createClass(firebase.database()); //bindings

//this is named export
export {firebaseApp};

// this is defualt export
export default base;