// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase, ref, push, get, child, onValue, onChildMoved} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBzCIsKkTqDcdpnc8VYklXtoVvy9ppo1A",
  authDomain: "groceries-app-a7ad5.firebaseapp.com",
  databaseURL: "https://groceries-app-a7ad5-default-rtdb.firebaseio.com",
  projectId: "groceries-app-a7ad5",
  storageBucket: "groceries-app-a7ad5.appspot.com",
  messagingSenderId: "102307654894",
  appId: "1:102307654894:web:59d4fc7b14fac3cd0997ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const groceriesInDB = ref(db, "Groceries");
export const timesInDB = ref(db, "TimeStamps");
export const accountsInDB = ref(db, "Accounts");
export const auth = getAuth(app);