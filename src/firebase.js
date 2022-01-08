import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQdFs3UkX3T-7H9xdrRm_mno6kwP1Hb-w",
  authDomain: "event-management-9c2b0.firebaseapp.com",
  databaseURL: "https://event-management-9c2b0-default-rtdb.firebaseio.com",
  projectId: "event-management-9c2b0",
  storageBucket: "event-management-9c2b0.appspot.com",
  messagingSenderId: "653964512321",
  appId: "1:653964512321:web:32ff96b3921e8d5a328ac0",
  measurementId: "G-L080N4FKCS",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;
