// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQErS-EG_X1enQq-WQY4alWGeGSb_0Y58",
  authDomain: "deliverytracker-eefb5.firebaseapp.com",
  databaseURL: "https://deliverytracker-eefb5-default-rtdb.firebaseio.com",
  projectId: "deliverytracker-eefb5",
  storageBucket: "deliverytracker-eefb5.appspot.com",
  messagingSenderId: "1062417903444",
  appId: "1:1062417903444:web:ce50e1e70c959cf053a2c1",
  measurementId: "G-ZG5N8VMSWZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
