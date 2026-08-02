const firebaseConfig = {
  apiKey: "AIzaSyDCxWLQF0AcRtkJGwa6P-nSTFPE7icnD-I",
  authDomain: "aziole-doces.firebaseapp.com",
  projectId: "aziole-doces",
  storageBucket: "aziole-doces.firebasestorage.app",
  messagingSenderId: "202266892064",
  appId: "1:202266892064:web:c574c8061353fe18b8e945"
};

if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
}