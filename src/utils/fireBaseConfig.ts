import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAEtEXk--FKhmiDsdSY__rcRGrgjuG-UGw',
  authDomain: 'github-users-d8ddb.firebaseapp.com',
  projectId: 'github-users-d8ddb',
  storageBucket: 'github-users-d8ddb.appspot.com',
  messagingSenderId: '1054720653902',
  appId: '1:1054720653902:web:bc5a2c1182dd7eadb3a11f',
  measurementId: 'G-FB41XVVL3E'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
