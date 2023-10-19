import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebaseConfig from "./config";
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where 
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default getFirestore(app);
