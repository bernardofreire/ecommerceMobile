import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, browserSessionPersistence, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC42tgvznZO24nnQk3282YRDHx3l4DCp_E",
  authDomain: "ecommercemobile-b0664.firebaseapp.com",
  databaseURL: "https://ecommercemobile-b0664-default-rtdb.firebaseio.com",
  projectId: "ecommercemobile-b0664",
  storageBucket: "ecommercemobile-b0664.appspot.com",
  messagingSenderId: "1071056722144",
  appId: "1:1071056722144:web:35f7305288382495299885",
  measurementId: "G-NV7Q11DQ7H"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { auth, database };
