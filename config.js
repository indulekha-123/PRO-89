import firebase from 'firebase';
require ('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAU78nMzmraAcq56qDpr4PzJ1zzrV5AlMw",
    authDomain: "barter-system-app-47b1b.firebaseapp.com",
    projectId: "barter-system-app-47b1b",
    storageBucket: "barter-system-app-47b1b.appspot.com",
    messagingSenderId: "444642703102",
    appId: "1:444642703102:web:bb98dad6f3e6329b17d7af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  export default firebase.firestore();
  


