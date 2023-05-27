import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAs1mKmHjHLMoKCyVvai6sJlR-kLSJGXVY",
  authDomain: "code-nerd-edu-953eb.firebaseapp.com",
  projectId: "code-nerd-edu-953eb",
});

const db = firebase;

export default db;
