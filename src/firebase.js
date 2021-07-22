import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBEClrHTjdaL8pINxkSVXcVTjrh3cHhPVE",
    authDomain: "facebook-clone-963fa.firebaseapp.com",
    projectId: "facebook-clone-963fa",
    storageBucket: "facebook-clone-963fa.appspot.com",
    messagingSenderId: "68140238688",
    appId: "1:68140238688:web:d212498059037b1f444005"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;