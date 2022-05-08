import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7yhjzyqxARhNjc2YISfpfPqTtxbVtQJA",
  authDomain: "groundup-2bdff.firebaseapp.com",
  projectId: "groundup-2bdff",
  storageBucket: "groundup-2bdff.appspot.com",
  messagingSenderId: "191889607923",
  appId: "1:191889607923:web:2cbc02196ed84440bc3b86"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
