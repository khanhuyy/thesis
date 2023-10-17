
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHwDaxyj_Bn7cWDNOivaFfGAKzWqFhm3w",
  authDomain: "salinaka-2ac93.firebaseapp.com",
  projectId: "salinaka-2ac93",
  storageBucket: "salinaka-2ac93.appspot.com",
  messagingSenderId: "337697366257",
  appId: "1:337697366257:web:34476294add9be72f04950",
  dbUrl: "https://yourdburl.firebaseio.com"
  // measurementId: "G-3B4MZGHBNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default firebaseConfig;
