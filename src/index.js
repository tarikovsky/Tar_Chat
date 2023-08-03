import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOQaNjwhcy0NI2voVEPpyeetGvOaOKc0Q",
  authDomain: "tar-chat-91231.firebaseapp.com",
  projectId: "tar-chat-91231",
  storageBucket: "tar-chat-91231.appspot.com",
  messagingSenderId: "635108400232",
  appId: "1:635108400232:web:340ea335640ef202a12fdd",
  measurementId: "G-0YHGXRRH3L"
};
export const Context = createContext(null);

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth,
    db,
    storage
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
